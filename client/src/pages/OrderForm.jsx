import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';

const router = express.Router();

const sizePriceMap = {
  A5: 1499,
  A4: 2499,
  A3: 3499,
  A2: 4999,
};

const generateOrderId = async () => {
  const today = new Date();
  const dateString = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(
    today.getDate()
  ).padStart(2, '0')}`;

  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const orderCount = await Order.countDocuments({
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  return `SKL-${dateString}-${String(orderCount + 1).padStart(3, '0')}`;
};

router.post(
  '/',
  [
    body('customerName').notEmpty().withMessage('Full name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('pinCode').notEmpty().withMessage('PIN code is required'),
    body('portraitSize').isIn(['A5', 'A4', 'A3', 'A2']).withMessage('Choose a valid portrait size'),
    body('imageDataUrl').notEmpty().withMessage('Reference photo is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const payload = { ...req.body };
      const portraitSize = String(payload.portraitSize).toUpperCase();
      const price = sizePriceMap[portraitSize] || sizePriceMap.A4;
      const deliveryCharge = ['A3', 'A2'].includes(portraitSize) ? 199 : 0;
      const totalAmount = price + deliveryCharge;

      const order = new Order({
        ...payload,
        portraitSize,
        price,
        deliveryCharge,
        totalAmount,
        paymentMethod: payload.paymentMethod || 'UPI',
        paymentStatus: payload.paymentStatus || 'paid',
        numberOfPeople: Number(payload.numberOfPeople || 1),
        orderId: await generateOrderId(),
      });

      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.get('/track/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId.trim().toUpperCase() });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
