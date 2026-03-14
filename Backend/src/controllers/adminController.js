import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// --- 1. DASHBOARD ANALYTICS ---
// @desc    Get total sales, order count, and user growth
// @route   GET /api/admin/dashboard-stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Calculate total revenue from delivered orders
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue
    });
  } catch (err) {
    res.status(500).json({ message: "Analytics Error", error: err.message });
  }
};

// --- 2. PRODUCT MANAGEMENT ---
// @desc    Create a new luxury item
// @route   POST /api/admin/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, material, countInStock, mainImage, images } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      material,
      countInStock,
      mainImage,
      images,
      createdBy: req.user.id // From authMiddleware
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(400).json({ message: "Invalid product data" });
  }
};

// @desc    Update stock or price
// @route   PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

// --- 3. ORDER OVERSIGHT (ADMIN POWER) ---
// @desc    Get all orders with customer details
// @route   GET /api/admin/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email') // Connects to User model
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// @desc    Update Order Status & Tracking (The "Power" Method)
// @route   PUT /api/admin/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, isPaid, isDelivered } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update lifecycle
    order.status = status || order.status;
    
    // Check if trackingDetails exists before updating to avoid errors
    if (order.trackingDetails) {
      order.trackingDetails.trackingNumber = trackingNumber || order.trackingDetails.trackingNumber;
    }
    
    if (isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    
    if (isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'Delivered';
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Order update failed" });
  }
};

// --- 4. USER/CLIENT MANAGEMENT ---
// @desc    Delete a user or change roles
// @route   DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.role !== 'admin') {
      await user.deleteOne();
      res.json({ message: "User removed from Registry" });
    } else {
      res.status(400).json({ message: "Cannot delete administrative accounts" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};