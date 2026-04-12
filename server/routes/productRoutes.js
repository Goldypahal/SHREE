const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ inStock: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a new product (Admin only)
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/products/seed
// @desc    Seed products from local data (Admin only)
// @access  Private/Admin
router.post('/seed', protect, adminOnly, async (req, res) => {
  try {
    const localProducts = [
      {
        name: "Emerald Heritage Lehenga",
        price: 185000,
        category: "Couture 2026",
        description: "Hand-embroidered zardozi on deep emerald silk. A masterpiece of legacy and craftsmanship.",
        image: "/recent_collection_1_1775935496849.png",
        details: ["Pure Silk Base", "Intricate Zardozi Work", "Includes Blouse and Dupatta"]
      },
      {
        name: "Golden Serenade Saree",
        price: 125000,
        category: "Bridal Edit",
        description: "Heritage gold and cream silk saree with heavy heritage embroidery.",
        image: "/recent_collection_2_1775935517113.png",
        details: ["Heritage Banarasi Silk", "Gold Thread Work", "Custom Tailored Blouse"]
      },
      {
        name: "Pastel Ombre Sharara",
        price: 95000,
        category: "Signature Sets",
        description: "Exquisite pastel ombre sharara set with delicate mirror work.",
        image: "/recent_collection_3_1775935536571.png",
        details: ["Lightweight Georgette", "Mirror and Pearl Embellishments", "Hand-dyed Ombre"]
      },
      {
        name: "Ivory Sherwani",
        price: 145000,
        category: "Menswear",
        description: "Royal ivory sherwani with tonal embroidery for the modern groom.",
        image: "/recent_collection_4_1775935554281.png",
        details: ["Italian Crepe Base", "Tonal Hand Embroidery", "Slim Fit Silhouette"]
      }
    ];

    await Product.deleteMany({});
    const products = await Product.insertMany(localProducts);
    res.json({ message: `${products.length} products seeded successfully.`, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (Admin only)
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
