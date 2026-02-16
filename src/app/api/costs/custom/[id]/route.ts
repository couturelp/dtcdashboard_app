// src/app/api/costs/custom/[id]/route.ts
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import {
  isPositiveAmount,
  isValidCurrency,
  isValidCategory,
  isValidDate,
  isValidName,
} from '@/lib/costs/validation';
import CustomExpense from '@/lib/db/models/custom-expense';
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

    if (body.name !== undefined) {
      if (!isValidName(body.name)) {
        return NextResponse.json({ error: 'Name cannot be empty (max 500 characters).' }, { status: 400 });
      }
      updates.name = body.name.trim();
    }
    if (body.category !== undefined) {
      if (!isValidCategory(body.category)) {
        return NextResponse.json({ error: 'Category cannot be empty.' }, { status: 400 });
      }
      updates.category = body.category.trim();
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
    if (body.expense_date !== undefined) {
      if (!isValidDate(body.expense_date)) {
        return NextResponse.json({ error: 'Invalid expense_date.' }, { status: 400 });
      }
      updates.expense_date = new Date(body.expense_date + 'T00:00:00');
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
    }

    await connectDB();
    const expense = await CustomExpense.findOneAndUpdate(
      { _id: id, store_id: storeId },
      { $set: updates },
      { new: true }
    ).lean();

    if (!expense) {
      return NextResponse.json({ error: 'Expense not found.' }, { status: 404 });
    }

    return NextResponse.json({ expense });
  } catch (error) {
    console.error('[Custom Expenses PATCH]', error);
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
    const result = await CustomExpense.findOneAndDelete({ _id: id, store_id: storeId });

    if (!result) {
      return NextResponse.json({ error: 'Expense not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Custom Expenses DELETE]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
