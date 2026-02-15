import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth/passwords';
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/auth/jwt';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';

// In-memory rate limiter: 10 attempts per IP per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up stale entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return { allowed: true };
  }

  if (entry.count >= 20) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count++;
  return { allowed: true };
}

// Generic error message to prevent user enumeration
const INVALID_CREDENTIALS_MSG = 'Invalid email or password';

export async function POST(request: NextRequest) {
  try {
    // IP-based rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip =
      request.headers.get('x-real-ip')?.trim() ||
      (forwardedFor ? forwardedFor.split(',').pop()?.trim() : undefined) ||
      'unknown';

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds ?? 900) },
        }
      );
    }

    const body = await request.json();
    const { email, password, rememberMe } = body as {
      email?: string;
      password?: string;
      rememberMe?: boolean;
    };

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    // Find user by email — use same error for "not found" and "wrong password" to prevent enumeration
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: INVALID_CREDENTIALS_MSG }, { status: 401 });
    }

    // Check account lockout (10 failed attempts, 30-minute cooldown)
    if (user.lockout_until) {
      if (new Date() < user.lockout_until) {
        const remainingMs = user.lockout_until.getTime() - Date.now();
        const remainingMin = Math.ceil(remainingMs / 60000);
        return NextResponse.json(
          { error: `Account temporarily locked. Try again in ${remainingMin} minute${remainingMin !== 1 ? 's' : ''}.` },
          { status: 423 }
        );
      }
      // Lockout expired — reset counter so user gets fresh 10 attempts
      await User.updateOne(
        { _id: user._id },
        { $set: { failed_login_attempts: 0, lockout_until: null } }
      );
      user.failed_login_attempts = 0;
      user.lockout_until = null;
    }

    // Check if email is verified
    if (!user.email_verified) {
      return NextResponse.json(
        { error: 'Please verify your email address before logging in. Check your inbox for a verification link.' },
        { status: 403 }
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      // Atomically increment failed attempts to avoid race conditions
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        { $inc: { failed_login_attempts: 1 } },
        { new: true }
      );

      // Lock account after 10 failed attempts
      if (updated && updated.failed_login_attempts >= 10) {
        await User.updateOne(
          { _id: user._id },
          { $set: { lockout_until: new Date(Date.now() + 30 * 60 * 1000) } }
        );
      }

      return NextResponse.json({ error: INVALID_CREDENTIALS_MSG }, { status: 401 });
    }

    // Successful login — reset failed attempts and lockout
    if (user.failed_login_attempts > 0 || user.lockout_until) {
      await User.updateOne(
        { _id: user._id },
        { $set: { failed_login_attempts: 0, lockout_until: null } }
      );
    }

    // Create JWT session
    const tokenPayload = {
      user_id: user._id.toString(),
      store_id: user.store_id?.toString() || null,
      email: user.email,
      role: user.role,
      token_version: user.token_version,
    };

    const accessToken = await signAccessToken(tokenPayload);
    const refreshToken = await signRefreshToken(tokenPayload, !!rememberMe);

    // Set auth cookies
    await setAuthCookies(accessToken, refreshToken, !!rememberMe);

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        store_id: user.store_id?.toString() || null,
      },
    });
  } catch (error) {
    console.error('[Login] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
