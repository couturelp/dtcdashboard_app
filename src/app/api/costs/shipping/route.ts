// src/app/api/costs/shipping/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { isPositiveAmount, isValidCurrency, isValidRateType } from '@/lib/costs/validation';
import ShippingRate from '@/lib/db/models/shipping-rate';
import { connectDB } from '@/lib/db/mongodb';

export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    await connectDB();
    const config = await ShippingRate.findOne({ store_id: storeId }).lean();

    // Return default config if none exists
    if (!config) {
      return NextResponse.json({
        shipping: {
          rate_type: 'shopify_default',
          rate_value: 0,
          currency: 'USD',
          conditions_json: null,
        },
      });
    }

    return NextResponse.json({ shipping: config });
  } catch (error) {
    console.error('[Shipping GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { rate_type, rate_value, currency, conditions_json } = body;

    if (!isValidRateType(rate_type)) {
      return NextResponse.json(
        { error: 'rate_type must be flat, per_item, weight_based, or shopify_default.' },
        { status: 400 }
      );
    }

    // rate_value required for non-shopify_default types
    if (rate_type !== 'shopify_default') {
      if (!isPositiveAmount(rate_value)) {
        return NextResponse.json(
          { error: 'rate_value must be a non-negative integer (in cents).' },
          { status: 400 }
        );
      }
    }

    if (currency && !isValidCurrency(currency)) {
      return NextResponse.json({ error: 'Invalid currency code.' }, { status: 400 });
    }

    await connectDB();
    const shipping = await ShippingRate.findOneAndUpdate(
      { store_id: storeId },
      {
        $set: {
          store_id: storeId,
          rate_type,
          rate_value: rate_type === 'shopify_default' ? 0 : rate_value,
          currency: currency?.toUpperCase() || 'USD',
          conditions_json: conditions_json || null,
        },
      },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json({ shipping });
  } catch (error) {
    console.error('[Shipping PUT]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
