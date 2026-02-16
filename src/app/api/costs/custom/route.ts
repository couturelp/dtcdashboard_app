// src/app/api/costs/custom/route.ts
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

    // Validate date params before connecting to DB
    if (from && !isValidDate(from)) {
      return NextResponse.json({ error: 'Invalid "from" date. Use YYYY-MM-DD format.' }, { status: 400 });
    }
    if (to && !isValidDate(to)) {
      return NextResponse.json({ error: 'Invalid "to" date. Use YYYY-MM-DD format.' }, { status: 400 });
    }

    await connectDB();

    // Build query filter
    const filter: Record<string, unknown> = { store_id: storeId };
    if (category) {
      filter.category = category;
    }
    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from) dateFilter.$gte = new Date(from + 'T00:00:00Z');
      if (to) dateFilter.$lte = new Date(to + 'T23:59:59.999Z');
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }
    const { name, category, amount, currency, expense_date } = body;

    if (!isValidName(name)) {
      return NextResponse.json({ error: 'Name is required (max 500 characters).' }, { status: 400 });
    }
    if (!isValidCategory(category)) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });
    }
    if (!isPositiveAmount(amount) || amount === 0) {
      return NextResponse.json({ error: 'Amount must be a positive integer (in cents).' }, { status: 400 });
    }
    if (currency !== undefined && currency !== null && !isValidCurrency(currency)) {
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
      expense_date: new Date(expense_date + 'T00:00:00Z'),
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error('[Custom Expenses POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
