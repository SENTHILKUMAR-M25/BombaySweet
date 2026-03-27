const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/upload");





router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, category, stock, price, oldPrice, tag, badge, rating } = req.body;

    if (!name || !category || !stock || !price || !req.file) {
      return res.status(400).json({ msg: "All required fields must be filled" });
    }

    const product = await Product.create({
      name,
      category,
      stock,
      price,
      oldPrice: oldPrice || null,
      tag: tag || null,
      badge: badge || null,
      rating: rating || null,
      image: req.file.filename,
    });

    res.status(201).json({ msg: "Product Added Successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, category, stock, price, oldPrice, tag, badge, rating } = req.body;

    const updateData = { name, category, stock, price, oldPrice, tag, badge, rating };

    if (req.file) updateData.image = req.file.filename;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product Updated Successfully", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Update Error" });
  }
});



// ================= GET ALL PRODUCTS =================
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ msg: "Error fetching products" });
  }
});

// ================= GET SINGLE PRODUCT =================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");

    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching product" });
  }
});

// ================= DELETE PRODUCT =================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product Deleted Successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete Error" });
  }
});

module.exports = router;