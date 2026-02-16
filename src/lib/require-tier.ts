/**
 * Tier-gating middleware for API route handlers.
 *
 * Usage in a route handler:
 *
 *   import { requireTier } from '@/lib/require-tier';
 *
 *   export async function GET(request: NextRequest) {
 *     const denied = await requireTier(request, 'professional');
 *     if (denied) return denied;
 *     // ... rest of handler
 *   }
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { meetsMinimumTier, type TierName } from '@/lib/plans';
import { getUserTier } from '@/lib/subscription';

/**
 * Check that the authenticated user's store meets the required subscription tier.
 *
 * Returns `null` if the check passes (user has sufficient tier).
 * Returns a `NextResponse` (403) if the user's tier is insufficient — the caller
 * should return this response directly from the route handler.
 *
 * Requires `x-store-id` header to be set by the auth proxy. If the header is
 * missing, the user is treated as free tier.
 */
export async function requireTier(
  request: NextRequest,
  minimumTier: TierName
): Promise<NextResponse | null> {
  const storeId = request.headers.get('x-store-id');

  // No store → free tier
  if (!storeId) {
    if (meetsMinimumTier('free', minimumTier)) return null;
    return NextResponse.json(
      { error: 'upgrade_required', requiredTier: minimumTier },
      { status: 403 }
    );
  }

  await connectDB();
  const userTier = await getUserTier(storeId);

  if (meetsMinimumTier(userTier, minimumTier)) {
    return null; // Tier check passed
  }

  return NextResponse.json(
    { error: 'upgrade_required', requiredTier: minimumTier },
    { status: 403 }
  );
}
