import crypto from 'crypto';
import { Pool, PoolConfig } from 'pg';
import { encrypt, decrypt } from '@/lib/crypto';
import TenantDatabase from '@/lib/db/models/tenant-database';
import type { ITenantDatabase } from '@/lib/db/models/tenant-database';
import { connectDB } from '@/lib/db/mongodb';

// ----- Input validation -----

/**
 * Validate that a string is safe for use in SQL identifiers.
 * Accepts only alphanumeric characters and underscores.
 * This prevents SQL injection when identifiers are interpolated into queries.
 */
function validateSqlIdentifier(value: string, label: string): void {
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    throw new Error(
      `Invalid ${label}: contains characters not allowed in SQL identifiers. Expected only alphanumeric and underscore.`
    );
  }
}

// ----- Connection pool cache -----
// Cache tenant connection pools on globalThis (survives Next.js HMR like MongoDB cache)
interface TenantPoolEntry {
  pool: Pool;
  lastUsed: number;
}

declare global {
  var tenantPools: Map<string, TenantPoolEntry> | undefined;
  var rdsMasterPool: Pool | undefined;
}

const pools: Map<string, TenantPoolEntry> = globalThis.tenantPools ?? new Map();
globalThis.tenantPools = pools;

// Idle pool cleanup interval: close pools unused for 30 seconds
const IDLE_TIMEOUT_MS = 30_000;
const CLEANUP_INTERVAL_MS = 15_000;

let cleanupInterval: ReturnType<typeof setInterval> | null = null;

function startPoolCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [storeId, entry] of pools) {
      if (now - entry.lastUsed > IDLE_TIMEOUT_MS) {
        entry.pool.end().catch(console.error);
        pools.delete(storeId);
      }
    }
    // Stop interval if no pools remain
    if (pools.size === 0 && cleanupInterval) {
      clearInterval(cleanupInterval);
      cleanupInterval = null;
    }
  }, CLEANUP_INTERVAL_MS);
  // Don't let the cleanup timer prevent the process from exiting
  cleanupInterval.unref();
}

// ----- RDS master connection helper -----
function getMasterPoolConfig(): PoolConfig {
  return {
    host: process.env.RDS_MASTER_HOST,
    port: parseInt(process.env.RDS_MASTER_PORT || '5432', 10),
    user: process.env.RDS_MASTER_USER,
    password: process.env.RDS_MASTER_PASSWORD,
    database: 'postgres', // connect to default DB for admin operations
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  };
}

// Single master pool, cached on globalThis to survive HMR
function getMasterPool(): Pool {
  if (!globalThis.rdsMasterPool) {
    const pool = new Pool(getMasterPoolConfig());
    // Handle background errors on idle clients to prevent process crash
    pool.on('error', (err) => {
      console.error('[TenantDB] Master pool idle client error:', err.message);
    });
    globalThis.rdsMasterPool = pool;
  }
  return globalThis.rdsMasterPool;
}

// ----- Provisioning -----

export async function provisionTenantDatabase(storeId: string): Promise<ITenantDatabase> {
  // Validate storeId before using it in SQL identifiers to prevent injection
  validateSqlIdentifier(storeId, 'storeId');

  await connectDB();

  // Check if already provisioned
  const existing = await TenantDatabase.findOne({ store_id: storeId });
  if (existing && existing.status === 'active') {
    return existing;
  }

  const dbName = `tenant_${storeId}`;
  const username = `fivetran_${storeId}`;
  const rawPassword = crypto.randomBytes(24).toString('base64url'); // 32 chars

  // Encrypt password for storage
  const encryptedPassword = encrypt(rawPassword);

  const host = process.env.RDS_MASTER_HOST!;
  const port = parseInt(process.env.RDS_MASTER_PORT || '5432', 10);

  // Create or update the TenantDatabase record with 'provisioning' status
  const tenantRecord = existing
    ? existing
    : new TenantDatabase({
        store_id: storeId,
        database_name: dbName,
        database_host: host,
        database_port: port,
        fivetran_username: username,
        password_ciphertext: encryptedPassword.ciphertext,
        password_iv: encryptedPassword.iv,
        password_auth_tag: encryptedPassword.authTag,
        status: 'provisioning',
      });

  if (existing) {
    tenantRecord.status = 'provisioning';
    tenantRecord.password_ciphertext = encryptedPassword.ciphertext;
    tenantRecord.password_iv = encryptedPassword.iv;
    tenantRecord.password_auth_tag = encryptedPassword.authTag;
    tenantRecord.error_message = null;
  }

  await tenantRecord.save();

  const master = getMasterPool();

  try {
    // Create user (DROP IF EXISTS for retry safety)
    await master.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${username}') THEN
          CREATE ROLE "${username}" WITH LOGIN PASSWORD '${rawPassword.replace(/'/g, "''")}';
        ELSE
          ALTER ROLE "${username}" WITH PASSWORD '${rawPassword.replace(/'/g, "''")}';
        END IF;
      END
      $$;
    `);

    // Create database if it doesn't exist
    // NOTE: CREATE DATABASE cannot run inside a transaction, and pg doesn't support IF NOT EXISTS for CREATE DATABASE
    // Check existence first
    const dbCheck = await master.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (dbCheck.rowCount === 0) {
      const masterUser = process.env.RDS_MASTER_USER || '';
      validateSqlIdentifier(masterUser, 'RDS_MASTER_USER');
      await master.query(`CREATE DATABASE "${dbName}" OWNER "${masterUser}"`);
    }

    // Revoke default public CONNECT privilege on the new tenant database.
    // PostgreSQL grants CONNECT to the "public" role on all databases by default,
    // which means any Fivetran user from another tenant could connect to this database.
    // Revoking CONNECT from "public" ensures only explicitly granted roles can connect.
    try {
      await master.query(`REVOKE CONNECT ON DATABASE "${dbName}" FROM PUBLIC`);
    } catch {
      // May fail if already revoked — non-fatal
    }

    // Grant privileges on the tenant database to its designated user
    await master.query(`GRANT ALL PRIVILEGES ON DATABASE "${dbName}" TO "${username}"`);

    // Also revoke this tenant's user from the default postgres database
    try {
      await master.query(`REVOKE ALL ON DATABASE postgres FROM "${username}"`);
    } catch {
      // May fail if already revoked or insufficient privileges — non-fatal
    }

    // Connect to the new tenant database to set schema-level grants.
    // Use max 1 connection since this is a temporary pool for two quick grants.
    const tenantMasterPool = new Pool({
      ...getMasterPoolConfig(),
      database: dbName,
      max: 1,
    });

    try {
      await tenantMasterPool.query(`GRANT CREATE ON SCHEMA public TO "${username}"`);
      await tenantMasterPool.query(`
        ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT ALL ON TABLES TO "${username}"
      `);
    } finally {
      await tenantMasterPool.end();
    }

    // Mark as active
    tenantRecord.status = 'active';
    tenantRecord.provisioned_at = new Date();
    tenantRecord.error_message = null;
    await tenantRecord.save();

    return tenantRecord;
  } catch (error) {
    // Extract only the message — the raw error may contain SQL with passwords
    const safeMessage = error instanceof Error ? error.message : 'Unknown provisioning error';

    // Try to record the error in MongoDB. Use try/catch because the
    // tenantRecord might not have been inserted yet (e.g., duplicate key
    // race condition), in which case this save would also fail.
    try {
      tenantRecord.status = 'error';
      tenantRecord.error_message = safeMessage;
      await tenantRecord.save();
    } catch {
      // Could not persist error status — log it but don't mask the original error
      console.error(
        `[TenantDB] Failed to record provisioning error for store ${storeId}:`,
        safeMessage
      );
    }
    // Re-throw with sanitized message to prevent password leaks in upstream logs
    throw new Error(`Database provisioning failed for store ${storeId}: ${safeMessage}`);
  }
}

// ----- Deletion -----

export async function deleteTenantDatabase(storeId: string): Promise<void> {
  await connectDB();

  const tenantRecord = await TenantDatabase.findOne({ store_id: storeId });
  if (!tenantRecord) return;

  tenantRecord.status = 'deleting';
  await tenantRecord.save();

  // Close any cached pool for this tenant
  await closeTenantConnection(storeId);

  const master = getMasterPool();

  try {
    const dbName = tenantRecord.database_name;
    const username = tenantRecord.fivetran_username;

    // Validate values from DB before interpolating into SQL to prevent injection
    // if the MongoDB record was somehow tampered with
    validateSqlIdentifier(dbName, 'database_name');
    validateSqlIdentifier(username, 'fivetran_username');

    // Terminate active connections to the tenant database
    await master.query(
      `
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1 AND pid <> pg_backend_pid()
    `,
      [dbName]
    );

    // Drop database
    await master.query(`DROP DATABASE IF EXISTS "${dbName}"`);

    // Revoke all remaining privileges from the role before dropping it.
    // This prevents "role cannot be dropped because some objects depend on it" errors
    // if the role was granted privileges on other databases or the default 'postgres' db.
    try {
      await master.query(`REVOKE ALL PRIVILEGES ON DATABASE postgres FROM "${username}"`);
    } catch {
      // May fail if no privileges exist — non-fatal
    }

    // Drop user
    await master.query(`DROP ROLE IF EXISTS "${username}"`);

    // Remove the MongoDB record
    await TenantDatabase.deleteOne({ _id: tenantRecord._id });
  } catch (error) {
    tenantRecord.status = 'error';
    tenantRecord.error_message = error instanceof Error ? error.message : 'Unknown deletion error';
    await tenantRecord.save();
    throw error;
  }
}

// ----- Connection pooling -----

/**
 * Get a connection pool for a tenant database.
 * Uses per-tenant credentials by default for proper database-level isolation.
 * For admin operations (DDL, index creation), pass master credentials explicitly.
 */
export function getTenantConnection(
  storeId: string,
  dbName: string,
  host: string,
  port: number,
  credentials?: { user: string; password: string }
): Pool {
  // Use a separate cache key for master vs tenant connections to the same database
  const cacheKey = credentials ? `${storeId}:master` : storeId;

  const existing = pools.get(cacheKey);
  if (existing) {
    existing.lastUsed = Date.now();
    return existing.pool;
  }

  const pool = new Pool({
    host,
    port,
    user: credentials?.user ?? process.env.RDS_MASTER_USER,
    password: credentials?.password ?? process.env.RDS_MASTER_PASSWORD,
    database: dbName,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

  // Handle background errors on idle clients to prevent process crash
  pool.on('error', (err) => {
    console.error(`[TenantDB] Idle client error for store ${storeId}:`, err.message);
  });

  pools.set(cacheKey, { pool, lastUsed: Date.now() });
  startPoolCleanup();

  return pool;
}

export async function closeTenantConnection(storeId: string): Promise<void> {
  // Close both tenant-credential and master-credential pools for this store
  for (const key of [storeId, `${storeId}:master`]) {
    const entry = pools.get(key);
    if (entry) {
      await entry.pool.end();
      pools.delete(key);
    }
  }
}

export async function queryTenant(
  storeId: string,
  sql: string,
  params: unknown[] = []
): Promise<import('pg').QueryResult> {
  // Fast path: if the pool is already cached, skip the MongoDB lookup & decryption
  const cachedEntry = pools.get(storeId);
  if (cachedEntry) {
    cachedEntry.lastUsed = Date.now();
    return cachedEntry.pool.query(sql, params);
  }

  // Slow path: look up credentials and create a new pool
  await connectDB();

  const tenantRecord = await TenantDatabase.findOne({ store_id: storeId, status: 'active' });
  if (!tenantRecord) {
    throw new Error(`No active tenant database found for store ${storeId}`);
  }

  // Decrypt per-tenant credentials for database-level isolation.
  // Application queries run as the tenant user, not the RDS master,
  // so PostgreSQL enforces that this connection can only access its own database.
  const tenantPassword = decrypt({
    ciphertext: tenantRecord.password_ciphertext,
    iv: tenantRecord.password_iv,
    authTag: tenantRecord.password_auth_tag,
  });

  const pool = getTenantConnection(
    storeId,
    tenantRecord.database_name,
    tenantRecord.database_host,
    tenantRecord.database_port,
    { user: tenantRecord.fivetran_username, password: tenantPassword }
  );

  return pool.query(sql, params);
}

// ----- Credential retrieval -----

export async function getTenantCredentials(storeId: string): Promise<{
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
} | null> {
  await connectDB();

  const tenantRecord = await TenantDatabase.findOne({ store_id: storeId, status: 'active' });
  if (!tenantRecord) return null;

  const password = decrypt({
    ciphertext: tenantRecord.password_ciphertext,
    iv: tenantRecord.password_iv,
    authTag: tenantRecord.password_auth_tag,
  });

  return {
    host: tenantRecord.database_host,
    port: tenantRecord.database_port,
    database: tenantRecord.database_name,
    username: tenantRecord.fivetran_username,
    password,
  };
}

// ----- Credential rotation -----

// Guard against concurrent rotation for the same store (process-level lock)
const rotatingStores = new Set<string>();

export async function rotateTenantPassword(storeId: string): Promise<string> {
  if (rotatingStores.has(storeId)) {
    throw new Error(`Password rotation already in progress for store ${storeId}`);
  }
  rotatingStores.add(storeId);

  try {
    return await _rotateTenantPasswordInner(storeId);
  } finally {
    rotatingStores.delete(storeId);
  }
}

async function _rotateTenantPasswordInner(storeId: string): Promise<string> {
  await connectDB();

  const tenantRecord = await TenantDatabase.findOne({ store_id: storeId, status: 'active' });
  if (!tenantRecord) {
    throw new Error(`No active tenant database found for store ${storeId}`);
  }

  // Validate username from DB before interpolating into SQL
  validateSqlIdentifier(tenantRecord.fivetran_username, 'fivetran_username');

  const newPassword = crypto.randomBytes(24).toString('base64url');
  const encryptedPassword = encrypt(newPassword);

  // Save old credentials so we can revert MongoDB if PostgreSQL update fails.
  // This prevents the stored password from getting out of sync with PostgreSQL.
  const oldCiphertext = tenantRecord.password_ciphertext;
  const oldIv = tenantRecord.password_iv;
  const oldAuthTag = tenantRecord.password_auth_tag;

  // Update encrypted password in MongoDB first
  tenantRecord.password_ciphertext = encryptedPassword.ciphertext;
  tenantRecord.password_iv = encryptedPassword.iv;
  tenantRecord.password_auth_tag = encryptedPassword.authTag;
  await tenantRecord.save();

  // Now update PostgreSQL user password; revert MongoDB on failure
  const master = getMasterPool();
  try {
    await master.query(
      `ALTER ROLE "${tenantRecord.fivetran_username}" WITH PASSWORD '${newPassword.replace(/'/g, "''")}'`
    );
  } catch (pgError) {
    // Revert MongoDB to the old password so it stays in sync with PostgreSQL
    tenantRecord.password_ciphertext = oldCiphertext;
    tenantRecord.password_iv = oldIv;
    tenantRecord.password_auth_tag = oldAuthTag;
    await tenantRecord.save();
    // Re-throw with a sanitized message — the raw pgError may contain
    // the ALTER ROLE SQL statement with the new password in plaintext
    throw new Error(
      `Failed to update PostgreSQL password for store ${storeId}: ${pgError instanceof Error ? pgError.message : 'Unknown PostgreSQL error'}`
    );
  }

  // Close any cached connection pool (it uses master creds, not affected, but good hygiene)
  await closeTenantConnection(storeId);

  return newPassword;
}

// ----- Connection testing -----

export async function testTenantConnection(storeId: string): Promise<boolean> {
  await connectDB();

  const tenantRecord = await TenantDatabase.findOne({ store_id: storeId, status: 'active' });
  if (!tenantRecord) return false;

  const credentials = await getTenantCredentials(storeId);
  if (!credentials) return false;

  const testPool = new Pool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.username,
    password: credentials.password,
    database: credentials.database,
    max: 1,
    connectionTimeoutMillis: 10_000,
  });

  // Handle idle client errors to prevent unhandled 'error' event crashing the process
  testPool.on('error', (err) => {
    console.error(`[TenantDB] Test pool error for store ${storeId}:`, err.message);
  });

  try {
    const result = await testPool.query('SELECT 1 AS connected');
    const success = result.rows[0]?.connected === 1;

    tenantRecord.last_connection_test_at = new Date();
    tenantRecord.last_connection_test_result = success;
    await tenantRecord.save();

    return success;
  } catch {
    tenantRecord.last_connection_test_at = new Date();
    tenantRecord.last_connection_test_result = false;
    await tenantRecord.save();
    return false;
  } finally {
    await testPool.end();
  }
}

// ----- Index creation -----

const TENANT_INDEXES = {
  shopify: [
    'CREATE INDEX IF NOT EXISTS idx_order_created_at ON "order"(created_at)',
    'CREATE INDEX IF NOT EXISTS idx_order_line_order_id ON order_line(order_id)',
    'CREATE INDEX IF NOT EXISTS idx_order_line_product_id ON order_line(product_id)',
    'CREATE INDEX IF NOT EXISTS idx_product_variant_product_id ON product_variant(product_id)',
    'CREATE INDEX IF NOT EXISTS idx_refund_order_id ON refund(order_id)',
  ],
  metaAds: [
    'CREATE INDEX IF NOT EXISTS idx_basic_ad_date ON basic_ad(date)',
    'CREATE INDEX IF NOT EXISTS idx_basic_ad_ad_id ON basic_ad(ad_id)',
    'CREATE INDEX IF NOT EXISTS idx_campaign_history_id ON campaign_history(id)',
  ],
  googleAds: [
    'CREATE INDEX IF NOT EXISTS idx_campaign_stats_date ON campaign_stats(date)',
    'CREATE INDEX IF NOT EXISTS idx_campaign_stats_campaign_id ON campaign_stats(campaign_id)',
  ],
};

export async function createTenantIndexes(
  storeId: string
): Promise<{ created: number; skipped: number }> {
  await connectDB();

  const tenantRecord = await TenantDatabase.findOne({ store_id: storeId, status: 'active' });
  if (!tenantRecord) {
    throw new Error(`No active tenant database found for store ${storeId}`);
  }

  // Connect as master user to create indexes (DDL admin operation)
  const pool = getTenantConnection(
    storeId,
    tenantRecord.database_name,
    tenantRecord.database_host,
    tenantRecord.database_port,
    {
      user: process.env.RDS_MASTER_USER!,
      password: process.env.RDS_MASTER_PASSWORD!,
    }
  );

  let created = 0;
  let skipped = 0;

  // Check which tables exist before creating indexes
  const tablesResult = await pool.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  );
  const existingTables = new Set(
    tablesResult.rows.map((r: { table_name: string }) => r.table_name)
  );

  const allIndexes = [
    ...TENANT_INDEXES.shopify,
    ...TENANT_INDEXES.metaAds,
    ...TENANT_INDEXES.googleAds,
  ];

  for (const indexSql of allIndexes) {
    // Extract table name from the SQL: "... ON tablename(" or "... ON "tablename"("
    const tableMatch = indexSql.match(/ON\s+(?:"([^"]+)"|([\w]+))\s*\(/);
    const tableName = tableMatch?.[1] || tableMatch?.[2];

    if (!tableName || !existingTables.has(tableName)) {
      skipped++;
      continue;
    }

    try {
      await pool.query(indexSql);
      created++;
    } catch (error) {
      // IF NOT EXISTS should prevent errors, but log just in case
      console.warn(`[TenantDB] Index creation warning for store ${storeId}:`, error);
      skipped++;
    }
  }

  // Track that indexes were created
  tenantRecord.indexes_created_at = new Date();
  await tenantRecord.save();

  return { created, skipped };
}
