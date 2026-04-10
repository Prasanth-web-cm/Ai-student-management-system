const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const CounsellingRecord = require('../models/CounsellingRecord');
const Attendance = require('../models/Attendance');
const { verifyToken, authorize } = require('../middleware/roleAuth');

// Get all students assigned to a counsellor
router.get('/assigned-students', verifyToken, authorize('counsellor'), async (req, res) => {
  try {
    const students = await Student.find({ counsellorId: req.user.id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching assigned students' });
  }
});

// Get a single student's details for the profile view
router.get('/student/:id', verifyToken, authorize(['admin', 'counsellor']), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student details' });
  }
});

// Add a counselling record
router.post('/record', verifyToken, authorize('counsellor'), async (req, res) => {
  try {
    const { studentId, notes, behaviourObservation, academicObservation, recommendation, riskScore } = req.body;
    const newRecord = new CounsellingRecord({
      studentId,
      counsellorId: req.user.id,
      notes,
      behaviourObservation,
      academicObservation,
      recommendation,
      riskScore
    });
    await newRecord.save();

    // Update student's risk level based on the score
    let academicRisk = 'Green';
    if (riskScore > 75) academicRisk = 'Red';
    else if (riskScore > 40) academicRisk = 'Yellow';

    await Student.findByIdAndUpdate(studentId, { academicRisk });

    res.status(201).json({ message: 'Counselling record added successfully', record: newRecord });
  } catch (error) {
    res.status(500).json({ error: 'Error adding counselling record' });
  }
});

// Get counselling history for a student
router.get('/records/:studentId', verifyToken, authorize(['admin', 'counsellor', 'student']), async (req, res) => {
  try {
    const records = await CounsellingRecord.find({ studentId: req.params.studentId })
      .populate('counsellorId', 'name')
      .sort({ sessionDate: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching records' });
  }
});

// Bulk mark attendance
router.post('/attendance/bulk', verifyToken, authorize(['admin', 'counsellor']), async (req, res) => {
  try {
    const { attendanceData } = req.body; // Array of { studentId, date, status }
    const results = await Attendance.insertMany(attendanceData);
    res.status(201).json({ message: 'Attendance marked successfully', results });
  } catch (error) {
    res.status(500).json({ error: 'Error marking attendance' });
  }
});

module.exports = router;
