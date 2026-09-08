const Banner = require('../models/Banner');

// @desc    Get all active banners
// @route   GET /api/v1/banners
exports.getBanners = async (req, res) => {
  try {
    const { position } = req.query;
    const filter = { isActive: true };
    if (position) filter.position = position;

    const banners = await Banner.find(filter).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new promo banner
// @route   POST /api/v1/banners
exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};