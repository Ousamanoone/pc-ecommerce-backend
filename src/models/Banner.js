const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, default: '/products' },
  position: { 
    type: String, 
    enum: ['hero_main', 'promo_sub', 'sidebar'], 
    default: 'hero_main' 
  },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);