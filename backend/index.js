const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Debug
console.log("DEBUG: Current folder:", process.cwd());
console.log("DEBUG: Files in folder:", require("fs").readdirSync(process.cwd()));
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);

// Safety check
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI is undefined! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(uri) // ✅ no options needed
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});


  const cardRoutes = require("./routes/cards");
  app.use("/api/cards", cardRoutes);  


const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const debitCardRoutes = require("./routes/debitCards");
app.use("/api/debit-cards", debitCardRoutes);

const forgetCustomerRoutes = require("./routes/forgetCustomerId");
app.use("/api/users/forget-customer-id", forgetCustomerRoutes);

const forgotPasswordRoutes = require("./routes/forgotPassword");
app.use("/api/users/forgot-password", forgotPasswordRoutes);

const otpRoutes = require("./routes/otp"); // your OTP routes
app.use("/api/otp", otpRoutes); // <-- like your cards example

const adminAuthRoutes = require('./routes/adminAuth');
app.use('/api/admin', adminAuthRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
