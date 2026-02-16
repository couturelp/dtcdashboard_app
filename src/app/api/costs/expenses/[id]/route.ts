// src/app/api/costs/expenses/[id]/route.ts
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import {
  isPositiveAmount,
  isValidCurrency,
  isValidFrequency,
  isValidDate,
  isValidName,
} from '@/lib/costs/validation';
import OperatingExpense from '@/lib/db/models/operating-expense';
import { connectDB } from '@/lib/db/mongodb';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid expense ID.' }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }
    const updates: Record<string, unknown> = {};

    // Only apply fields that are present in the body
    if (body.name !== undefined) {
      if (!isValidName(body.name)) {
        return NextResponse.json({ error: 'Name cannot be empty (max 500 characters).' }, { status: 400 });
      }
      updates.name = body.name.trim();
    }
    if (body.amount !== undefined) {
      if (!isPositiveAmount(body.amount) || body.amount === 0) {
        return NextResponse.json({ error: 'Amount must be a positive integer (in cents).' }, { status: 400 });
      }
      updates.amount = body.amount;
    }
    if (body.currency !== undefined) {
      if (!isValidCurrency(body.currency)) {
        return NextResponse.json({ error: 'Invalid currency code.' }, { status: 400 });
      }
      updates.currency = body.currency.toUpperCase();
    }
    if (body.frequency !== undefined) {
      if (!isValidFrequency(body.frequency)) {
        return NextResponse.json({ error: 'Invalid frequency.' }, { status: 400 });
      }
      updates.frequency = body.frequency;
    }
    if (body.start_date !== undefined) {
      if (!isValidDate(body.start_date)) {
        return NextResponse.json({ error: 'Invalid start_date.' }, { status: 400 });
      }
      updates.start_date = new Date(body.start_date + 'T00:00:00Z');
    }
    if (body.end_date !== undefined) {
      if (body.end_date !== null && !isValidDate(body.end_date)) {
        return NextResponse.json({ error: 'Invalid end_date.' }, { status: 400 });
      }
      updates.end_date = body.end_date ? new Date(body.end_date + 'T00:00:00Z') : null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
    }

    await connectDB();

    // Cross-field validation: end_date must not be before start_date.
    // Fetch the existing record so we can compare against the stored value
    // when only one of start_date/end_date is being updated.
    if (updates.start_date !== undefined || updates.end_date !== undefined) {
      const existing = await OperatingExpense.findOne({ _id: id, store_id: storeId })
        .select('start_date end_date')
        .lean();
      if (!existing) {
        return NextResponse.json({ error: 'Expense not found.' }, { status: 404 });
      }
      const effectiveStart = (updates.start_date as Date) || existing.start_date;
      const effectiveEnd = updates.end_date !== undefined ? (updates.end_date as Date | null) : existing.end_date;
      if (effectiveEnd && effectiveStart && effectiveEnd < effectiveStart) {
        return NextResponse.json({ error: 'end_date must not be before start_date.' }, { status: 400 });
      }
    }

    const expense = await OperatingExpense.findOneAndUpdate(
      { _id: id, store_id: storeId },
      { $set: updates },
      { new: true }
    ).lean();

    if (!expense) {
      return NextResponse.json({ error: 'Expense not found.' }, { status: 404 });
    }

    return NextResponse.json({ expense });
  } catch (error) {
    console.error('[Expenses PATCH]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid expense ID.' }, { status: 400 });
    }

    await connectDB();
    const result = await OperatingExpense.findOneAndDelete({ _id: id, store_id: storeId });

    if (!result) {
      return NextResponse.json({ error: 'Expense not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Expenses DELETE]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
