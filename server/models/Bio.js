import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    socialLinks: {
      instagram: String,
      twitter: String,
      linkedin: String,
      portfolio: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bio = mongoose.model('Bio', bioSchema);
export default Bio;
