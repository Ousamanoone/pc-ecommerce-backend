const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customer: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            note: { type: String, default: '' },
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        paymentMethod: { type: String, default: 'COD' },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);