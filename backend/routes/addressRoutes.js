import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// =========================
// SAVE ADDRESS
// =========================
router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      name,
      mobile,
      pincode,
      city,
      state,
      house,
      colony,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const address = await Address.create({
      userId,
      name,
      mobile,
      pincode,
      city,
      state,
      house,
      colony,
    });

    res.status(201).json({
      success: true,
      message: "Address saved successfully",
      address,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// GET ADDRESS BY USER
// =========================
router.get("/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId,
    });

    res.json({
      success: true,
      addresses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await Address.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;