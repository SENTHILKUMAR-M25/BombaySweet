const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const GuestCart = require("../models/GuestCart");
const Product = require("../models/Product");


// ================= HELPER =================
const getSessionId = (req) => {
  if (!req.session.guestId) {
    req.session.guestId = Date.now().toString();
  }
  return req.session.guestId;
};


// ================= ADD TO CART =================
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const price = product.price;

    // ================= LOGGED IN =================
    if (req.session.user) {
      const userId = req.session.user.id;

      let item = await Cart.findOne({ user: userId, product: productId });

      if (item) {
        item.quantity += quantity || 1;
        item.price = price;
        await item.save();
      } else {
        item = await Cart.create({
          user: userId,
          product: productId,
          quantity: quantity || 1,
          price,
        });
      }

      return res.json({ msg: "Added to cart", item });
    }

    // ================= GUEST =================
    const sessionId = getSessionId(req);

    let item = await GuestCart.findOne({
      sessionId,
      product: productId,
    });

    if (item) {
      item.quantity += quantity || 1;
      item.price = price;
      await item.save();
    } else {
      item = await GuestCart.create({
        sessionId,
        product: productId,
        quantity: quantity || 1,
        price,
      });
    }

    res.json({ msg: "Added to guest cart", item });

  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= GET CART =================
router.get("/", async (req, res) => {
  try {
    // Logged user
    if (req.session.user) {
      const items = await Cart.find({ user: req.session.user.id })
        .populate("product");

      return res.json({ cart: items });
    }

    // Guest user
    const sessionId = getSessionId(req);

    const items = await GuestCart.find({ sessionId })
      .populate("product");

    res.json({ cart: items });

  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ msg: "Error fetching cart" });
  }
});


// ================= UPDATE QUANTITY =================
router.put("/update/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ msg: "Invalid quantity" });
    }

    let item;

    if (req.session.user) {
      item = await Cart.findById(req.params.id);
    } else {
      item = await GuestCart.findById(req.params.id);
    }

    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.quantity = quantity;
    await item.save();

    res.json({ msg: "Updated", item });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ msg: "Update error" });
  }
});


// ================= DELETE ITEM =================
router.delete("/delete/:id", async (req, res) => {
  try {
    if (req.session.user) {
      await Cart.findByIdAndDelete(req.params.id);
    } else {
      await GuestCart.findByIdAndDelete(req.params.id);
    }

    res.json({ msg: "Item removed" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete error" });
  }
});


// ================= MERGE GUEST CART =================
router.post("/merge", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Not logged in" });
    }

    const userId = req.session.user.id;
    const sessionId = req.session.guestId;

    if (!sessionId) return res.json({ msg: "No guest cart" });

    const guestItems = await GuestCart.find({ sessionId });

    for (let item of guestItems) {
      let existing = await Cart.findOne({
        user: userId,
        product: item.product,
      });

      if (existing) {
        existing.quantity += item.quantity;
        await existing.save();
      } else {
        await Cart.create({
          user: userId,
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }

    // Clear guest cart
    await GuestCart.deleteMany({ sessionId });

    res.json({ msg: "Guest cart merged successfully" });

  } catch (err) {
    console.error("MERGE ERROR:", err);
    res.status(500).json({ msg: "Merge error" });
  }
});

module.exports = router;