const express = require('express');
const router = express.Router();
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { predictPerformance } = require('../services/mlService');
const { generateStudentReport } = require('../services/pdfService');
const { sendSMSToParent } = require('../services/smsService');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Get performance prediction for a student
router.get('/predict/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid Student ID format' });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // 1. Fetch Attendance Data
    const attendanceRecords = await Attendance.find({ studentId });
    let attendanceRate = 0.5;
    if (attendanceRecords.length > 0) {
      const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
      attendanceRate = presentCount / attendanceRecords.length;
    }

    // 2. Fetch Marks Data
    const marksRecords = await Mark.find({ studentId });
    
    let midtermScore = 0.5;
    const midtermExams = marksRecords.filter(m => m.examType.toLowerCase() === 'midterm');
    if (midtermExams.length > 0) {
      const totalObtained = midtermExams.reduce((sum, m) => sum + m.marksObtained, 0);
      const totalPossible = midtermExams.reduce((sum, m) => sum + m.totalMarks, 0);
      midtermScore = totalObtained / totalPossible;
    }

    let quizRate = 0.5;
    const quizzes = marksRecords.filter(m => m.examType.toLowerCase() === 'quiz');
    if (quizzes.length > 0) {
      const totalObtained = quizzes.reduce((sum, m) => sum + m.marksObtained, 0);
      const totalPossible = quizzes.reduce((sum, m) => sum + m.totalMarks, 0);
      quizRate = totalObtained / totalPossible;
    }

    // 3. Get Prediction from ML Service
    const predictionResult = await predictPerformance({
      attendanceRate,
      midtermScore,
      quizRate,
      prevGPA: 3.0 // Mock for now
    });

    // 4. Update Student Risk if High
    if (predictionResult.status === 'At Risk') {
      await Student.findByIdAndUpdate(studentId, { academicRisk: 'Red' });
      // Trigger SMS
      await sendSMSToParent(student._id, student.name, student.parentPhone, 'Red', 'Academic prediction indicates high risk');
    }

    res.json({
      studentId,
      factors: {
        attendanceRate: parseFloat(attendanceRate.toFixed(2)),
        midtermScore: parseFloat(midtermScore.toFixed(2)),
        quizRate: parseFloat(quizRate.toFixed(2))
      },
      prediction: predictionResult
    });

  } catch (error) {
    console.error('ML Prediction Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate and download PDF report
router.get('/report/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Fetch data for the report (same as prediction factors)
    const attendanceRecords = await Attendance.find({ studentId });
    const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
    const attendanceRate = attendanceRecords.length > 0 ? presentCount / attendanceRecords.length : 0;

    const reportData = {
      attendanceRate,
      midtermScore: 0.75, // Simplified fetch or use existing logic
      quizRate: 0.8,
      predictionGrade: 0.85,
      suggestion: student.academicRisk === 'Red' ? 'Immediate counselling required.' : 'Keep up the good work.'
    };

    const fileName = `report_${student.studentId}.pdf`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    await generateStudentReport(student, reportData, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) console.error('PDF Download Error:', err);
      // Clean up file after download
      // fs.unlinkSync(filePath); 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error generating report' });
  }
});

module.exports = router;
