const Coupon = require('../models/Coupon');

// @desc    Validate and calculate coupon discount
// @route   POST /api/v1/coupons/validate
exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code || orderAmount === undefined) {
      return res.status(400).json({ message: 'Coupon code and order amount are required' });
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: cleanCode, isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or inactive promotional voucher code.' });
    }

    // Kiểm tra ngày hết hạn
    if (new Date() > new Date(coupon.expirationDate)) {
      return res.status(400).json({ message: 'This promotional voucher has expired.' });
    }

    // Kiểm tra giới hạn lượt dùng
    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Voucher usage limit has been reached.' });
    }

    // Kiểm tra giá trị đơn hàng tối thiểu
    const amount = Number(orderAmount);
    if (amount < coupon.minOrderValue) {
      return res.status(400).json({
        message: `Order must be at least $${coupon.minOrderValue} to use code ${coupon.code}.`,
      });
    }

    // Tính toán số tiền khấu trừ
    let discount = 0;
    if (coupon.discountType === 'fixed') {
      discount = Math.min(coupon.discountValue, amount);
    } else if (coupon.discountType === 'percentage') {
      discount = (amount * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    discount = Math.round(discount * 100) / 100;

    res.json({
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: discount,
      finalAmount: Math.max(0, Math.round((amount - discount) * 100) / 100),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coupons
// @route   GET /api/v1/coupons
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new coupon
// @route   POST /api/v1/coupons
exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete coupon
// @route   DELETE /api/v1/coupons/:id
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Voucher removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};