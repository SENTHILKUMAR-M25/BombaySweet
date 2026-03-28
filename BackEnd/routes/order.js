const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

// ================= PLACE ORDER =================
router.post("/place", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Login required" });
    }

    const userId = req.session.user.id;
    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (!cartItems.length) return res.status(400).json({ msg: "Cart is empty" });

    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);
      if (!product) return res.status(404).json({ msg: `Product ${item.product.name} not found` });
      if (product.stock < item.quantity)
        return res.status(400).json({ msg: `Insufficient stock for ${product.name}` });

      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
      });
    }

    const totalAmount = orderItems.reduce((acc, item) => acc + item.total, 0);

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress: req.body,
    });

    await Cart.deleteMany({ user: userId });

    res.json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ msg: "Order failed" });
  }
});

// ================= GET ALL ORDERS =================
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error("FETCH ORDERS ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
});

// ================= DELETE ORDER (ADMIN ONLY) =================
router.delete("/:id", async (req, res) => {
  try {
  

    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Order not found" });

    res.json({ msg: "Order deleted successfully" });
  } catch (err) {
    console.error("DELETE ORDER ERROR:", err);
    res.status(500).json({ msg: "Failed to delete order" });
  }
});

module.exports = router;