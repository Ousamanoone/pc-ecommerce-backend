const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getDashboardStats,
} = require('../controllers/orderController');

router.get('/summary', getDashboardStats);
router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrderById);
router.route('/:id/status').patch(updateOrderStatus);

module.exports = router;