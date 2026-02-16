import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { sendVerificationEmail } from '@/lib/email';

// Rate limiter: 3 resend requests per email per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(email: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(email);

  // Clean up stale entries periodically to prevent memory leak
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return { allowed: true };
  }

  if (entry.count >= 3) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count++;
  return { allowed: true };
}

// Generic success message to prevent email enumeration
const SUCCESS_MSG =
  'If an unverified account exists with that email, a new verification link has been sent.';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit per email address
    const rateCheck = checkRateLimit(normalizedEmail);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many verification requests. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds ?? 3600) },
        }
      );
    }

    await connectDB();

    // Only resend if the account exists and is NOT yet verified
    const user = await User.findOne({
      email: normalizedEmail,
      email_verified: false,
    });

    if (!user) {
      // Return same success message to prevent email enumeration.
      // This covers: no account exists, or account is already verified.
      return NextResponse.json({ message: SUCCESS_MSG });
    }

    // Generate a new verification token (raw sent via email, hashed stored in DB)
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Store the new hashed token with a fresh 24-hour expiry
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          verification_token: hashedToken,
          verification_token_expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      }
    );

    // Send verification email
    try {
      await sendVerificationEmail(normalizedEmail, rawToken);
    } catch (emailError) {
      console.error('[ResendVerification] Failed to send verification email:', emailError);
      // Still return success to prevent enumeration
    }

    return NextResponse.json({ message: SUCCESS_MSG });
  } catch (error) {
    console.error('[ResendVerification] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
