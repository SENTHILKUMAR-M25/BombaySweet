// // const mongoose = require("mongoose");

// // const categorySchema = new mongoose.Schema({
// //   categoryId: { type: String, unique: true },
// //   name: { type: String, required: true },
// //   image: { type: String, required: true },
  
// // },
// // { timestamps: true },);

// // // ✅ Auto ID (CAT-001)
// // categorySchema.pre("save", async function () {
// //   if (this.categoryId) return;

// //   const count = await mongoose.models.Category.countDocuments();
// //   this.categoryId = `CAT-${String(count + 1).padStart(3, "0")}`;
// // });

// // module.exports = mongoose.model("Category", categorySchema);




// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema(
//   {
//     categoryId: { type: String, unique: true },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// // AUTO INCREMENT CATEGORY ID
// categorySchema.pre("save", async function (next) {
//   if (this.categoryId) return next(); // already set

//   // Get the last category
//   const last = await mongoose.models.Category
//     .findOne({})
//     .sort({ createdAt: -1 })
//     .exec();

//   if (!last) {
//     this.categoryId = "CAT-001";
//   } else {
//     const lastIdNum = parseInt(last.categoryId.split("-")[1]);
//     this.categoryId = `CAT-${String(lastIdNum + 1).padStart(3, "0")}`;
//   }

//   next();
// });

// module.exports = mongoose.model("Category", categorySchema);



const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryId: { type: String, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// AUTO INCREMENT CATEGORY ID
categorySchema.pre("save", async function () {
  if (this.categoryId) return; // already set

  // Get the last category
  const last = await mongoose.models.Category
    .findOne({})
    .sort({ createdAt: -1 })
    .exec();

  if (!last) {
    this.categoryId = "CAT-001";
  } else {
    const lastIdNum = parseInt(last.categoryId.split("-")[1]);
    this.categoryId = `CAT-${String(lastIdNum + 1).padStart(3, "0")}`;
  }
});

module.exports = mongoose.model("Category", categorySchema);