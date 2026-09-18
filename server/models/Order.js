import mongoose from 'mongoose';

const ORDER_STATUSES = ['Order Received', 'Drawing in Progress', 'Drawing Completed', 'Shipped', 'Delivered'];

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  customerName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  portraitSize: { type: String, enum: ['A5', 'A4', 'A3', 'A2'], required: true },
  numberOfPeople: { type: Number, min: 1, default: 1 },
  portraitStyle: { type: String, default: '' },
  specialInstructions: { type: String, default: '' },
  imageDataUrl: { type: String, required: true },
  imageName: { type: String, default: 'reference-photo' },
  price: { type: Number, required: true, min: 0 },
  deliveryCharge: { type: Number, default: 0, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, default: 'UPI' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  razorpayOrderId: { type: String, index: true },
  razorpayPaymentId: String,
  orderStatus: { type: String, enum: ORDER_STATUSES, default: 'Order Received' },
}, { timestamps: true });

export { ORDER_STATUSES };
export default mongoose.model('Order', orderSchema);
