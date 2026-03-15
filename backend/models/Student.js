const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dept: { type: String, required: true },
  sec: { type: String, required: true },
  password: { type: String, required: true }, // For student login
  photoUrl: { type: String }, // Path to the uploaded passport size photo
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
