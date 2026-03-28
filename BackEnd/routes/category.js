const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const upload = require("../middleware/upload");


router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.body.name || !req.file) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const category = await Category.create({
      name: req.body.name,
      image: req.file.filename,
    });

    res.json({ msg: "Category Added", category });
  } catch (err) {
    console.error("ADD ERROR:", err);

    // Check duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "Category ID already exists, try again",
        key: err.keyValue,
      });
    }

    res.status(500).json({ msg: "Server Error" });
  }
});
// ================= GET ALL =================
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching categories" });
  }
});

// ================= UPDATE =================
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Category.findByIdAndUpdate(req.params.id, updateData);

    res.json({ msg: "Category Updated" });
  } catch (err) {
    res.status(500).json({ msg: "Update Error" });
  }
});

// ================= DELETE =================
router.delete("/delete/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete Error" });
  }
});

module.exports = router;