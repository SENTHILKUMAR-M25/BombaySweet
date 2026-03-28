const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
}, { timestamps: true }); // optional, helpful for sorting

// AUTO ID (based on last user)
userSchema.pre("save", async function () {
  if (this.userId) return;

  // Find last user
  const lastUser = await mongoose.models.User.findOne().sort({ createdAt: -1 });

  if (!lastUser) {
    this.userId = "USER-001";
  } else {
    const lastIdNum = parseInt(lastUser.userId.split("-")[1]);
    this.userId = `USER-${String(lastIdNum + 1).padStart(3, "0")}`;
  }
});

module.exports = mongoose.model("User", userSchema);