const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc    Get products with filtering, search and sorting
// @route   GET /api/v1/products
exports.getProducts = async (req, res) => {
  try {
    const { category, brand, search, sort, limit = 50 } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (brand && brand !== 'All') query.brand = brand;
    if (search) query.name = { $regex: search, $options: 'i' };

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit));

    res.json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by slug
// @route   GET /api/v1/products/:slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new PC component
// @route   POST /api/v1/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete product by ID
// @route   DELETE /api/v1/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Đã xóa sản phẩm thành công', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Create new product review
// @route   POST /api/v1/products/:id/reviews
exports.createProductReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const { id } = req.params;

    // Tìm theo ID hoặc Slug
    const product = await Product.findOne({
      $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id }],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = {
      name: name || 'Anonymous Gamer',
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// @desc    Update product details / inventory
// @route   PUT /api/v1/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};