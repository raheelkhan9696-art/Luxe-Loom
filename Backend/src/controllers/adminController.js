import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Helper to upload buffer to Cloudinary
 */
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "LuxeLoom_Archive" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};


export const getDashboardStats = async (req, res) => {
  try {
    // 1. Get Summary Totals
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);
    const activeOrders = orders.filter(o => ["Processing", "Shipped"].includes(o.status)).length;

    // 2. Aggregate Sales for Chart (Last 7 Days)
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
          status: { $ne: "Cancelled" }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalPrice" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format data for Recharts (e.g., { name: "Mon", value: 5000 })
    const chartData = salesData.map(item => ({
      name: new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' }),
      value: item.amount
    }));

    res.status(200).json({
      revenue: totalRevenue,
      activeOrders: activeOrders,
      inventoryValue: 1250000, // Replace with dynamic logic if needed
      chartData: chartData.length > 0 ? chartData : [ {name: 'No Data', value: 0} ]
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics protocol failed", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, material, countInStock } = req.body;

    if (!req.files || !req.files.mainImage) {
      return res.status(400).json({ message: "Primary asset is required." });
    }

    // 1. Upload to Cloudinary
    const mainImageUrl = await uploadToCloudinary(req.files.mainImage[0].buffer);

    let galleryUrls = [];
    if (req.files.images) {
      const urls = await Promise.all(
        req.files.images.map((file) => uploadToCloudinary(file.buffer))
      );
      
      // FIX 1: Wrap strings in objects if your schema expects objects
      // If your schema is just [String], keep it as 'urls'
      galleryUrls = urls.map(url => ({ url })); 
    }

    // 2. Create the Product
    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      material, // FIX 3: Ensure this matches your Model's enum or remove enum from Model
      countInStock: Number(countInStock),
      mainImage: mainImageUrl,
      images: galleryUrls, 
      createdBy: req.user._id // FIX 2: Changed from 'user' to 'createdBy'
    });

    const savedProduct = await product.save();
        res.status(201).json(savedProduct);
        res.status(201).json(
      {
        message: "Product successfully added to the Vault",
        product: savedProduct
      }
    );    
        


  } catch (error) {
    console.error("Creation Error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!product) return res.status(404).json({ message: "Product not found in Vault" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found in registry" });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product purged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --- 3. ORDER OVERSIGHT ---
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, isPaid, isDelivered } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status) order.status = status;
    if (trackingNumber) {
        order.trackingDetails = { ...order.trackingDetails, trackingNumber };
    }
    
    if (isPaid && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    
    if (isDelivered && !order.isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'Delivered';
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Order update failed", error: err.message });
  }
};

// --- 4. USER MANAGEMENT ---
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (user.isAdmin || user.role === 'admin') {
      return res.status(400).json({ message: "Cannot delete administrative accounts" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed from Registry" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};