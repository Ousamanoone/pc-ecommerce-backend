const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
const createOrder = async (req, res) => {
  try {
    const { customer, orderItems, totalAmount, paymentMethod } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }
    const order = await Order.create({
      customer,
      orderItems,
      totalAmount,
      paymentMethod,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID (Tracking)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order reference not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Order ID format' });
  }
};

// Update status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Dashboard KPI stats
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 5 } });

    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      lowStockProducts,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getDashboardStats,
};