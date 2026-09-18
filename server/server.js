import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bioRoutes from './routes/bioRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));
app.use('/api/bio', bioRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'Server is running' }));
app.use((err, _req, res, _next) => res.status(500).json({ message: err.message }));
app.use((_req, res) => res.status(404).json({ message: 'Endpoint not found' }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sketchler')
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => { console.error('MongoDB connection error:', error); process.exit(1); });
