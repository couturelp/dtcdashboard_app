import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

// Routes that require authentication
const PROTECTED_ROUTES = ['/app', '/admin'];

// API routes that don't require authentication
const PUBLIC_API_ROUTES = ['/api/auth', '/api/health', '/api/billing/webhook'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);

    // Admin routes require admin role
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/app', request.url));
    }

    // Inject user info into request headers for API routes
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.user_id as string);
    response.headers.set('x-store-id', (payload.store_id as string) || '');
    response.headers.set('x-user-email', payload.email as string);
    response.headers.set('x-user-role', payload.role as string);

    return response;
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
