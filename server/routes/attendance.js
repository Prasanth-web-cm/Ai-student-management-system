const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// Add attendance
router.post('/', async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance by student ID
router.get('/:studentId', async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.studentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
