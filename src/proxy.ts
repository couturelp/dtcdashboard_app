import { jwtVerify, SignJWT, JWTPayload } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import User from '@/lib/db/models/user';
import { connectDB } from '@/lib/db/mongodb';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  return new TextEncoder().encode(secret);
}

function getJwtRefreshSecret(): Uint8Array {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not defined');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Attempt to refresh the access token using the refresh token.
 * Validates token_version against the database to ensure password resets
 * and session invalidations take effect within 15 minutes (when the
 * access token expires and this function is called).
 */
async function tryRefreshAccessToken(
  request: NextRequest
): Promise<{ payload: JWTPayload; newAccessToken: string } | null> {
  const refreshTokenValue = request.cookies.get('refresh_token')?.value;
  if (!refreshTokenValue) return null;

  try {
    const { payload } = await jwtVerify(refreshTokenValue, getJwtRefreshSecret());

    // Validate token_version against the database.
    // This ensures that after a password reset (which increments token_version),
    // existing sessions are invalidated within 15 minutes.
    await connectDB();
    const user = await User.findById(payload.user_id).select('token_version store_id').lean();
    if (!user || user.token_version !== payload.token_version) {
      return null;
    }

    // Use fresh store_id from DB (may have been set after initial login)
    const freshStoreId = user.store_id?.toString() || null;

    // Sign a new short-lived access token with validated claims
    const newAccessToken = await new SignJWT({
      user_id: payload.user_id,
      store_id: freshStoreId,
      email: payload.email,
      role: payload.role,
      token_version: user.token_version,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(getJwtSecret());

    // Update payload with fresh store_id for header injection
    const updatedPayload = { ...payload, store_id: freshStoreId };

    return { payload: updatedPayload, newAccessToken };
  } catch {
    return null;
  }
}

// Routes that require authentication
const PROTECTED_ROUTES = ['/app', '/admin'];

// Page routes under protected areas that should remain public (e.g., login/register)
const PUBLIC_PAGE_ROUTES = ['/app/login', '/app/register'];

// API routes that don't require authentication
const PUBLIC_API_ROUTES = ['/api/auth', '/api/health', '/api/billing/webhook'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public page routes that live under protected prefixes (e.g., /app/login)
  const isPublicPage = PUBLIC_PAGE_ROUTES.some((route) => pathname === route);
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Check if this is a protected page route
  const isProtectedPage = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  // Check if this is a protected API route
  const isApiRoute = pathname.startsWith('/api');
  const isPublicApiRoute = PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedApi = isApiRoute && !isPublicApiRoute;

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    // No access token — attempt refresh from refresh token
    const refreshResult = await tryRefreshAccessToken(request);
    if (refreshResult) {
      const { payload, newAccessToken } = refreshResult;

      if (pathname.startsWith('/admin') && payload.role !== 'admin') {
        if (isApiRoute) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        return NextResponse.redirect(new URL('/app', request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.user_id as string);
      requestHeaders.set('x-store-id', (payload.store_id as string) || '');
      requestHeaders.set('x-user-email', payload.email as string);
      requestHeaders.set('x-user-role', payload.role as string);

      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });

      response.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });

      return response;
    }

    if (isProtectedPage) {
      const loginUrl = new URL('/app/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify the JWT
  try {
    const { payload } = await jwtVerify(accessToken, getJwtSecret());

    // Admin routes require admin role
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/app', request.url));
    }

    // Inject user info into request headers so API route handlers can read them.
    // Must use NextResponse.next({ request: { headers } }) to modify the
    // *request* forwarded to the route handler — setting headers on the
    // response object only affects the response sent back to the client.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.user_id as string);
    requestHeaders.set('x-store-id', (payload.store_id as string) || '');
    requestHeaders.set('x-user-email', payload.email as string);
    requestHeaders.set('x-user-role', payload.role as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    // Access token expired or invalid — try transparent refresh
    const refreshResult = await tryRefreshAccessToken(request);
    if (refreshResult) {
      const { payload, newAccessToken } = refreshResult;

      // Admin check
      if (pathname.startsWith('/admin') && payload.role !== 'admin') {
        if (isApiRoute) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        return NextResponse.redirect(new URL('/app', request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.user_id as string);
      requestHeaders.set('x-store-id', (payload.store_id as string) || '');
      requestHeaders.set('x-user-email', payload.email as string);
      requestHeaders.set('x-user-role', payload.role as string);

      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });

      // Set the new access token cookie on the response
      response.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });

      return response;
    }

    // No valid refresh token either — require login
    if (isProtectedPage) {
      const loginUrl = new URL('/app/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/app/:path*', '/admin/:path*', '/api/((?!auth|health|billing/webhook).*)'],
};
