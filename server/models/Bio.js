import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    socialLinks: {
      instagram: String,
      twitter: String,
      linkedin: String,
      portfolio: String,
    },
    skills: [String],
  },
  { timestamps: true }
);

const Bio = mongoose.model('Bio', bioSchema);

export default Bio;
