// src/lib/db/models/custom-expense.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomExpense extends Document {
  _id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  amount: number; // cents
  currency: string;
  expense_date: Date;
  created_at: Date;
  updated_at: Date;
}

const CustomExpenseSchema = new Schema<ICustomExpense>(
  {
    store_id: { type: Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 500 },
    category: { type: String, required: true, trim: true, maxlength: 500 },
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
    expense_date: { type: Date, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

CustomExpenseSchema.index({ store_id: 1, expense_date: -1 });
CustomExpenseSchema.index({ store_id: 1, category: 1 });

const CustomExpense: Model<ICustomExpense> =
  mongoose.models.CustomExpense ||
  mongoose.model<ICustomExpense>('CustomExpense', CustomExpenseSchema);
export default CustomExpense;
