import express from 'express';
import Bio from '../models/Bio.js';

const router = express.Router();

// Get bio
router.get('/', async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found' });
    }
    res.json(bio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update bio (admin)
router.post('/', async (req, res) => {
  try {
    let bio = await Bio.findOne();

    if (bio) {
      Object.assign(bio, req.body);
    } else {
      bio = new Bio(req.body);
    }

    const savedBio = await bio.save();
    res.status(201).json(savedBio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
