import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { sendMagicLinkEmail } from '@/lib/email';

// Rate limiter: 3 magic link requests per email per hour (per PRD)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(email: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(email);

  // Clean up stale entries periodically
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
const SUCCESS_MSG = 'If an account exists with that email, a login link has been sent.';

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
        { error: 'Too many magic link requests. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds ?? 3600) },
        }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      // Return same success message to prevent email enumeration
      return NextResponse.json({ message: SUCCESS_MSG });
    }

    // Generate magic link token (raw sent via email, hashed stored in DB)
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Store hashed token with 15-minute expiry and reset used flag
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          magic_link_token: hashedToken,
          magic_link_token_expires: new Date(Date.now() + 15 * 60 * 1000),
          magic_link_used: false,
        },
      }
    );

    // Send magic link email (non-blocking for user experience)
    try {
      await sendMagicLinkEmail(normalizedEmail, rawToken);
    } catch (emailError) {
      console.error('[MagicLink] Failed to send magic link email:', emailError);
      // Still return success to prevent enumeration
    }

    return NextResponse.json({ message: SUCCESS_MSG });
  } catch (error) {
    console.error('[MagicLink] Request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
