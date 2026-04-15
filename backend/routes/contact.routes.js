const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

// POST /api/contact - authenticated users send contact message to admin
router.post("/", protect, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }
    const contactMessage = new ContactMessage({
      sender: req.user._id,
      name,
      email,
      message,
    });
    await contactMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
