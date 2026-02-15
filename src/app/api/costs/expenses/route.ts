// src/app/api/costs/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  isPositiveAmount,
  isValidCurrency,
  isValidFrequency,
  isValidDate,
} from '@/lib/costs/validation';
import OperatingExpense from '@/lib/db/models/operating-expense';
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

    await connectDB();
    const expenses = await OperatingExpense.find({ store_id: storeId })
      .sort({ start_date: -1 })
      .lean();

    // Calculate monthly_equivalent for each expense
    const withMonthly = expenses.map((exp) => ({
      ...exp,
      monthly_equivalent: calculateMonthlyEquivalent(exp.amount, exp.frequency),
    }));

    return NextResponse.json({ expenses: withMonthly });
  } catch (error) {
    console.error('[Expenses GET]', error);
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
    const { name, amount, currency, frequency, start_date, end_date } = body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!isPositiveAmount(amount)) {
      return NextResponse.json({ error: 'Amount must be a positive number.' }, { status: 400 });
    }
    if (currency && !isValidCurrency(currency)) {
      return NextResponse.json({ error: 'Invalid currency code.' }, { status: 400 });
    }
    if (!isValidFrequency(frequency)) {
      return NextResponse.json(
        { error: 'Frequency must be one_time, monthly, quarterly, or annual.' },
        { status: 400 }
      );
    }
    if (!isValidDate(start_date)) {
      return NextResponse.json({ error: 'Valid start_date is required.' }, { status: 400 });
    }
    if (end_date !== undefined && end_date !== null && !isValidDate(end_date)) {
      return NextResponse.json({ error: 'Invalid end_date.' }, { status: 400 });
    }

    await connectDB();
    const expense = await OperatingExpense.create({
      store_id: storeId,
      name: name.trim(),
      amount, // stored as cents from client
      currency: currency?.toUpperCase() || 'USD',
      frequency,
      start_date: new Date(start_date),
      end_date: end_date ? new Date(end_date) : null,
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error('[Expenses POST]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper: monthly equivalent in cents
function calculateMonthlyEquivalent(amountCents: number, frequency: string): number {
  switch (frequency) {
    case 'one_time':
      return 0; // one_time expenses are applied to their specific month only
    case 'monthly':
      return amountCents;
    case 'quarterly':
      return Math.round(amountCents / 3);
    case 'annual':
      return Math.round(amountCents / 12);
    default:
      return 0;
  }
}
