import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db/mongodb';

export async function GET() {
  const checks: Record<string, string> = {};
  let isHealthy = true;

  // Check MongoDB connectivity
  try {
    await connectDB();
    const state = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (state === 1) {
      checks.mongodb = 'connected';
    } else {
      checks.mongodb = `not ready (state: ${state})`;
      isHealthy = false;
    }
  } catch {
    checks.mongodb = 'unreachable';
    isHealthy = false;
  }

  const payload = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    checks,
  };

  return NextResponse.json(payload, { status: isHealthy ? 200 : 503 });
}
