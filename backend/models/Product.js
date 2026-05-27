import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    rating: String,
    reviews: String,
    discount: String,
    price: String,
    oldPrice: String,
    delivery: String,
    stock: String,
    storage: String,
    display: String,
    camera: String,
    battery: String,
    processor: String,
    warranty: String,
    description: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);