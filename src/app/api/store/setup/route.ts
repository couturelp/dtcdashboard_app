import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import User from '@/lib/db/models/user';
import Store from '@/lib/db/models/store';
import { provisionTenantDatabase } from '@/lib/tenant-db';
import { sendAdminAlert } from '@/lib/email';

// Valid timezones (subset of IANA, covering major zones)
const VALID_TIMEZONES = new Set(
  Intl.supportedValuesOf('timeZone')
);

// Supported currencies (ISO 4217 subset for MVP)
const VALID_CURRENCIES = new Set([
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'JPY',
  'SEK', 'NOK', 'DKK', 'SGD', 'HKD', 'MXN', 'BRL', 'INR',
]);

const MAX_PROVISION_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000; // 1s, 2s, 4s

/**
 * Retry an async operation with exponential backoff.
 * Returns the result on success, or throws the last error after all retries fail.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  initialBackoffMs: number
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries - 1) {
        const backoffMs = initialBackoffMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
      }
    }
  }
  throw lastError;
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, currency, timezone } = body as {
      name?: string;
      currency?: string;
      timezone?: string;
    };

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Store name is required' }, { status: 400 });
    }

    if (name.trim().length > 100) {
      return NextResponse.json({ error: 'Store name must be 100 characters or less' }, { status: 400 });
    }

    const normalizedCurrency = (currency || 'USD').toUpperCase();
    if (!VALID_CURRENCIES.has(normalizedCurrency)) {
      return NextResponse.json(
        { error: `Invalid currency. Supported: ${[...VALID_CURRENCIES].join(', ')}` },
        { status: 400 }
      );
    }

    const normalizedTimezone = timezone || 'America/New_York';
    if (!VALID_TIMEZONES.has(normalizedTimezone)) {
      return NextResponse.json({ error: 'Invalid timezone' }, { status: 400 });
    }

    await connectDB();

    // Check if user already has a store
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If the user already has a store, check if setup is complete.
    // If setup_complete, reject as duplicate. If not, allow retry of provisioning.
    let store;
    if (user.store_id) {
      store = await Store.findById(user.store_id);
      if (store && store.setup_complete) {
        return NextResponse.json({ error: 'Store already exists for this account' }, { status: 409 });
      }
      if (!store) {
        // Orphaned store_id -- clear it and create a new store below
        user.store_id = null;
        await user.save();
      }
    }

    if (!store) {
      // Create the store record
      store = new Store({
        user_id: userId,
        name: name.trim(),
        currency: normalizedCurrency,
        timezone: normalizedTimezone,
        setup_complete: false,
      });

      await store.save();

      // Link store to user
      user.store_id = store._id;
      await user.save();
    }

    // Provision the tenant database with automatic retry (exponential backoff)
    try {
      await withRetry(
        () => provisionTenantDatabase(store._id.toString()),
        MAX_PROVISION_RETRIES,
        INITIAL_BACKOFF_MS
      );

      // Mark setup as complete
      store.setup_complete = true;
      await store.save();
    } catch (provisionError) {
      // All retries exhausted -- store record exists but DB is not ready.
      const errorMsg =
        provisionError instanceof Error ? provisionError.message : 'Unknown error';
      console.error(
        `[StoreSetup] Database provisioning failed after ${MAX_PROVISION_RETRIES} attempts:`,
        errorMsg
      );

      // Notify admin of the failure
      try {
        await sendAdminAlert(
          'Database provisioning failed',
          `Store ID: ${store._id.toString()}\nStore Name: ${store.name}\nUser ID: ${userId}\nAttempts: ${MAX_PROVISION_RETRIES}\nError: ${errorMsg}`
        );
      } catch (alertError) {
        console.error('[StoreSetup] Failed to send admin alert:', alertError);
      }

      return NextResponse.json(
        {
          error: 'Store created but database provisioning failed. Please try again later.',
          partialSuccess: true,
          store: {
            id: store._id.toString(),
            name: store.name,
            currency: store.currency,
            timezone: store.timezone,
            setup_complete: false,
          },
        },
        { status: 207 }
      );
    }

    return NextResponse.json({
      message: 'Store created successfully',
      store: {
        id: store._id.toString(),
        name: store.name,
        currency: store.currency,
        timezone: store.timezone,
        setup_complete: true,
      },
    });
  } catch (error) {
    console.error(
      '[StoreSetup] Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
