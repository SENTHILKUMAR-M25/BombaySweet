// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   userId: { type: String, unique: true },
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// // AUTO ID
// userSchema.pre("save", async function (next) {
//   if (this.userId) return next();

//   const count = await mongoose.models.User.countDocuments();
//   this.userId = `USER-${String(count + 1).padStart(3, "0")}`;

//   next();
// });

// module.exports = mongoose.model("User", userSchema);




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// AUTO ID
userSchema.pre("save", async function () {
  if (this.userId) return; // no need for next()

  const count = await mongoose.models.User.countDocuments();
  this.userId = `USER-${String(count + 1).padStart(3, "0")}`;
});

module.exports = mongoose.model("User", userSchema);