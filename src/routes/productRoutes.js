const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  createProduct,
  deleteProduct,
  createProductReview,
  updateProduct, // <-- Thêm vào đây
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, adminOnly, createProduct);

router.route('/:id/reviews')
  .post(createProductReview);

router.route('/:slug')
  .get(getProductBySlug);

router.route('/:id')
  .put(protect, adminOnly, updateProduct) // <-- Thêm PUT để cập nhật
  .delete(protect, adminOnly, deleteProduct);

module.exports = router;