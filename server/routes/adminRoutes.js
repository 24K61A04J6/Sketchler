import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import Artwork from '../models/Artwork.js';
import Contact from '../models/Contact.js';
import Order, { ORDER_STATUSES } from '../models/Order.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

router.post('/login', [body('username').notEmpty(), body('password').notEmpty()], async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin || !(await admin.comparePassword(req.body.password))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' }), admin: { id: admin._id, username: admin.username, email: admin.email } });
});

router.post('/register', async (req, res) => {
  try { const admin = await Admin.create(req.body); res.status(201).json({ message: 'Admin created successfully', id: admin._id }); }
  catch (error) { res.status(400).json({ message: error.message }); }
});

router.post('/artworks', authMiddleware, async (req, res) => { try { res.status(201).json(await Artwork.create(req.body)); } catch (error) { res.status(400).json({ message: error.message }); } });
router.put('/artworks/:id', authMiddleware, async (req, res) => { try { res.json(await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })); } catch (error) { res.status(400).json({ message: error.message }); } });
router.delete('/artworks/:id', authMiddleware, async (req, res) => { try { await Artwork.findByIdAndDelete(req.params.id); res.json({ message: 'Artwork deleted successfully' }); } catch (error) { res.status(400).json({ message: error.message }); } });
router.get('/contacts', authMiddleware, async (_req, res) => res.json(await Contact.find().sort({ createdAt: -1 })));
router.put('/contacts/:id', authMiddleware, async (req, res) => res.json(await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.get('/orders', authMiddleware, async (_req, res) => res.json(await Order.find().sort({ createdAt: -1 })));
router.patch('/orders/:id/status', authMiddleware, async (req, res) => {
  if (!ORDER_STATUSES.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status' });
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});
export default router;
