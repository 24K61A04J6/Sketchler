import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import Artwork from '../models/Artwork.js';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Admin Login
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email } });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Create new admin (initial setup only)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const admin = new Admin({ username, email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create artwork (admin only)
router.post('/artworks', authMiddleware, async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    const savedArtwork = await artwork.save();
    res.status(201).json(savedArtwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update artwork (admin only)
router.put('/artworks/:id', authMiddleware, async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.json(artwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete artwork (admin only)
router.delete('/artworks/:id', authMiddleware, async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.json({ message: 'Artwork deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all contact messages (admin only)
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark contact as read (admin only)
router.put('/contacts/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
