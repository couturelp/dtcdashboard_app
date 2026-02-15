import { NextRequest, NextResponse } from 'next/server';
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  setAuthCookies,
} from '@/lib/auth/jwt';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';

export async function POST(request: NextRequest) {
  try {
    const refreshTokenValue = request.cookies.get('refresh_token')?.value;

    if (!refreshTokenValue) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Verify the refresh token signature and expiry
    const payload = await verifyRefreshToken(refreshTokenValue);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }

    // Look up the user in the database to validate token_version.
    // If the user changed their password (which increments token_version),
    // the JWT's token_version will be stale and we reject the refresh.
    await connectDB();
    const user = await User.findById(payload.user_id).lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (user.token_version !== payload.token_version) {
      // token_version mismatch — password was reset or sessions were invalidated
      return NextResponse.json(
        { error: 'Session invalidated. Please log in again.' },
        { status: 401 }
      );
    }

    // Build fresh token payload with current user data (store_id may have changed since login)
    const tokenPayload = {
      user_id: user._id.toString(),
      store_id: user.store_id?.toString() || null,
      email: user.email,
      role: user.role,
      token_version: user.token_version,
    };

    const rememberMe = !!payload.remember_me;
    const newAccessToken = await signAccessToken(tokenPayload);
    const newRefreshToken = await signRefreshToken(tokenPayload, rememberMe);

    // Set rotated cookies
    await setAuthCookies(newAccessToken, newRefreshToken, rememberMe);

    return NextResponse.json({ message: 'Token refreshed' });
  } catch (error) {
    console.error('[Auth Refresh] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
