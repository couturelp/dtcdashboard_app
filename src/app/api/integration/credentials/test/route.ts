import { NextRequest, NextResponse } from 'next/server';
import { testTenantConnection } from '@/lib/tenant-db';

export async function POST(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json({ error: 'Store not set up.' }, { status: 400 });
    }

    const success = await testTenantConnection(storeId);

    return NextResponse.json({
      connected: success,
      message: success
        ? 'Connection successful. Your database is reachable.'
        : 'Connection failed. Please verify your Fivetran destination settings and check that Fivetran IPs are whitelisted.',
      tested_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      '[Credentials Test] Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
