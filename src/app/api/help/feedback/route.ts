import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleId, helpful } = body;

    if (!articleId || typeof helpful !== 'boolean') {
      return NextResponse.json({ error: 'Missing articleId or helpful field' }, { status: 400 });
    }

    // For MVP, log to console. In production, store in MongoDB:
    // await db.collection('help_feedback').insertOne({ articleId, helpful, createdAt: new Date() });
    console.log(`[Help Feedback] articleId=${articleId} helpful=${helpful}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
