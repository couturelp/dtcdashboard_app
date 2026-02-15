import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  return new TextEncoder().encode(secret);
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
    // Token expired or invalid
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
