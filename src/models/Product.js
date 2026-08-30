const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: String, required: true }, // ASUS, MSI, Gigabyte, Intel, AMD...
    category: { type: String, required: true }, // CPU, GPU, RAM, Mainboard...
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    specs: { type: Map, of: String }, // Dynamic specs: { "Socket": "LGA1700", "VRAM": "16GB" }
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);