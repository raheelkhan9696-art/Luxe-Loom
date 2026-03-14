import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  // Unique Order Reference (e.g., LL-2026-X99)
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },

  // Linking to the User (Customer)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Line Items in the Order
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      // Linking to the Product for inventory management
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],

  // Financial Details
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash on Delivery', 'EasyPaisa', 'JazzCash', 'Bank Transfer'],
    default: 'Cash on Delivery'
  },

  // To handle digital payment references (e.g., Transaction IDs for local wallets)
  paymentResult: {
    transactionId: { type: String },
    status: { type: String },
    updatedAt: { type: String },
  },

  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },

  // Shipping & Tracking (Critical for your Admin Power feature)
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

  // Lifecycle States
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
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;