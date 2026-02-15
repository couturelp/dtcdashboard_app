// src/lib/db/models/product-cost.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductCost extends Document {
  _id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  shopify_product_id: string | null;
  shopify_variant_id: string | null;
  sku: string | null;
  product_name: string;
  cost_per_unit: number; // stored as cents (integer) for precision
  currency: string;
  source: 'csv' | 'manual';
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
}

const ProductCostSchema = new Schema<IProductCost>(
  {
    store_id: { type: Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    shopify_product_id: { type: String, default: null },
    shopify_variant_id: { type: String, default: null },
    sku: { type: String, default: null },
    product_name: { type: String, required: true, trim: true },
    cost_per_unit: { type: Number, required: true, min: 0 }, // cents
    currency: { type: String, required: true, uppercase: true, default: 'USD' },
    source: { type: String, enum: ['csv', 'manual'], default: 'manual' },
    uploaded_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Compound index for upsert: one cost per variant per store
ProductCostSchema.index({ store_id: 1, shopify_variant_id: 1 }, { unique: true, sparse: true });
ProductCostSchema.index({ store_id: 1, sku: 1 });

const ProductCost: Model<IProductCost> =
  mongoose.models.ProductCost || mongoose.model<IProductCost>('ProductCost', ProductCostSchema);
export default ProductCost;
