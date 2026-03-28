const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

// ================= DASHBOARD =================
router.get("/", async (req, res) => {
  try {
    // Total users and products
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    // Total orders and revenue
    const orders = await Order.countDocuments();
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const revenue = revenueAgg[0]?.totalRevenue || 0;

    // Category-wise sold quantities
    const categories = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.category",
          foreignField: "_id",
          as: "catInfo",
        },
      },
      { $unwind: "$catInfo" },
      {
        $group: {
          _id: "$catInfo.name",
          value: { $sum: "$items.quantity" },
        },
      },
    ]);

    // Daily orders and revenue for Bar Chart
    const orderGraph = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      users,
      products,
      orders,
      revenue,
      categories,
      orderGraph: orderGraph.map(o => ({
        date: o._id,
        orders: o.orders,
        revenue: o.revenue,
      })),
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;