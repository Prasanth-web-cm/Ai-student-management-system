const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const Counsellor = require('./models/Counsellor');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-management';

async function setupCounsellor() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await Counsellor.findOne({ email: 'counsellor@eduai.com' });
    if (existing) {
      console.log('Counsellor already exists:', existing.email);
    } else {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const newCounsellor = new Counsellor({
        name: 'John Doe',
        email: 'counsellor@eduai.com',
        phone: '1234567890',
        department: 'Computer Science',
        password: hashedPassword
      });
      await newCounsellor.save();
      console.log('Default counsellor created:');
      console.log('Email: counsellor@eduai.com');
      console.log('Password: password123');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
}

setupCounsellor();
