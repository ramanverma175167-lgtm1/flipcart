import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserLogin.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// =========================
// TEMP OTP STORE
// =========================
const otpStore = {};

// =========================
// DEBUG: ROUTER LOADED
// =========================
console.log("✅ userSignup router loaded");

// =========================
// SIGNUP
// =========================
router.post("/signup", async (req, res) => {
  console.log("👉 HIT /signup");

  try {
    const { name, email, password } = req.body;

    console.log("DATA:", req.body);

    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ User exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ User created");

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("❌ Signup error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  console.log("👉 HIT /login");

  try {
    const { email, password } = req.body;

    console.log("LOGIN DATA:", req.body);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Wrong password");
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log("✅ Login success");

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("❌ Login error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// SEND OTP
// =========================
router.post("/send-otp", async (req, res) => {
  console.log("🔥 SEND OTP HIT");
  console.log("BODY:", req.body);

  try {
    const { email } = req.body;

    // ✅ ADD DEBUG HERE
    console.log("📩 REQUEST BODY:", req.body);
    console.log("📧 EMAIL:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    console.log(`🔐 OTP for ${email}: ${otp}`);

    // SEND EMAIL
    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is: ${otp}. It will expire in 5 minutes.`
    );

    return res.json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (err) {
    console.log("❌ SEND OTP ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// =========================
// VERIFY OTP
// =========================
router.post("/verify-otp", (req, res) => {
  console.log("👉 HIT /verify-otp");
  console.log("BODY:", req.body);

  try {
    const { email, otp } = req.body;

    const record = otpStore[email];

    console.log("EMAIL:", email);
    console.log("ENTERED OTP:", otp);
    console.log("STORED RECORD:", record);

    if (!record) {
      return res.json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // check expiry
    if (Date.now() > record.expiresAt) {
      console.log("❌ OTP EXPIRED");

      delete otpStore[email];

      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    // ✅ FIXED OTP CHECK (IMPORTANT)
    if (Number(record.otp) !== Number(otp)) {
      console.log("❌ INVALID OTP");

      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    console.log("✅ OTP VERIFIED SUCCESSFULLY");

    // clear OTP after success
    delete otpStore[email];

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (err) {
    console.log("❌ VERIFY ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// RESET PASSWORD
// =========================
router.post("/reset-password", async (req, res) => {
  console.log("👉 HIT /reset-password");

  try {
    const { email, password } = req.body;

    console.log("RESET DATA:", req.body);

    const hashed = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashed }
    );

    delete otpStore[email];

    console.log("✅ PASSWORD UPDATED");

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    console.log("❌ RESET ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;