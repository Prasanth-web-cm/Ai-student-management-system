const express = require('express');
const router = express.Router();
const SmsLog = require('../models/SmsLog');
const { verifyToken, authorize } = require('../middleware/roleAuth');
const { sendSMSToParent } = require('../services/smsService');

// Get all SMS logs (Admin & Counsellor)
router.get('/history', verifyToken, authorize(['admin', 'counsellor']), async (req, res) => {
  try {
    const logs = await SmsLog.find()
      .populate('studentId', 'name studentId')
      .sort({ sentAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching SMS history' });
  }
});

// Manual SMS Alert
router.post('/manual', verifyToken, authorize(['admin', 'counsellor']), async (req, res) => {
  try {
    const { studentId, studentName, parentPhone, riskLevel, reason } = req.body;
    
    if (!studentId || !studentName || !parentPhone || !reason) {
      return res.status(400).json({ error: 'Missing required SMS fields' });
    }

    const result = await sendSMSToParent(studentId, studentName, parentPhone, riskLevel || 'Red', reason);
    
    if (result.success) {
      res.json({ message: 'Manual SMS sent and logged successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process manual SMS' });
  }
});

// Get logs for a specific student
router.get('/student/:studentId', verifyToken, authorize(['admin', 'counsellor', 'student']), async (req, res) => {
  try {
    const logs = await SmsLog.find({ studentId: req.params.studentId })
      .sort({ sentAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
});

module.exports = router;
