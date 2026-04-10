const express = require('express');
const Quiz = require('../models/Quiz');
const QuizResponse = require('../models/QuizResponse');
const { verifyToken, authorize } = require('../middleware/roleAuth');
const router = express.Router();

// Create a quiz (Admin only)
router.post('/', verifyToken, authorize(['admin']), async (req, res) => {
  try {
    console.log('Creating quiz with body:', JSON.stringify(req.body, null, 2));
    console.log('Created by user:', req.user.id);
    
    const quiz = new Quiz({
      ...req.body,
      createdBy: req.user.id
    });
    
    const savedQuiz = await quiz.save();
    console.log('Quiz saved successfully:', savedQuiz._id);
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error('Quiz creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all quizzes (Admin sees all, Students see active/closed)
router.get('/', verifyToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') {
      query = { status: { $in: ['active', 'closed'] } };
    }
    const quizzes = await Quiz.find(query).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quiz status (Admin only)
router.patch('/:id/status', verifyToken, authorize(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single quiz
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    // Check if student has already submitted
    let submission = null;
    if (req.user.role === 'student') {
      submission = await QuizResponse.findOne({ quizId: req.params.id, studentId: req.user.id });
    }
    
    res.json({ quiz, submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit quiz response (Student only)
router.post('/:id/submit', verifyToken, authorize(['student']), async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    if (quiz.status !== 'active') return res.status(400).json({ error: 'Quiz is not active' });

    // Check for existing submission
    const existing = await QuizResponse.findOne({ quizId: req.params.id, studentId: req.user.id });
    if (existing) return res.status(400).json({ error: 'You have already submitted this quiz' });

    // Calculate score
    let score = 0;
    const maxScore = quiz.questions.length;
    const processedAnswers = quiz.questions.map((q, index) => {
      const studentAnswer = answers[index]?.selectedOption;
      const isCorrect = studentAnswer === q.correctAnswer;
      if (isCorrect) score++;
      return {
        questionId: q._id,
        questionText: q.questionText,
        selectedOption: studentAnswer,
        isCorrect
      };
    });

    const response = new QuizResponse({
      quizId: req.params.id,
      studentId: req.user.id,
      studentName: req.user.name || 'Student',
      answers: processedAnswers,
      score,
      maxScore
    });

    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get results for a quiz (Admin only)
router.get('/:id/results', verifyToken, authorize(['admin']), async (req, res) => {
  try {
    const responses = await QuizResponse.find({ quizId: req.params.id }).sort({ submittedAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete quiz (Admin only)
router.delete('/:id', verifyToken, authorize(['admin']), async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    await QuizResponse.deleteMany({ quizId: req.params.id });
    res.json({ message: 'Quiz and responses deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
