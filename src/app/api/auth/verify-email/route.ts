import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { signAccessToken, signRefreshToken, setAuthCookiesOnResponse } from '@/lib/auth/jwt';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
    }

    // Hash the token to match what's stored in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await connectDB();

    // Find user with matching token that hasn't expired
    const user = await User.findOne({
      verification_token: hashedToken,
      verification_token_expires: { $gt: new Date() },
    });

    if (!user) {
      // Redirect to a page explaining the link is invalid/expired
      const errorUrl = new URL('/app/login', request.url);
      errorUrl.searchParams.set('error', 'invalid_or_expired_verification_link');
      return NextResponse.redirect(errorUrl);
    }

    // Activate the account
    user.email_verified = true;
    user.verification_token = null;
    user.verification_token_expires = null;
    await user.save();

    // Create JWT session
    const tokenPayload = {
      user_id: user._id.toString(),
      store_id: user.store_id?.toString() || null,
      email: user.email,
      role: user.role,
      token_version: user.token_version,
    };

    const accessToken = await signAccessToken(tokenPayload);
    const refreshToken = await signRefreshToken(tokenPayload);

    // IMPORTANT: Must set cookies directly on the redirect response.
    // Using cookies() from next/headers does NOT work with NextResponse.redirect().
    const redirectResponse = NextResponse.redirect(new URL('/app', request.url));
    setAuthCookiesOnResponse(redirectResponse, accessToken, refreshToken);

    // Send welcome email (fire and forget — don't block redirect)
    sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.error('[Verify] Failed to send welcome email:', err)
    );

    return redirectResponse;
  } catch (error) {
    console.error('[Verify Email] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
