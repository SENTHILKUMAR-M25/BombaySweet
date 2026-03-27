

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const orderRoutes = require("./routes/order");
require("dotenv").config();

const app = express();

// ===== DB CONNECT =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ===== MIDDLEWARE =====
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
// ✅ SESSION BEFORE ROUTES
app.use(
  session({
    name: "session-id",
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

// ===== ROUTES =====
app.use("/api/admin", require("./routes/adminAuth"));
app.use("/api/user", require("./routes/userAuth"));
app.use("/api/auth", require("./routes/commonAuth"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", orderRoutes);
// ===== TEST =====
app.get("/", (req, res) => {
  res.send("🚀 Backend Running");
});

// ===== SERVER =====
app.listen(5000, () => console.log("🔥 Server running on port 5000"));