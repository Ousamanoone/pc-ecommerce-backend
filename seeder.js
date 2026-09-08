const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const Banner = require('./src/models/Banner');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');  

dotenv.config();

const sampleBanners = [
  {
    title: 'Next-Gen PC Builds with RTX 4090 OC',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1600&q=80',
    linkUrl: '/products',
    position: 'hero_main',
  },
  {
    title: 'Ultimate Mechanical Keyboards & Custom Gear',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1600&q=80',
    linkUrl: '/products',
    position: 'hero_main',
  },
];

const sampleProducts = [
  {
    name: 'ASUS ROG Strix GeForce RTX 4080 16GB OC Edition',
    slug: 'asus-rog-strix-geforce-rtx-4080-16gb-oc',
    brand: 'ASUS',
    category: 'GPU',
    price: 1299,
    discountPrice: 1199,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
    ],
    description:
      'The ASUS ROG Strix GeForce RTX 4080 16GB GDDR6X brings extreme performance with axial-tech fans and patented vapor chamber.',
    specs: {
      'Graphics Coprocessor': 'NVIDIA GeForce RTX 4080',
      'VRAM Size': '16 GB GDDR6X',
      'Memory Bus Width': '256-bit',
      'Recommended PSU': '750W',
    },
    rating: 4.9,
    numReviews: 24,
  },
  {
    name: 'Intel Core i9-14900K 24-Core Desktop Processor',
    slug: 'intel-core-i9-14900k-desktop-processor',
    brand: 'Intel',
    category: 'CPU',
    price: 589,
    discountPrice: 549,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80'],
    description: '24 cores (8 P-cores + 16 E-cores) and up to 6.0 GHz unlocked clock speed.',
    specs: {
      Socket: 'LGA1700',
      Cores: '24 Cores / 32 Threads',
      'Max Turbo Frequency': '6.0 GHz',
    },
    rating: 4.8,
    numReviews: 38,
  },
  {
    name: 'Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz',
    slug: 'corsair-vengeance-rgb-ddr5-32gb-6000mhz',
    brand: 'Corsair',
    category: 'RAM',
    price: 145,
    discountPrice: 129,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80'],
    description: 'Dynamic ten-zone RGB lighting and onboard voltage regulation for overclocking.',
    specs: {
      Capacity: '32GB (2 x 16GB)',
      Speed: 'DDR5 6000MHz',
      Latency: 'CL36',
    },
    rating: 4.7,
    numReviews: 19,
  },
  {
    name: 'Samsung Odyssey Neo G8 32-inch 4K 240Hz Gaming Monitor',
    slug: 'samsung-odyssey-neo-g8-32-inch-4k-240hz',
    brand: 'Samsung',
    category: 'Monitor',
    price: 999,
    discountPrice: 899,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'],
    description: 'Quantum Mini-LED curved gaming panel with 1ms response and HDR2000.',
    specs: {
      Resolution: '3840 x 2160 (4K UHD)',
      'Refresh Rate': '240Hz',
      'Response Time': '1ms (GtG)',
    },
    rating: 5.0,
    numReviews: 15,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Banner.deleteMany();

    await Banner.insertMany(sampleBanners);
    await Product.insertMany(sampleProducts);

    console.log('✅ Real Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
  const sampleAdmin = {
  name: 'System Administrator',
  email: 'admin@gearstore.com',
  password: 'AdminPassword123',
  role: 'admin',
};

await User.deleteMany();
await User.create(sampleAdmin);
console.log('✅ Admin Account Initialized: admin@gearstore.com / AdminPassword123');
};

seedData();