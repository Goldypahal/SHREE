const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   POST /api/inquiries
// @desc    Submit a new inquiry (contact form)
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, type, message } = req.body;

  if (!name || !email || !type || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const inquiry = await Inquiry.create({ name, email, type, message });
    res.status(201).json({ message: 'Your inquiry has been received. We will be in touch.', inquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries (Admin only)
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
