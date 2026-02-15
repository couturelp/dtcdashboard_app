import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITenantDatabase extends Document {
  _id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  database_name: string; // 'tenant_<store_id>'
  database_host: string; // RDS endpoint
  database_port: number; // 5432
  fivetran_username: string; // 'fivetran_<store_id>'
  // Encrypted password fields (AES-256-GCM)
  password_ciphertext: string;
  password_iv: string;
  password_auth_tag: string;
  // Status and tracking
  status: 'provisioning' | 'active' | 'error' | 'deleting';
  provisioned_at: Date | null;
  indexes_created_at: Date | null;
  last_connection_test_at: Date | null;
  last_connection_test_result: boolean | null;
  error_message: string | null;
  created_at: Date;
  updated_at: Date;
}

const TenantDatabaseSchema = new Schema<ITenantDatabase>(
  {
    store_id: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
      unique: true,
      index: true,
    },
    database_name: { type: String, required: true, unique: true },
    database_host: { type: String, required: true },
    database_port: { type: Number, required: true, default: 5432 },
    fivetran_username: { type: String, required: true, unique: true },
    // Encrypted password storage
    password_ciphertext: { type: String, required: true },
    password_iv: { type: String, required: true },
    password_auth_tag: { type: String, required: true },
    // Status
    status: {
      type: String,
      enum: ['provisioning', 'active', 'error', 'deleting'],
      default: 'provisioning',
    },
    provisioned_at: { type: Date, default: null },
    indexes_created_at: { type: Date, default: null },
    last_connection_test_at: { type: Date, default: null },
    last_connection_test_result: { type: Boolean, default: null },
    error_message: { type: String, default: null },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Prevent model recompilation in Next.js hot-reload
const TenantDatabase: Model<ITenantDatabase> =
  mongoose.models.TenantDatabase ||
  mongoose.model<ITenantDatabase>('TenantDatabase', TenantDatabaseSchema);

export default TenantDatabase;
