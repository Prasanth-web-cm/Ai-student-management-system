const express = require('express');
const Mark = require('../models/Mark');
const router = express.Router();

// Add marks for a student
router.post('/', async (req, res) => {
  try {
    const mark = new Mark(req.body);
    await mark.save();
    res.status(201).json(mark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get marks by student ID
router.get('/:studentId', async (req, res) => {
  try {
    const marks = await Mark.find({ studentId: req.params.studentId });
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
