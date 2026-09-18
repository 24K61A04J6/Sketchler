import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    portraitSize: {
      type: String,
      enum: ['A5', 'A4', 'A3', 'A2'],
      required: true,
    },
    numberOfPeople: {
      type: Number,
      default: 1,
    },
    portraitStyle: {
      type: String,
      default: '',
    },
    specialInstructions: {
      type: String,
      default: '',
    },
    imageDataUrl: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      default: 'reference-photo',
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'UPI',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'paid',
    },
    orderStatus: {
      type: String,
      enum: ['Order Received', 'Drawing in Progress', 'Drawing Completed', 'Shipped', 'Delivered'],
      default: 'Order Received',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
