const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        brand: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ['GPU', 'CPU', 'RAM', 'Mainboard', 'PSU', 'Case', 'Monitor', 'Storage', 'Gear'],
        },
        price: { type: Number, required: true, min: 0 },
        discountPrice: { type: Number, default: 0 },
        stock: { type: Number, required: true, default: 0 },
        images: [{ type: String }],
        description: { type: String, required: true },
        // Thông số kỹ thuật chi tiết theo từng linh kiện
        specs: [
            {
                label: { type: String, required: true },
                value: { type: String, required: true },
            },
        ],
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);