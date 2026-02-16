import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { createPortalSession } from '@/lib/stripe';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!user.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No billing account found. Please subscribe to a plan first.' },
        { status: 400 }
      );
    }

    const portalUrl = await createPortalSession({
      stripeCustomerId: user.stripe_customer_id,
      returnUrl: `${APP_URL}/app/settings`,
    });

    return NextResponse.json({ portalUrl });
  } catch (error) {
    console.error('[Billing Portal] Error:', error);
    if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      return NextResponse.json(
        { error: 'Unable to open billing portal. Please contact support.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
