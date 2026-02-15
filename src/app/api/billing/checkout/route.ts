import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { createCheckoutSession, createStripeCustomer } from '@/lib/stripe';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { priceId } = body as { priceId?: string };

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json({ error: 'priceId is required.' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Ensure user has a Stripe customer ID (backfill if missing from pre-Stripe registration)
    let stripeCustomerId = user.stripe_customer_id;
    if (!stripeCustomerId) {
      stripeCustomerId = await createStripeCustomer(user.email, user._id.toString());
      if (stripeCustomerId) {
        await User.updateOne({ _id: user._id }, { $set: { stripe_customer_id: stripeCustomerId } });
      } else {
        return NextResponse.json(
          { error: 'Unable to create billing account. Please try again.' },
          { status: 500 }
        );
      }
    }

    const checkoutUrl = await createCheckoutSession({
      stripeCustomerId,
      priceId,
      successUrl: `${APP_URL}/app/settings?billing=success`,
      cancelUrl: `${APP_URL}/app/settings?billing=canceled`,
    });

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('[Billing Checkout] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
