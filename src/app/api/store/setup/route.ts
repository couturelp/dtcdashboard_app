import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import User from '@/lib/db/models/user';
import Store from '@/lib/db/models/store';
import { provisionTenantDatabase } from '@/lib/tenant-db';

// Valid timezones (subset of IANA, covering major zones)
const VALID_TIMEZONES = new Set(
  Intl.supportedValuesOf('timeZone')
);

// Supported currencies (ISO 4217 subset for MVP)
const VALID_CURRENCIES = new Set([
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'JPY',
  'SEK', 'NOK', 'DKK', 'SGD', 'HKD', 'MXN', 'BRL', 'INR',
]);

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

    if (user.store_id) {
      return NextResponse.json({ error: 'Store already exists for this account' }, { status: 409 });
    }

    // Create the store record
    const store = new Store({
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

    // Provision the tenant database
    try {
      await provisionTenantDatabase(store._id.toString());

      // Mark setup as complete
      store.setup_complete = true;
      await store.save();
    } catch (provisionError) {
      // Provisioning failed -- store record exists but DB is not ready.
      // Log for debugging and return a partial success so the user can retry.
      console.error('[StoreSetup] Database provisioning failed:', provisionError);
      return NextResponse.json(
        {
          message: 'Store created but database provisioning failed. You can retry from settings.',
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
    console.error('[StoreSetup] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
