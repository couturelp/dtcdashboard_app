import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminAuditLog extends Document {
  _id: mongoose.Types.ObjectId;
  admin_user_id: mongoose.Types.ObjectId;
  action: string;
  target_type: string;
  target_id: string;
  details: Record<string, unknown>;
  created_at: Date;
}

const AdminAuditLogSchema = new Schema<IAdminAuditLog>(
  {
    admin_user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
      enum: [
        'database_created',
        'database_deleted',
        'database_recreated',
        'credentials_rotated',
        'security_group_updated',
        'customer_viewed',
        'ip_rule_added',
        'ip_rule_removed',
        'bulk_health_check',
      ],
    },
    target_type: {
      type: String,
      required: true,
      enum: ['customer', 'database', 'security_group', 'system'],
    },
    target_id: { type: String, default: '' },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

// Compound index for filtered queries on the audit log viewer
AdminAuditLogSchema.index({ created_at: -1 });
AdminAuditLogSchema.index({ action: 1, created_at: -1 });

const AdminAuditLog: Model<IAdminAuditLog> =
  mongoose.models.AdminAuditLog ||
  mongoose.model<IAdminAuditLog>('AdminAuditLog', AdminAuditLogSchema);

export default AdminAuditLog;
