import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');
const JWT_REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET || '');

export interface TokenPayload extends JWTPayload {
  user_id: string;
  store_id: string | null;
  email: string;
  role: string;
  token_version: number;
}

export async function signAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_SECRET);
}

export async function signRefreshToken(
  payload: Omit<TokenPayload, 'iat' | 'exp'>,
  rememberMe: boolean = false
): Promise<string> {
  const expiry = rememberMe ? '30d' : '7d';
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(JWT_REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Cookie options for auth tokens.
 * Returns config objects so cookies can be set on any response type
 * (NextResponse, redirect response, or via cookies() API).
 */
function getAuthCookieOptions(rememberMe: boolean = false) {
  const secure = process.env.NODE_ENV === 'production';
  return {
    accessToken: {
      name: 'access_token',
      httpOnly: true,
      secure,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 15 * 60, // 15 minutes
    },
    refreshToken: {
      name: 'refresh_token',
      httpOnly: true,
      secure,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
    },
  };
}

/**
 * Set auth cookies using the next/headers cookies() API.
 * Use this in POST/PATCH route handlers where you return NextResponse.json().
 * Do NOT use this when returning NextResponse.redirect() — use setAuthCookiesOnResponse instead.
 */
export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean = false
): Promise<void> {
  const cookieStore = await cookies();
  const opts = getAuthCookieOptions(rememberMe);

  cookieStore.set(opts.accessToken.name, accessToken, opts.accessToken);
  cookieStore.set(opts.refreshToken.name, refreshToken, opts.refreshToken);
}

/**
 * Set auth cookies directly on a NextResponse object.
 * Use this when returning NextResponse.redirect() — cookies() API does not work with redirects.
 */
export function setAuthCookiesOnResponse(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean = false
): void {
  const opts = getAuthCookieOptions(rememberMe);

  response.cookies.set(opts.accessToken.name, accessToken, opts.accessToken);
  response.cookies.set(opts.refreshToken.name, refreshToken, opts.refreshToken);
}

/**
 * Extract authenticated user from request cookies.
 * Used in API route handlers (not proxy — proxy uses its own logic via request.cookies).
 */
export async function getAuthenticatedUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return null;
  }

  return verifyAccessToken(accessToken);
}
