import { NextRequest, NextResponse } from 'next/server';
import { rotateTenantPassword, getTenantCredentials } from '@/lib/tenant-db';

export async function POST(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json({ error: 'Store not set up.' }, { status: 400 });
    }

    await rotateTenantPassword(storeId);
    const credentials = await getTenantCredentials(storeId);

    return NextResponse.json({
      message:
        'Password rotated successfully. Update your Fivetran destination with the new password.',
      credentials,
    });
  } catch (error) {
    console.error('[Credentials Rotate] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
