const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  parentPhone: { type: String, required: true },
  dept: { type: String, required: true },
  sec: { type: String, required: true },
  password: { type: String, required: true }, // For student login
  photoUrl: { type: String }, // Path to the uploaded passport size photo
  parentAadharUrl: { type: String }, // Path to the uploaded parent Aadhar image
  extractedAadharData: { type: String }, // Raw OCR data extracted from the Aadhar card
  academicRisk: { 
    type: String, 
    enum: ['Green', 'Yellow', 'Red'], 
    default: 'Green' 
  },
  counsellorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counsellor' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
