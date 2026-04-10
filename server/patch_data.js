const mongoose = require('mongoose');
const Student = require('./models/Student');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-management';

async function patchData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    const result = await Student.updateMany(
      { $or: [{ parentPhone: { $exists: false } }, { parentPhone: "" }, { parentPhone: null }] },
      { $set: { parentPhone: "9876543210" } }
    );

    console.log(`Updated ${result.modifiedCount} students with placeholder parent phone numbers.`);
    process.exit(0);
  } catch (err) {
    console.error('Error patching data:', err);
    process.exit(1);
  }
}

patchData();
