const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Phục vụ thư mục tĩnh uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API Routes
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/banners', require('./src/routes/bannerRoutes'));
app.use('/api/v1/products', require('./src/routes/productRoutes'));
app.use('/api/v1/orders', require('./src/routes/orderRoutes'));
app.use('/api/v1/upload', require('./src/routes/uploadRoutes'));
app.use('/api/v1/coupons', require('./src/routes/couponRoutes')); // Route Coupons

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });