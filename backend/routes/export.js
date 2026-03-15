const express = require('express');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const router = express.Router();

router.get('/marks/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const marks = await Mark.find({ studentId: req.params.studentId });
    
    let csv = 'Subject,Marks Obtained,Total Marks,Exam Type,Date\n';
    marks.forEach(m => {
      csv += `${m.subject},${m.marksObtained},${m.totalMarks},${m.examType},${m.date.toISOString().split('T')[0]}\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment(`${student.name}_marks.csv`);
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/attendance/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const attendance = await Attendance.find({ studentId: req.params.studentId });
    
    let csv = 'Date,Status\n';
    attendance.forEach(a => {
      csv += `${a.date.toISOString().split('T')[0]},${a.status}\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment(`${student.name}_attendance.csv`);
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
