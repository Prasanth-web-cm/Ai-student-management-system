const mongoose = require('mongoose');

const smsLogSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  parentPhone: { type: String, required: true },
  message: { type: String, required: true },
  riskLevel: { type: String, enum: ['Green', 'Yellow', 'Red'], default: 'Red' },
  status: { type: String, enum: ['Sent', 'Failed'], default: 'Sent' },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SmsLog', smsLogSchema);
