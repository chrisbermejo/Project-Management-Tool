const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: String,
  type_id: String,
  updated_by: String,
  updated_fields: Object
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;