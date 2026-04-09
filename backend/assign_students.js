const mongoose = require('mongoose');
const Student = require('./models/Student');
const Counsellor = require('./models/Counsellor');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-management';

async function assignStudents() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    const counsellor = await Counsellor.findOne({ email: 'counsellor@eduai.com' });
    if (!counsellor) {
      console.error('Counsellor not found! Run seed_counsellor.js first.');
      process.exit(1);
    }

    const students = await Student.find({ counsellorId: { $exists: false } });
    if (students.length === 0) {
      console.log('No unassigned students found.');
    } else {
      console.log(`Assigning ${students.length} students to ${counsellor.name}...`);
      await Student.updateMany(
        { _id: { $in: students.map(s => s._id) } },
        { $set: { counsellorId: counsellor._id } }
      );
      console.log('Assignment complete.');
    }

    const assignedCount = await Student.countDocuments({ counsellorId: counsellor._id });
    console.log(`Total students assigned to ${counsellor.name}: ${assignedCount}`);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

assignStudents();
