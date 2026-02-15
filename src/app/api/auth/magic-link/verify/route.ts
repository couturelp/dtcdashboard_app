import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { signAccessToken, signRefreshToken, setAuthCookiesOnResponse } from '@/lib/auth/jwt';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        `${APP_URL}/app/login?error=missing_token`
      );
    }

    await connectDB();

    // Hash the raw token to compare with stored hashed token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching, non-expired, non-used magic link token (atomic).
    // Also clears the token fields, resets login lockout, and verifies email in one operation.
    const user = await User.findOneAndUpdate(
      {
        magic_link_token: hashedToken,
        magic_link_token_expires: { $gt: new Date() },
        magic_link_used: false,
      },
      {
        $set: {
          magic_link_used: true,
          email_verified: true,
          magic_link_token: null,
          magic_link_token_expires: null,
          failed_login_attempts: 0,
          lockout_until: null,
        },
      },
      { new: true }
    );

    if (!user) {
      // Token invalid, expired, or already used
      return NextResponse.redirect(
        `${APP_URL}/app/login?error=invalid_magic_link`
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
    const refreshToken = await signRefreshToken(tokenPayload, false);

    // Redirect to dashboard with auth cookies
    const redirectUrl = user.store_id
      ? `${APP_URL}/app`
      : `${APP_URL}/app/setup`;
    const response = NextResponse.redirect(redirectUrl);
    setAuthCookiesOnResponse(response, accessToken, refreshToken, false);

    return response;
  } catch (error) {
    console.error('[MagicLink] Verify error:', error);
    return NextResponse.redirect(
      `${APP_URL}/app/login?error=server_error`
    );
  }
}
