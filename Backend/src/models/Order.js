import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash on Delivery', 'EasyPaisa', 'JazzCash', 'Bank Transfer'],
    default: 'Cash on Delivery'
  },
  paymentResult: {
    transactionId: { type: String },
    status: { type: String },
    updatedAt: { type: String },
  },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  trackingDetails: {
    carrier: { type: String, default: 'L&L Private Courier' },
    trackingNumber: { type: String, default: '' },
    estimatedDelivery: { type: Date }
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: true 
});


// Remove the 'next' parameter and use an async function
OrderSchema.pre('validate', async function() {
  if (!this.orderNumber) {
    const year = new Date().getFullYear();
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `LL-${year}-${randomChars}`;
  }
  // No next() call needed here when using async/await with Mongoose hooks
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;