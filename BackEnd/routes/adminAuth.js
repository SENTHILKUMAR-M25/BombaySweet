const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const User = require("../models/User");

// ===== HELPER: Generate unique adminId =====
const generateAdminId = async () => {
  const lastAdmin = await Admin.findOne().sort({ createdAt: -1 });
  if (!lastAdmin) return "BSSA-001";
  const num = parseInt(lastAdmin.adminId.split("-")[1]) + 1;
  return `BSSA-${num.toString().padStart(3, "0")}`;
};

// ===== ADMIN REGISTER =====
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const exist = await Admin.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const adminId = await generateAdminId();

    const admin = await Admin.create({ name, email, password: hashed, adminId });
    req.session.admin = { id: admin._id, adminId: admin.adminId, name: admin.name };

    res.json({ role: "admin", name: admin.name, adminId: admin.adminId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===== ADMIN LOGIN =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    req.session.admin = { id: admin._id, adminId: admin.adminId, name: admin.name };
    res.json({ role: "admin", name: admin.name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===== ADMIN LOGOUT =====
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ msg: "Logout failed" });
    res.clearCookie("session-id");
    res.json({ msg: "Logged out" });
  });
});

// ===== GET CURRENT ADMIN =====
router.get("/me", (req, res) => {
  if (!req.session.admin) return res.status(401).json({ msg: "Not logged in" });
  res.json({ name: req.session.admin.name, adminId: req.session.admin.adminId });
});

// ===== MIDDLEWARE: AUTH =====
const adminAuth = (req, res, next) => {
  if (!req.session.admin) return res.status(401).json({ msg: "Not authorized" });
  next();
};

// ===== GET ALL USERS =====
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ===== DELETE USER =====
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete user" });
  }
});

module.exports = router;