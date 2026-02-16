import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Store from '@/lib/db/models/store';

const VALID_TIMEZONES = new Set(Intl.supportedValuesOf('timeZone'));

const VALID_CURRENCIES = new Set([
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'JPY',
  'SEK', 'NOK', 'DKK', 'SGD', 'HKD', 'MXN', 'BRL', 'INR',
]);

export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json({ error: 'No store configured' }, { status: 404 });
    }

    await connectDB();

    const store = await Store.findById(storeId).select('name currency timezone').lean();
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: store.name,
      currency: store.currency,
      timezone: store.timezone,
    });
  } catch (error) {
    console.error('[StoreSettings] GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    const userId = request.headers.get('x-user-id');
    if (!storeId || !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, currency, timezone } = body as {
      name?: string;
      currency?: string;
      timezone?: string;
    };

    if (name === undefined && currency === undefined && timezone === undefined) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    await connectDB();

    // Verify store belongs to this user
    const store = await Store.findOne({ _id: storeId, user_id: userId });
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Store name is required' }, { status: 400 });
      }
      if (name.trim().length > 100) {
        return NextResponse.json({ error: 'Store name must be 100 characters or less' }, { status: 400 });
      }
      updates.name = name.trim();
    }

    if (currency !== undefined) {
      const normalized = currency.toUpperCase();
      if (!VALID_CURRENCIES.has(normalized)) {
        return NextResponse.json(
          { error: `Invalid currency. Supported: ${[...VALID_CURRENCIES].join(', ')}` },
          { status: 400 }
        );
      }
      updates.currency = normalized;
    }

    if (timezone !== undefined) {
      if (!VALID_TIMEZONES.has(timezone)) {
        return NextResponse.json({ error: 'Invalid timezone' }, { status: 400 });
      }
      updates.timezone = timezone;
    }

    if (Object.keys(updates).length > 0) {
      await Store.updateOne({ _id: storeId }, { $set: updates });
    }

    return NextResponse.json({ message: 'Store settings updated successfully' });
  } catch (error) {
    console.error('[StoreSettings] PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
