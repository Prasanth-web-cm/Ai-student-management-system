const express = require('express');
const multer = require('multer');
const path = require('path');
const Student = require('../models/Student');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Create student with passport photo
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, studentId, phone, dept, sec, password } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const student = new Student({ name, studentId, phone, dept, sec, password, photoUrl });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.photoUrl = `/uploads/${req.file.filename}`;
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Student login
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    const student = await Student.findOne({ studentId, password });
    if (!student) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

module.exports = router;
