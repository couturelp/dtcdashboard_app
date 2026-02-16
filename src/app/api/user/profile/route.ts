import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db/mongodb';
import User from '@/lib/db/models/user';
import { sendVerificationEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId).select('name email').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name || '',
      email: user.email,
    });
  } catch (error) {
    console.error('[UserProfile] GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email } = body as { name?: string; email?: string };

    if (name === undefined && email === undefined) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};
    let emailChangeInitiated = false;

    // Update name
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length > 100) {
        return NextResponse.json({ error: 'Name must be 100 characters or less' }, { status: 400 });
      }
      updates.name = name.trim();
    }

    // Handle email change -- requires re-verification
    if (email !== undefined && email.toLowerCase() !== user.email) {
      const normalizedEmail = email.toLowerCase().trim();

      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
      }

      // Check for duplicate
      const existing = await User.findOne({ email: normalizedEmail, _id: { $ne: userId } });
      if (existing) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 409 });
      }

      // Generate verification token for the new email
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

      updates.email = normalizedEmail;
      updates.email_verified = false;
      updates.verification_token = hashedToken;
      updates.verification_token_expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Send verification email to the new address
      try {
        await sendVerificationEmail(normalizedEmail, rawToken);
      } catch (emailError) {
        console.error('[UserProfile] Failed to send verification email:', emailError);
        // Still update -- user can resend verification
      }

      emailChangeInitiated = true;
    }

    if (Object.keys(updates).length > 0) {
      await User.updateOne({ _id: userId }, { $set: updates });
    }

    return NextResponse.json({
      message: emailChangeInitiated
        ? 'Profile updated. Please verify your new email address.'
        : 'Profile updated successfully',
      emailChangeInitiated,
    });
  } catch (error) {
    console.error('[UserProfile] PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
