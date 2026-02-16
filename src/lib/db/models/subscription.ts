import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscription extends Document {
  _id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  stripe_subscription_id: string;
  stripe_price_id: string;
  status:
    | 'active'
    | 'trialing'
    | 'past_due'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'unpaid'
    | 'paused';
  current_period_start: Date;
  current_period_end: Date;
  cancel_at_period_end: boolean;
  canceled_at: Date | null;
  past_due_since: Date | null;
  created_at: Date;
  updated_at: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    store_id: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
      unique: true, // one subscription per store (MVP)
      index: true,
    },
    stripe_subscription_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    stripe_price_id: { type: String, required: true },
    status: {
      type: String,
      enum: [
        'active',
        'trialing',
        'past_due',
        'canceled',
        'incomplete',
        'incomplete_expired',
        'unpaid',
        'paused',
      ],
      required: true,
      default: 'incomplete',
    },
    current_period_start: { type: Date, required: true },
    current_period_end: { type: Date, required: true },
    cancel_at_period_end: { type: Boolean, default: false },
    canceled_at: { type: Date, default: null },
    past_due_since: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Note: stripe_subscription_id already has a unique index from `unique: true` in the schema.
// No additional .index() call needed — unique constraint creates a unique index automatically.

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;
