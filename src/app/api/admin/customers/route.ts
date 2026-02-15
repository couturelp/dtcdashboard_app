import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, parsePagination } from '@/lib/admin/helpers';
import Store from '@/lib/db/models/store';
import Subscription from '@/lib/db/models/subscription';
import TenantDatabase from '@/lib/db/models/tenant-database';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';

interface CustomerRow {
  user_id: string;
  email: string;
  store_name: string;
  signup_date: string;
  subscription_status: string | null;
  db_status: string | null;
  last_connection_test: boolean | null;
  last_sync: string | null;
}

export async function GET(request: NextRequest) {
  const adminId = requireAdmin(request);
  if (adminId instanceof NextResponse) return adminId;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    // --- Parse params ---
    const { page, limit, skip } = parsePagination(searchParams);
    const search = searchParams.get('search')?.trim() || '';
    const sortField = searchParams.get('sort') || 'signup_date';
    const sortDir = searchParams.get('dir') === 'asc' ? 1 : -1;
    const filterTier = searchParams.get('tier'); // 'free' | 'paid'
    const filterDbStatus = searchParams.get('db_status'); // 'active' | 'provisioning' | 'error' | 'deleting' | 'none'

    // --- Build user query with search ---
    const userQuery: Record<string, unknown> = { role: { $ne: 'admin' } };
    if (search) {
      // Escape special regex characters to prevent regex injection
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      userQuery.$or = [{ email: { $regex: escapedSearch, $options: 'i' } }];
    }

    // --- Fetch all non-admin users matching search ---
    const users = await User.find(userQuery).select('_id email store_id created_at').lean();
    const storeIds = users.map((u) => u.store_id).filter(Boolean);

    // --- Parallel lookups ---
    const [stores, tenantDbs, subscriptions] = await Promise.all([
      Store.find({ _id: { $in: storeIds } }).lean(),
      TenantDatabase.find({ store_id: { $in: storeIds } }).lean(),
      Subscription.find({ store_id: { $in: storeIds } }).lean(),
    ]);

    // --- Build lookup maps ---
    const storeMap = new Map(stores.map((s) => [s._id.toString(), s]));
    const dbMap = new Map(tenantDbs.map((d) => [d.store_id.toString(), d]));
    const subMap = new Map(subscriptions.map((s) => [s.store_id.toString(), s]));

    // --- Assemble rows ---
    let rows: CustomerRow[] = users.map((user) => {
      const storeIdStr = user.store_id?.toString();
      const store = storeIdStr ? storeMap.get(storeIdStr) : null;
      const db = storeIdStr ? dbMap.get(storeIdStr) : null;
      const sub = storeIdStr ? subMap.get(storeIdStr) : null;

      return {
        user_id: user._id.toString(),
        email: user.email,
        store_name: store?.name || '—',
        signup_date: user.created_at.toISOString(),
        subscription_status: sub?.status || null,
        db_status: db?.status || null,
        last_connection_test: db?.last_connection_test_result ?? null,
        last_sync: db?.last_connection_test_at?.toISOString() || null,
      };
    });

    // --- Summary stats (computed BEFORE search/filter so they reflect totals) ---
    const totalCustomers = rows.length;
    const activeSubscribers = rows.filter(
      (r) => r.subscription_status === 'active' || r.subscription_status === 'trialing'
    ).length;
    const totalDatabases = rows.filter((r) => r.db_status === 'active').length;

    // --- Search by store name (post-join filter) ---
    if (search) {
      rows = rows.filter(
        (r) =>
          r.email.toLowerCase().includes(search.toLowerCase()) ||
          r.store_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // --- Apply filters ---
    if (filterTier === 'paid') {
      rows = rows.filter(
        (r) =>
          r.subscription_status &&
          !['canceled', 'incomplete_expired', 'unpaid', 'paused'].includes(r.subscription_status)
      );
    } else if (filterTier === 'free') {
      rows = rows.filter(
        (r) =>
          !r.subscription_status ||
          ['canceled', 'incomplete_expired', 'unpaid', 'paused'].includes(r.subscription_status)
      );
    }

    if (filterDbStatus === 'none') {
      rows = rows.filter((r) => !r.db_status);
    } else if (filterDbStatus) {
      rows = rows.filter((r) => r.db_status === filterDbStatus);
    }

    // --- Sort ---
    rows.sort((a, b) => {
      let aVal: string | null = '';
      let bVal: string | null = '';
      switch (sortField) {
        case 'email':
          aVal = a.email;
          bVal = b.email;
          break;
        case 'store_name':
          aVal = a.store_name;
          bVal = b.store_name;
          break;
        case 'subscription_status':
          aVal = a.subscription_status;
          bVal = b.subscription_status;
          break;
        case 'db_status':
          aVal = a.db_status;
          bVal = b.db_status;
          break;
        default:
          aVal = a.signup_date;
          bVal = b.signup_date;
      }
      return (aVal || '').localeCompare(bVal || '') * sortDir;
    });

    // --- Paginate (use filtered count for pagination) ---
    const filteredCount = rows.length;
    const paginatedRows = rows.slice(skip, skip + limit);

    return NextResponse.json({
      customers: paginatedRows,
      summary: { totalCustomers, activeSubscribers, totalDatabases },
      pagination: {
        page,
        limit,
        totalItems: filteredCount,
        totalPages: Math.ceil(filteredCount / limit),
      },
    });
  } catch (error) {
    console.error('[Admin Customers GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
