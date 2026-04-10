const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String, required: true },
  answers: [{
    questionId: { type: String },
    questionText: { type: String },
    selectedOption: { type: String },
    isCorrect: { type: Boolean }
  }],
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
