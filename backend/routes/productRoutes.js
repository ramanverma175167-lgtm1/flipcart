import express from "express";
import Product from "../models/Product.js";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE PRODUCT
router.put("/update/:id", upload.array("images"), async (req, res) => {
  try {
    let imageUrls = [];

    // upload new images only if sent
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const uploadResult = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "products",
          }
        );

        imageUrls.push(uploadResult.secure_url);
      }
    }

    const existingProduct = await Product.findById(req.params.id);

    const updatedData = {
      ...req.body,
      images:
        imageUrls.length > 0 ? imageUrls : existingProduct.images,
    };

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      product: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/add", upload.array("images"), async (req, res) => {
  try {
    // 🔥 DEBUG 1
    console.log("===== BODY =====");
    console.log(req.body);

    console.log("===== FILES =====");
    console.log(req.files);

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const uploadResult = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "products",
          }
        );

        imageUrls.push(uploadResult.secure_url);
      }
    }

    const productData = {
      ...req.body,
      images: imageUrls,
    };

    // 🔥 DEBUG 2
    console.log("===== FINAL PRODUCT =====");
    console.log(productData);

    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;