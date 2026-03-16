import Order from '../models/Order.js';
import Product from '../models/Product.js';

// --- 1. CREATE NEW ORDER ---
// @desc    Create new order with local payment options
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,      // Ensure this is extracted
      shippingPrice,      // Ensure this is extracted
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in collection' });
    }

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      itemsPrice,
      taxPrice: taxPrice || 0, // Fallback to 0 if not provided
      shippingPrice: shippingPrice || 0,
      totalPrice,
      phoneno, // Add phone number to order schema
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Order failed', error: error.message });
  }
};




// --- 2. GET ORDER BY ID ---
// @desc    Get order details for the receipt/tracking page
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// --- 3. GET LOGGED IN USER ORDERS ---
// @desc    Get orders for the specific customer profile
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your orders' });
  }
};

// --- 4. UPDATE ORDER TO PAID ---
// @desc    Update order to paid (Used by Admin or Payment Callback)
// @route   PUT /api/orders/:id/pay
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult.status = 'Completed';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// Example Backend Logic
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Check if the user deleting it is the owner
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized to delete this order" });
      }

      await order.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getallOrders = async (req, res) => {
  try {    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  }
    catch (error) {
    res.status(500).json({ message: error.message });
  } 
};