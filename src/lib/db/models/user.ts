import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password_hash: string;
  name: string;
  role: 'user' | 'admin';
  email_verified: boolean;
  verification_token: string | null;
  verification_token_expires: Date | null;
  reset_token: string | null;
  reset_token_expires: Date | null;
  magic_link_token: string | null;
  magic_link_token_expires: Date | null;
  token_version: number;
  failed_login_attempts: number;
  lockout_until: Date | null;
  store_id: mongoose.Types.ObjectId | null;
  stripe_customer_id: string | null;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password_hash: { type: String, required: true },
    name: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    email_verified: { type: Boolean, default: false },
    verification_token: { type: String, default: null },
    verification_token_expires: { type: Date, default: null },
    reset_token: { type: String, default: null },
    reset_token_expires: { type: Date, default: null },
    magic_link_token: { type: String, default: null },
    magic_link_token_expires: { type: Date, default: null },
    token_version: { type: Number, default: 0 },
    failed_login_attempts: { type: Number, default: 0 },
    lockout_until: { type: Date, default: null },
    store_id: { type: Schema.Types.ObjectId, ref: 'Store', default: null },
    stripe_customer_id: { type: String, default: null, unique: true, sparse: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Prevent model recompilation in Next.js hot-reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
