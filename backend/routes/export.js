const express = require('express');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const router = express.Router();

router.get('/pdf/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid Student ID format' });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const marks = await Mark.find({ studentId });
    const attendance = await Attendance.find({ studentId });

    const doc = new PDFDocument({ margin: 50 });
    let filename = `${student.name}_Performance_Report.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    // --- PDF Header ---
    doc.fillColor('#444444').fontSize(20).text('Student Performance Report', { align: 'center' });
    doc.moveDown();
    doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // --- Student Info ---
    doc.fillColor('#333333').fontSize(14).text(`Student Name: ${student.name}`);
    doc.text(`Student ID: ${student.studentId}`);
    doc.text(`Department: ${student.dept}`);
    doc.text(`Section: ${student.sec}`);
    doc.text(`Academic Risk: ${student.academicRisk || 'Green'}`);
    doc.moveDown();

    // --- Attendance Summary ---
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'Present').length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 'N/A';

    doc.fillColor('#444444').fontSize(16).text('Attendance Summary', { underline: true });
    doc.fontSize(12).text(`Total Days Tracked: ${totalDays}`);
    doc.text(`Days Present: ${presentDays}`);
    doc.text(`Attendance Percentage: ${attendancePercentage}%`);
    doc.moveDown();

    // --- Marks Table ---
    doc.fillColor('#444444').fontSize(16).text('Academic Performance', { underline: true });
    doc.moveDown(0.5);

    if (marks.length > 0) {
      const tableTop = doc.y;
      const itemHeaderY = tableTop + 10;
      
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Subject', 50, itemHeaderY);
      doc.text('Exam Type', 200, itemHeaderY);
      doc.text('Marks', 350, itemHeaderY);
      doc.text('Date', 450, itemHeaderY);
      
      doc.moveTo(50, itemHeaderY + 15).lineTo(550, itemHeaderY + 15).stroke();
      
      let currentY = itemHeaderY + 25;
      doc.font('Helvetica');
      
      marks.forEach(mark => {
        doc.text(mark.subject, 50, currentY);
        doc.text(mark.examType, 200, currentY);
        doc.text(`${mark.marksObtained} / ${mark.totalMarks}`, 350, currentY);
        doc.text(mark.date.toISOString().split('T')[0], 450, currentY);
        currentY += 20;
      });
    } else {
      doc.fontSize(12).text('No academic records found for this student.');
    }

    // --- Footer ---
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(10).text(
        `Generated on ${new Date().toLocaleDateString()} - EDUAI Student Management System`,
        50,
        doc.page.height - 50,
        { align: 'center', width: 500 }
      );
    }

    doc.pipe(res);
    doc.end();

  } catch (error) {
    console.error('PDF Generation Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get('/marks/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid Student ID format' });
    }
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    const marks = await Mark.find({ studentId });
    
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
    const { studentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid Student ID format' });
    }
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    const attendance = await Attendance.find({ studentId });
    
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
