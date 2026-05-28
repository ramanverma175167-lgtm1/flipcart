import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnBulletList,
  BtnNumberedList,
  BtnClearFormatting,
  BtnUndo,
  BtnRedo,
  BtnLink,
} from "react-simple-wysiwyg";

export default function AddProducts() {
  const [product, setProduct] = useState({
    title: "",
    rating: "",
    reviews: "",
    discount: "",
    price: "",
    oldPrice: "",
    delivery: "",
    stock: "",
    storage: "",
    display: "",
    camera: "",
    battery: "",
    processor: "",
    warranty: "",
  });

  const [images, setImages] = useState([]); // FILES now
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // IMAGE UPLOAD (REAL FILES)
  const handleImages = (e) => {
    setImages(Array.from(e.target.files)); // ❗ store FILES only
  };

  // SUBMIT (FORMDATA FOR CLOUDINARY)
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();

  // 🔥 DEBUG FRONTEND
  console.log("PRODUCT:", product);
  console.log("IMAGES:", images);

  Object.keys(product).forEach((key) => {
    formData.append(key, product[key]);
  });

  formData.append("description", description);

  images.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const res = await fetch("https://flipcart-1-audl.onrender.com/api/products/add", {
      method: "POST",
      body: formData, // ❗ NO HEADERS
    });

    const data = await res.json();

    console.log("RESPONSE:", data);

    if (res.ok && data.success) {
      setMessage("Product added successfully!");
      setMessageType("success");

      setProduct({
        title: "",
        rating: "",
        reviews: "",
        discount: "",
        price: "",
        oldPrice: "",
        delivery: "",
        stock: "",
        storage: "",
        display: "",
        camera: "",
        battery: "",
        processor: "",
        warranty: "",
      });

      setImages([]);
      setDescription("");
    } else {
      setMessage(data.message || "Something went wrong");
      setMessageType("error");
    }
  } catch (err) {
    console.log(err);
    setMessage("Server error");
    setMessageType("error");
  }

  setLoading(false);
};

  const inputClass =
    "w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="w-full p-4">

      {/* HEADER */}
      <div className="bg-white shadow-sm rounded-xl p-5">
        <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
        <p className="text-sm text-gray-500">
          Add new products to your store
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5"
      >

        {/* LEFT SIDE */}
        <div className="bg-white shadow-sm rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-4">Product Info</h2>

          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            className={inputClass}
          />

          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              name="rating"
              value={product.rating}
              onChange={handleChange}
              placeholder="Rating"
              className={inputClass}
            />
            <input
              name="reviews"
              value={product.reviews}
              onChange={handleChange}
              placeholder="Reviews"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className={inputClass}
            />
            <input
              name="oldPrice"
              value={product.oldPrice}
              onChange={handleChange}
              placeholder="Old Price"
              className={inputClass}
            />
            <input
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Discount"
              className={inputClass}
            />
          </div>

          <input
            name="delivery"
            value={product.delivery}
            onChange={handleChange}
            placeholder="Delivery"
            className={`${inputClass} mt-3`}
          />

          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className={`${inputClass} mt-3`}
          />

          {/* IMAGE UPLOAD */}
          <label className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500">
            <FaCloudUploadAlt className="text-4xl text-gray-400" />
            <p className="text-sm text-gray-500 mt-2">
              Upload Product Images
            </p>
            <input type="file" multiple hidden onChange={handleImages} />
          </label>

          {/* PREVIEW (LOCAL ONLY) */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                className="h-20 w-full object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white shadow-sm rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-4">Details</h2>

          <div className="grid grid-cols-2 gap-3">
            <input name="storage" value={product.storage} onChange={handleChange} className={inputClass} placeholder="Storage" />
            <input name="display" value={product.display} onChange={handleChange} className={inputClass} placeholder="Display" />
            <input name="camera" value={product.camera} onChange={handleChange} className={inputClass} placeholder="Camera" />
            <input name="battery" value={product.battery} onChange={handleChange} className={inputClass} placeholder="Battery" />
            <input name="processor" value={product.processor} onChange={handleChange} className={inputClass} placeholder="Processor" />
            <input name="warranty" value={product.warranty} onChange={handleChange} className={inputClass} placeholder="Warranty" />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-5">
            <h3 className="font-semibold mb-2">Description</h3>

            <EditorProvider>
              <div className="border rounded-xl overflow-hidden">
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <BtnBulletList />
                  <BtnNumberedList />
                  <BtnLink />
                  <BtnUndo />
                  <BtnRedo />
                  <BtnClearFormatting />
                </Toolbar>

                <Editor
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  containerProps={{
                    style: {
                      minHeight: "200px",
                      padding: "10px",
                    },
                  }}
                />
              </div>
            </EditorProvider>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-5 p-3 text-white rounded-xl flex justify-center items-center gap-2 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Saving..." : "Add Product"}
          </button>

        </div>
      </form>
    </div>
  );
}