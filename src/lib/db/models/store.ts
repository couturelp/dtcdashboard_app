import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStore extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  name: string;
  currency: string;
  timezone: string;
  setup_complete: boolean;
  created_at: Date;
  updated_at: Date;
}

const StoreSchema = new Schema<IStore>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true, trim: true },
    currency: { type: String, default: 'USD', uppercase: true },
    timezone: { type: String, default: 'America/New_York' },
    setup_complete: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Store: Model<IStore> = mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);
export default Store;
