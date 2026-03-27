const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ================= GET CART =================
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("product");
    res.json(cartItems);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= ADD TO CART =================
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ msg: "Product ID required" });

    let cartItem = await Cart.findOne({ product: productId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ product: productId, quantity: quantity || 1 });
    }

    res.status(201).json({ msg: "Added to cart", cartItem });
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= UPDATE QUANTITY =================
router.put("/update/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    ).populate("product");

    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });
    res.json({ msg: "Quantity updated", cartItem });
  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= REMOVE FROM CART =================
router.delete("/delete/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    res.json({ msg: "Removed from cart" });
  } catch (err) {
    console.error("DELETE CART ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;