import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { signAccessToken, signRefreshToken, setAuthCookiesOnResponse } from '@/lib/auth/jwt';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';
import { sendWelcomeEmail } from '@/lib/email';

/**
 * GET /api/auth/verify-email?token=xxx
 *
 * Renders a confirmation page with a button that POSTs to complete verification.
 * This prevents link preview bots (Slack, Discord, email client pre-fetchers)
 * from consuming the token before the user clicks.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return new NextResponse(renderErrorPage('Missing verification token.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Validate the token exists and is not expired (without consuming it)
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  await connectDB();

  const user = await User.findOne({
    verification_token: hashedToken,
    verification_token_expires: { $gt: new Date() },
  });

  if (!user) {
    return new NextResponse(
      renderErrorPage(
        'This verification link is invalid or has expired. Please request a new one.'
      ),
      {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  // Render a confirmation page with a button to complete verification
  const actionUrl = `/api/auth/verify-email`;
  return new NextResponse(renderConfirmationPage(token, actionUrl), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/**
 * POST /api/auth/verify-email
 *
 * Actually consumes the verification token, activates the account,
 * creates a session, and redirects to the dashboard.
 */
export async function POST(request: NextRequest) {
  try {
    // Accept token from form body (application/x-www-form-urlencoded) or JSON
    let token: string | null = null;

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      token = formData.get('token') as string | null;
    } else {
      const body = await request.json().catch(() => ({}));
      token = (body as { token?: string }).token || null;
    }

    if (!token) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
    }

    // Hash the token to match what's stored in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await connectDB();

    // Atomically find and consume the token to prevent race conditions
    const user = await User.findOneAndUpdate(
      {
        verification_token: hashedToken,
        verification_token_expires: { $gt: new Date() },
      },
      {
        $set: {
          email_verified: true,
          verification_token: null,
          verification_token_expires: null,
        },
      },
      { new: true }
    );

    if (!user) {
      // Token already used, expired, or invalid
      const errorUrl = new URL('/app/login', request.url);
      errorUrl.searchParams.set('error', 'invalid_or_expired_verification_link');
      return NextResponse.redirect(errorUrl);
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
    const refreshToken = await signRefreshToken(tokenPayload);

    // IMPORTANT: Must set cookies directly on the redirect response.
    // Using cookies() from next/headers does NOT work with NextResponse.redirect().
    const redirectResponse = NextResponse.redirect(new URL('/app', request.url));
    setAuthCookiesOnResponse(redirectResponse, accessToken, refreshToken);

    // Send welcome email (fire and forget -- don't block redirect)
    sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.error('[Verify] Failed to send welcome email:', err)
    );

    return redirectResponse;
  } catch (error) {
    console.error('[Verify Email] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ----- HTML rendering helpers -----

function renderConfirmationPage(token: string, actionUrl: string): string {
  // Escape the token for safe HTML embedding (it's a hex string, but be safe)
  const safeToken = token.replace(/[^a-f0-9]/gi, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Verify Your Email - DTC Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 48px 40px;
      max-width: 440px;
      width: 100%;
      text-align: center;
    }
    h1 {
      font-size: 22px;
      font-weight: 600;
      color: #111;
      margin-bottom: 12px;
    }
    p {
      font-size: 15px;
      color: #555;
      line-height: 1.5;
      margin-bottom: 28px;
    }
    button {
      background: #4F46E5;
      color: #fff;
      border: none;
      padding: 12px 36px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
    }
    button:hover { background: #4338CA; }
    button:disabled { background: #a5a3d9; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Verify your email</h1>
    <p>Click the button below to verify your email address and activate your DTC Dashboard account.</p>
    <form method="POST" action="${actionUrl}">
      <input type="hidden" name="token" value="${safeToken}" />
      <button type="submit" id="verifyBtn">Verify Email</button>
    </form>
  </div>
</body>
</html>`;
}

function renderErrorPage(message: string): string {
  // Escape HTML in message
  const safeMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Verification Error - DTC Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 48px 40px;
      max-width: 440px;
      width: 100%;
      text-align: center;
    }
    h1 {
      font-size: 22px;
      font-weight: 600;
      color: #111;
      margin-bottom: 12px;
    }
    p {
      font-size: 15px;
      color: #555;
      line-height: 1.5;
      margin-bottom: 28px;
    }
    a {
      color: #4F46E5;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Verification failed</h1>
    <p>${safeMessage}</p>
    <a href="/app/login">Go to login</a>
  </div>
</body>
</html>`;
}
