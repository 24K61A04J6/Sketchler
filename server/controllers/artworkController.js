import Artwork from '../models/Artwork.js';

// Get all artworks
export const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured artworks
export const getFeaturedArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ featured: true }).limit(6);
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single artwork
export const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create artwork (admin)
export const createArtwork = async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    await artwork.save();
    res.status(201).json(artwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update artwork (admin)
export const updateArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete artwork (admin)
export const deleteArtwork = async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: 'Artwork deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
