const mongoose = require('mongoose');

const counsellingRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  counsellorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counsellor', required: true },
  sessionDate: { type: Date, default: Date.now },
  notes: { type: String, required: true },
  behaviourObservation: { type: String },
  academicObservation: { type: String },
  recommendation: { type: String },
  riskScore: { type: Number, min: 0, max: 100 },
}, { timestamps: true });

module.exports = mongoose.model('CounsellingRecord', counsellingRecordSchema);
