import express from 'express';
import {
  getAllArtworks,
  getFeaturedArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from '../controllers/artworkController.js';

const router = express.Router();

// Public routes
router.get('/', getAllArtworks);
router.get('/featured', getFeaturedArtworks);
router.get('/:id', getArtworkById);

// Admin routes (TODO: Add authentication middleware)
router.post('/', createArtwork);
router.put('/:id', updateArtwork);
router.delete('/:id', deleteArtwork);

export default router;
