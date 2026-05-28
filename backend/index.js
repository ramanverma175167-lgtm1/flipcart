import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import authRoutes from "./routes/userSignup.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// DEBUG LOGGER (VERY IMPORTANT)
// =========================
app.use((req, res, next) => {
  console.log("👉 REQUEST:", req.method, req.url);
  next();
});

// =========================
// MONGODB
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// =========================
// ROUTES
// =========================
app.use("/api/address", addressRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminAuthRoutes);

// =========================
// TEST
// =========================
app.get("/", (req, res) => {
  res.send("Backend running");
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});