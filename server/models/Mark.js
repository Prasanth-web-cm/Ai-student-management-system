const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  examType: { type: String, required: true }, // e.g., 'Midterm', 'Final', 'Quiz'
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mark', markSchema);
