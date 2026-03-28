const mongoose = require("mongoose");

const guestCartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Auto total
guestCartSchema.pre("save", function () {
  this.total = this.price * this.quantity;
});

// Prevent duplicates per session
guestCartSchema.index({ sessionId: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("GuestCart", guestCartSchema);