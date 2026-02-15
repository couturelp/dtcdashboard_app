import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICurrencyRate extends Document {
  _id: mongoose.Types.ObjectId;
  source_currency: string;
  target_currency: string;
  rate: number;
  fetched_at: Date;
  created_at: Date;
  updated_at: Date;
}

const CurrencyRateSchema = new Schema<ICurrencyRate>(
  {
    source_currency: { type: String, required: true, uppercase: true, trim: true },
    target_currency: { type: String, required: true, uppercase: true, trim: true },
    rate: { type: Number, required: true, min: 0 },
    fetched_at: { type: Date, required: true, default: Date.now },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// One rate per currency pair — upsert on fetch
CurrencyRateSchema.index({ source_currency: 1, target_currency: 1 }, { unique: true });

// TTL index: auto-expire stale rates after 24 hours
CurrencyRateSchema.index({ fetched_at: 1 }, { expireAfterSeconds: 86_400 });

const CurrencyRate: Model<ICurrencyRate> =
  mongoose.models.CurrencyRate || mongoose.model<ICurrencyRate>('CurrencyRate', CurrencyRateSchema);
export default CurrencyRate;
