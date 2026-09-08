const express = require('express');
const router = express.Router();
const { getBanners, createBanner } = require('../controllers/bannerController');

router.route('/').get(getBanners).post(createBanner);

module.exports = router;