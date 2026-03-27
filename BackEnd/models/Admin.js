// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   adminId: { type: String, unique: true },
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });

// // ✅ SAFE ID GENERATION
// adminSchema.pre("save", async function (next) {
//   try {
//     if (this.adminId) return next();

//     const count = await mongoose.models.Admin.countDocuments();
//     this.adminId = `BSSA-${String(count + 1).padStart(3, "0")}`;

//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = mongoose.model("Admin", adminSchema);


const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// ✅ FIXED PRE SAVE (NO next)
adminSchema.pre("save", async function () {
  if (this.adminId) return;

  const count = await mongoose.models.Admin.countDocuments();
  this.adminId = `BSSA-${String(count + 1).padStart(3, "0")}`;
});

module.exports = mongoose.model("Admin", adminSchema);