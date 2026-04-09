const express = require('express');
const multer = require('multer');
const path = require('path');
const Student = require('../models/Student');
const Counsellor = require('../models/Counsellor');
const bcrypt = require('bcryptjs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false);
  }
};

const Tesseract = require('tesseract.js');
const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Configure for multi-file upload
const registerUpload = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'parentAadhar', maxCount: 1 }
]);

// Helper for OCR extraction
async function extractPhoneFromImage(imagePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    console.log('OCR Raw Text:', text);
    
    // Improved Regex to find 10-digit Indian mobile numbers
    // Often formatted like +91-XXXXX-XXXXX, XXXXXXXXXX, 0 XXXXXXXXXX
    const phoneRegex = /(?:(?:\+|0{0,2})91[\s-]?)?[6789]\d{9}/g;
    const matches = text.match(phoneRegex);
    
    if (matches && matches.length > 0) {
      // Clean extracted number to just digits, take last 10
      return matches[0].replace(/\D/g, '').slice(-10);
    }
    return null;
  } catch (error) {
    console.error('OCR Extraction Error:', error);
    return null;
  }
}

// Create student with photo and parent aadhar
router.post('/', registerUpload, async (req, res) => {
  try {
    const { name, studentId, phone, dept, sec, password, parentPhone } = req.body;
    
    const photoUrl = req.files['photo'] ? `/uploads/${req.files['photo'][0].filename}` : null;
    const parentAadharUrl = req.files['parentAadhar'] ? `/uploads/${req.files['parentAadhar'][0].filename}` : null;

    let extractedPhone = null;
    let rawOcrText = "";
    
    if (parentAadharUrl) {
      const fullPath = path.join(__dirname, '..', parentAadharUrl);
      try {
        const { data: { text } } = await Tesseract.recognize(fullPath, 'eng');
        rawOcrText = text;
        const phoneRegex = /(?:(?:\+|0{0,2})91[\s-]?)?[6789]\d{9}/g;
        const matches = text.match(phoneRegex);
        if (matches && matches.length > 0) {
          extractedPhone = matches[0].replace(/\D/g, '').slice(-10);
        }
      } catch (ocrErr) {
        console.error('OCR processing failed:', ocrErr);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-assign counsellor based on department
    let assignedCounsellorId = null;
    try {
      // Find a counsellor in the same department
      const counsellor = await Counsellor.findOne({ department: dept });
      if (counsellor) {
        assignedCounsellorId = counsellor._id;
      }
    } catch (counsellorErr) {
      console.error('Auto-assignment failed:', counsellorErr);
    }

    const student = new Student({ 
      name, 
      studentId, 
      phone, 
      parentPhone: extractedPhone || parentPhone, // Prefer extracted, fallback to manual
      dept, 
      sec, 
      password: hashedPassword, 
      photoUrl,
      parentAadharUrl,
      extractedAadharData: rawOcrText,
      counsellorId: assignedCounsellorId
    });
    
    await student.save();
    res.status(201).json({ 
      message: 'Student registered successfully', 
      extractedPhone,
      student 
    });
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

// Redundant login route removed as it is now in auth.js
module.exports = router;
