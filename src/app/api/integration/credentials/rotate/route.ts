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
    const message = error instanceof Error ? error.message : '';
    if (message.includes('already in progress')) {
      return NextResponse.json(
        { error: 'Password rotation already in progress. Please wait and try again.' },
        { status: 409 }
      );
    }
    if (message.includes('No active tenant database')) {
      return NextResponse.json(
        { error: 'No active database found for this store.' },
        { status: 404 }
      );
    }
    // Log only the error message — NOT the full error object which may contain
    // the ALTER ROLE SQL statement with the new password in plaintext
    console.error(
      '[Credentials Rotate] Error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
