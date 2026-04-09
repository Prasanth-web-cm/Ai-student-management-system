const express = require('express');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Counsellor = require('../models/Counsellor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Admin Registration
router.post('/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: admin._id, username: admin.username, role: 'admin' } });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

// Student Login
router.post('/student/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: student._id, name: student.name, studentId: student.studentId, role: 'student' } });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

// Counsellor Login
router.post('/counsellor/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const counsellor = await Counsellor.findOne({ email });
    if (!counsellor) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, counsellor.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: counsellor._id, role: 'counsellor' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: counsellor._id, name: counsellor.name, email: counsellor.email, role: 'counsellor' } });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

module.exports = router;
