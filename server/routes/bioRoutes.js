import express from 'express';
import { getBio, updateBio } from '../controllers/bioController.js';

const router = express.Router();

router.get('/', getBio);
router.put('/', updateBio); // TODO: Add authentication middleware

export default router;
