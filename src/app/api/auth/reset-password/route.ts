import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/passwords';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body as { token?: string; password?: string };

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    // Validate new password strength
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      return NextResponse.json({ error: passwordCheck.error }, { status: 400 });
    }

    // Hash the raw token to match what's stored in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await connectDB();

    // Atomically find the user with a valid, unexpired reset token and consume it.
    // This prevents race conditions where two requests with the same token could both succeed.
    const user = await User.findOneAndUpdate(
      {
        reset_token: hashedToken,
        reset_token_expires: { $gt: new Date() },
      },
      {
        $set: {
          reset_token: null,
          reset_token_expires: null,
        },
      },
      { returnDocument: 'before' }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const password_hash = await hashPassword(password);

    // Update password and increment token_version to invalidate all existing JWTs.
    // Clearing failed_login_attempts and lockout_until in case the user was locked out.
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password_hash,
          failed_login_attempts: 0,
          lockout_until: null,
        },
        $inc: { token_version: 1 },
      }
    );

    return NextResponse.json({
      message: 'Password reset successful. Please log in with your new password.',
    });
  } catch (error) {
    console.error('[ResetPassword] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
