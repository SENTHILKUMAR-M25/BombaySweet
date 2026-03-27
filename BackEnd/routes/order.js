// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Cart = require("../models/Cart");

// // Create order from cart
// router.post("/checkout/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { shippingAddress, paymentMethod } = req.body;

//     // Fetch cart items
//     const cart = await Cart.findOne({ user: userId }).populate("items.product");
//     if (!cart || cart.items.length === 0)
//       return res.status(400).json({ msg: "Cart is empty" });

//     const orderItems = cart.items.map((item) => ({
//       product: item.product._id,
//       quantity: item.quantity,
//       price: item.product.price,
//     }));

//     const totalAmount = orderItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // Create order
//     const order = await Order.create({
//       user: userId,
//       items: orderItems,
//       shippingAddress,
//       totalAmount,
//       paymentMethod,
//     });

//     // Clear cart
//     cart.items = [];
//     await cart.save();

//     res.json({ msg: "Order placed successfully", order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Get user's orders
// router.get("/orders/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).populate("items.product");
//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ================= CREATE ORDER FROM CART =================
router.post("/checkout/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { shippingAddress, paymentMethod } = req.body;

    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // Map cart items to order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create new order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod,
      status: "Pending", // optional: you can track order status
    });

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= GET USER'S ORDERS =================
router.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.product");
    res.json(orders);
  } catch (err) {
    console.error("Fetch Orders Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= GET SINGLE ORDER BY ID =================
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("items.product");
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Fetch Order Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;