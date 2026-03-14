import Order from '../models/Order.js';
import Product from '../models/Product.js';

// --- 1. CREATE NEW ORDER ---
// @desc    Create new order with local payment options
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    transactionId, // For EasyPaisa/JazzCash manual verification
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  try {
    const order = new Order({
      orderNumber: `LL-${Date.now().toString().slice(-6)}`, // Generates LL-123456
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult: {
        transactionId: transactionId || 'N/A',
        status: paymentMethod === 'Cash on Delivery' ? 'Awaiting Collection' : 'Pending Verification',
      },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error: error.message });
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