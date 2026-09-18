import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';

const router = express.Router();
const sizePriceMap = { A5: 1499, A4: 2499, A3: 3499, A2: 4999 };

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

const nextOrderId = async () => {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const count = await Order.countDocuments({ createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()), $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) } });
  return `SKL-${date}-${String(count + 1).padStart(3, '0')}`;
};

const validateOrder = [
  body('customerName').trim().notEmpty(), body('phone').trim().notEmpty(), body('email').isEmail(),
  body('address').trim().notEmpty(), body('city').trim().notEmpty(), body('state').trim().notEmpty(),
  body('pinCode').trim().notEmpty(), body('portraitSize').isIn(['A5', 'A4', 'A3', 'A2']), body('imageDataUrl').notEmpty(),
];

router.post('/create-payment-order', validateOrder, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!razorpay) return res.status(503).json({ message: 'Payment gateway is not configured.' });

  try {
    const size = String(req.body.portraitSize).toUpperCase();
    const price = sizePriceMap[size];
    const deliveryCharge = ['A3', 'A2'].includes(size) ? 199 : 0;
    const totalAmount = price + deliveryCharge;
    const orderId = await nextOrderId();
    const razorpayOrder = await razorpay.orders.create({ amount: totalAmount * 100, currency: 'INR', receipt: orderId });
    const order = await Order.create({ ...req.body, portraitSize: size, price, deliveryCharge, totalAmount, orderId, razorpayOrderId: razorpayOrder.id, paymentStatus: 'pending', numberOfPeople: Number(req.body.numberOfPeople || 1) });
    res.status(201).json({ order, payment: { id: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency, key: process.env.RAZORPAY_KEY_ID } });
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.post('/verify-payment', [body('razorpay_order_id').notEmpty(), body('razorpay_payment_id').notEmpty(), body('razorpay_signature').notEmpty()], async (req, res) => {
  const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpayOrderId}|${paymentId}`).digest('hex');
  if (expected !== signature) return res.status(400).json({ message: 'Payment verification failed.' });
  try {
    const order = await Order.findOneAndUpdate({ razorpayOrderId }, { paymentStatus: 'paid', razorpayPaymentId: paymentId }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/track/:orderId', async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId.trim().toUpperCase() });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

export default router;
