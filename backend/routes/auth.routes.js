// backend/routes/auth.routes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");
const router = express.Router();
// Helper function — generates a JWT token that expires in 7 days
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// ── POST /api/auth/register ───────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return res.status(400).json({ message: "Request body is required" });
    console.log("Register req.body:", JSON.stringify(req.body));
    const fullname = (
      req.body.name ||
      req.body.Fullname ||
      req.body.fullname ||
      ""
    ).trim();
    const { email, password } = req.body || {};

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Safely build bio from available fields
    const { username, dob, gender, account_type, level } = req.body || {};
    const bioParts = [
      username ? `Username: ${username}` : "",
      dob ? `DOB: ${dob}` : "",
      gender ? `Gender: ${gender}` : "",
      account_type ? `Account: ${account_type}` : "",
      level ? `Interest: ${level}` : "",
    ].filter(Boolean);
    const bio = bioParts.length > 0 ? bioParts.join(", ") : "New user";

    const user = await User.create({
      name: fullname.trim(),
      username: username ? username.toLowerCase().trim() : undefined,
      email: email.toLowerCase().trim(),
      password,
      bio,
    });
    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const lookup = (email || "").toString().trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: lookup }, { username: lookup }],
    });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    if (user.status === "inactive")
      return res.status(403).json({
        message: "Your account is deactivated. Please contact the admin.",
      });
    const match = await user.matchPassword(password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });
    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────
// Returns the currently logged-in user's data (requires token)
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

//──PUT/api/auth/profile─────────────────────────────────────
//Updatename,bio,oruploadanewprofile picture
router.put(
  "/profile",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (req.body.name) user.name = req.body.name;
      if (req.body.bio) user.bio = req.body.bio;
      if (req.file) user.profilePic = req.file.filename;
      await user.save();
      const updated = await User.findById(user._id).select("-password");
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

//──PUT/api/auth/change-password────────────────────────────
router.put("/change-password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const match = await user.matchPassword(currentPassword);
    if (!match)
      return res.status(400).json({ message: "Current password is incorrect" });
    user.password = newPassword; // pre-save hook will hash this
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
