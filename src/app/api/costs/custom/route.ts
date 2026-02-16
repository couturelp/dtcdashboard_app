// src/app/api/costs/custom/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  isPositiveAmount,
  isValidCurrency,
  isValidCategory,
  isValidDate,
} from '@/lib/costs/validation';
import CustomExpense from '@/lib/db/models/custom-expense';
import { connectDB } from '@/lib/db/mongodb';

export async function GET(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    await connectDB();

    // Build query filter
    const filter: Record<string, unknown> = { store_id: storeId };
    if (category) {
      filter.category = category;
    }
    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from && isValidDate(from)) dateFilter.$gte = new Date(from + 'T00:00:00');
      if (to && isValidDate(to)) dateFilter.$lte = new Date(to + 'T23:59:59.999');
      if (Object.keys(dateFilter).length > 0) {
        filter.expense_date = dateFilter;
      }
    }

    const expenses = await CustomExpense.find(filter).sort({ expense_date: -1 }).lean();

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('[Custom Expenses GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const storeId = request.headers.get('x-store-id');
    if (!storeId) {
      return NextResponse.json(
        { error: 'Store not set up. Please complete store setup first.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, category, amount, currency, expense_date } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!isValidCategory(category)) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });
    }
    if (!isPositiveAmount(amount)) {
      return NextResponse.json({ error: 'Amount must be a positive number.' }, { status: 400 });
    }
    if (currency && !isValidCurrency(currency)) {
      return NextResponse.json({ error: 'Invalid currency code.' }, { status: 400 });
    }
    if (!isValidDate(expense_date)) {
      return NextResponse.json({ error: 'Valid expense_date is required.' }, { status: 400 });
    }

    await connectDB();
    const expense = await CustomExpense.create({
      store_id: storeId,
      name: name.trim(),
      category: category.trim(),
      amount,
      currency: currency?.toUpperCase() || 'USD',
      expense_date: new Date(expense_date + 'T00:00:00'),
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error('[Custom Expenses POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
