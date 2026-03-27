const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    rating: { type: Number, default: null },
    tag: { type: String, default: null },
    badge: { type: String, default: null },
  },
  { timestamps: true }
);

// Auto ID
productSchema.pre("save", async function () {
  if (this.productId) return;
  const count = await mongoose.models.Product.countDocuments();
  this.productId = `PROD-${String(count + 1).padStart(3, "0")}`;
});

module.exports = mongoose.model("Product", productSchema);