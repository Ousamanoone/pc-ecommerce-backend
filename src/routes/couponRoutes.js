const express = require('express');
const router = express.Router();
const {
  validateCoupon,
  getCoupons,
  createCoupon,
  deleteCoupon,
} = require('../controllers/couponController');
const { protect, adminOnly, staffOrAdmin } = require('../middlewares/authMiddleware');

// Endpoint xác thực mã giảm giá cho khách hàng
router.post('/validate', validateCoupon);

// Quản lý voucher cho Staff và Admin
router.route('/')
  .get(protect, staffOrAdmin, getCoupons)
  .post(protect, adminOnly, createCoupon);

router.route('/:id')
  .delete(protect, adminOnly, deleteCoupon);

module.exports = router;