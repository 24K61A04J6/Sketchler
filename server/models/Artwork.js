import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['painting', 'drawing', 'sculpture', 'digital', 'photography', 'mixed-media'],
      default: 'painting',
    },
    price: Number,
    year: Number,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Artwork = mongoose.model('Artwork', artworkSchema);
export default Artwork;
