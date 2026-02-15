// src/lib/db/models/shipping-rate.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IShippingRate extends Document {
  _id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  rate_type: 'flat' | 'per_item' | 'weight_based' | 'shopify_default';
  rate_value: number; // cents
  currency: string;
  conditions_json: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

const ShippingRateSchema = new Schema<IShippingRate>(
  {
    store_id: { type: Schema.Types.ObjectId, ref: 'Store', required: true, unique: true },
    rate_type: {
      type: String,
      enum: ['flat', 'per_item', 'weight_based', 'shopify_default'],
      required: true,
      default: 'shopify_default',
    },
    rate_value: { type: Number, required: true, min: 0, default: 0 }, // cents
    currency: { type: String, required: true, uppercase: true, default: 'USD' },
    conditions_json: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const ShippingRate: Model<IShippingRate> =
  mongoose.models.ShippingRate || mongoose.model<IShippingRate>('ShippingRate', ShippingRateSchema);
export default ShippingRate;
