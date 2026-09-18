import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();
const username = process.env.ADMIN_USERNAME || 'demo_admin';
const email = process.env.ADMIN_EMAIL || 'admin@sketchler.local';
const password = process.env.ADMIN_PASSWORD || 'change-me-in-production';

try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sketchler');
  const existing = await Admin.findOne({ $or: [{ username }, { email }] });
  if (existing) console.log(`Admin already exists: ${username}`);
  else { await Admin.create({ username, email, password, role: 'admin' }); console.log(`Seeded admin: ${username}`); }
} finally { await mongoose.disconnect(); }
