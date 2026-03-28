const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ================= HELPER: Generate Unique User ID =================
const generateUserId = async () => {
  const lastUser = await User.findOne().sort({ createdAt: -1 });
  if (!lastUser) return "USER-001";

  const lastIdNum = parseInt(lastUser.userId.split("-")[1]);
  const newIdNum = lastIdNum + 1;

  return `USER-${newIdNum.toString().padStart(3, "0")}`;
};

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    // Check existing user by email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique userId
    const userId = await generateUserId();

    // Create user
    const user = await User.create({
      userId,
      name,
      email,
      password: hashedPassword,
    });

    // Save session
    req.session.user = {
      id: user._id,
      name: user.name,
      role: "user",
      userId: user.userId,
    };

    res.status(201).json({
      msg: "User registered successfully",
      user: req.session.user,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    // Save session
    req.session.user = {
      id: user._id,
      name: user.name,
      role: "user",
      userId: user.userId,
    };

    res.json({
      msg: "Login successful",
      user: req.session.user,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= GET CURRENT USER =================
router.get("/me", (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ msg: "Not logged in" });
    res.json(req.session.user);
  } catch (err) {
    console.error("ME ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ msg: "Logout failed" });
      res.clearCookie("connect.sid");
      res.json({ msg: "Logged out successfully" });
    });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;