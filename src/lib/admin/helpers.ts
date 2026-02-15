import { NextRequest, NextResponse } from 'next/server';
import AdminAuditLog from '@/lib/db/models/admin-audit-log';
import { connectDB } from '@/lib/db/mongodb';

// ---------- Request header helpers ----------

export function getAdminUserId(request: NextRequest): string | null {
  const role = request.headers.get('x-user-role');
  if (role !== 'admin') return null;
  return request.headers.get('x-user-id');
}

/**
 * Guard for admin API routes. Returns a 403 JSON response if the caller
 * is not an admin, or the admin user ID string if authorized.
 */
export function requireAdmin(request: NextRequest): string | NextResponse {
  const adminId = getAdminUserId(request);
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return adminId;
}

// ---------- Audit log writer ----------

export async function logAdminAction(params: {
  adminUserId: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, unknown>;
}): Promise<void> {
  await connectDB();
  await AdminAuditLog.create({
    admin_user_id: params.adminUserId,
    action: params.action,
    target_type: params.targetType,
    target_id: params.targetId ?? '',
    details: params.details ?? {},
  });
}

// ---------- Pagination helper ----------

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function parsePagination(
  searchParams: URLSearchParams,
  defaultLimit = 50
): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('limit') || String(defaultLimit), 10))
  );
  return { page, limit, skip: (page - 1) * limit };
}
