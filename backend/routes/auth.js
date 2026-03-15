const express = require('express');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

router.post('/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering admin' });
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

module.exports = router;
