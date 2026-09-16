import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    dimensions: {
      width: Number,
      height: Number,
      unit: String,
    },
    medium: String,
    yearCreated: Number,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Artwork = mongoose.model('Artwork', artworkSchema);

export default Artwork;
