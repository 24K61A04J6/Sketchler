import Bio from '../models/Bio.js';

// Get artist bio
export const getBio = async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found' });
    }
    res.json(bio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update bio (admin)
export const updateBio = async (req, res) => {
  try {
    const { artistName, description, profileImage, socialLinks, email } = req.body;
    let bio = await Bio.findOne();
    
    if (!bio) {
      bio = new Bio({ artistName, description, profileImage, socialLinks, email });
    } else {
      Object.assign(bio, { artistName, description, profileImage, socialLinks, email });
    }
    
    await bio.save();
    res.json(bio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
