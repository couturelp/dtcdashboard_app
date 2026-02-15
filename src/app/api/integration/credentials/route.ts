import { NextRequest, NextResponse } from 'next/server';
import { getTenantCredentials } from '@/lib/tenant-db';

export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    const credentials = await getTenantCredentials(storeId);
    if (!credentials) {
      return NextResponse.json(
        { error: 'Database not provisioned. Please complete store setup.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ credentials });
  } catch (error) {
    console.error('[Credentials GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
