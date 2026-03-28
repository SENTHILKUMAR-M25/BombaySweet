
const mongoose = require("mongoose");
const Counter = require("./Counter"); // ✅ IMPORT FIX

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: null,
      min: 1,
      max: 5,
    },
    tag: {
      type: String,
      default: null,
    },
    badge: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ AUTO INCREMENT PRODUCT ID
productSchema.pre("save", async function () {
  if (this.productId) return;

  const counter = await Counter.findOneAndUpdate(
    { name: "productId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.productId = `PROD-${String(counter.seq).padStart(3, "0")}`;
});

module.exports = mongoose.model("Product", productSchema);