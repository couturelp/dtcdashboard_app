// src/lib/db/models/operating-expense.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOperatingExpense extends Document {
  _id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  name: string;
  amount: number; // cents
  currency: string;
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'annual';
  start_date: Date;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

const OperatingExpenseSchema = new Schema<IOperatingExpense>(
  {
    store_id: { type: Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    name: { type: String, required: true, trim: true },
    amount: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (v: number) => Number.isInteger(v),
        message: 'amount must be an integer (cents)',
      },
    },
    currency: { type: String, required: true, uppercase: true, default: 'USD' },
    frequency: {
      type: String,
      enum: ['one_time', 'monthly', 'quarterly', 'annual'],
      required: true,
    },
    start_date: { type: Date, required: true },
    end_date: { type: Date, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

OperatingExpenseSchema.index({ store_id: 1, start_date: 1 });

const OperatingExpense: Model<IOperatingExpense> =
  mongoose.models.OperatingExpense ||
  mongoose.model<IOperatingExpense>('OperatingExpense', OperatingExpenseSchema);
export default OperatingExpense;
