import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/passwords';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { sendVerificationEmail } from '@/lib/email';
import { createStripeCustomer } from '@/lib/stripe';

// Simple in-memory rate limiter (per PRD: 5 attempts per IP per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up stale entries periodically to prevent memory leak
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body as {
      email?: string;
      password?: string;
      name?: string;
    };

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate password strength
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      return NextResponse.json({ error: passwordCheck.error }, { status: 400 });
    }

    await connectDB();

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Generate verification token (raw token sent in email, hashed version stored in DB)
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password_hash,
      name: name || '',
      verification_token: hashedToken,
      verification_token_expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Create Stripe customer (non-blocking — registration succeeds even if Stripe fails)
    try {
      const stripeCustomerId = await createStripeCustomer(email.toLowerCase(), user._id.toString());
      if (stripeCustomerId) {
        await User.updateOne({ _id: user._id }, { $set: { stripe_customer_id: stripeCustomerId } });
      }
    } catch (stripeError) {
      console.error('[Register] Stripe customer creation failed:', stripeError);
      // Don't fail registration if Stripe is unavailable
    }

    // Send verification email (with raw token — not hashed)
    // Wrapped in try/catch so that a SendGrid failure doesn't return 500
    // while the user record already exists in the database.
    try {
      await sendVerificationEmail(email.toLowerCase(), rawToken);
    } catch (emailError) {
      console.error('[Register] Failed to send verification email:', emailError);
      // User is created — they can request a new verification email later.
      // Still return 201 so the client knows the account was created.
    }

    return NextResponse.json(
      { message: 'Registration successful. Please check your email to verify your account.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Register] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
