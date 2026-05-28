import { useEffect, useState } from "react";
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
  BtnLink,
} from "react-simple-wysiwyg";

export default function ProductView() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH
  const fetchProducts = async () => {
    const res = await fetch("https://flipcart-1-audl.onrender.com/api/products");
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE
  const deleteProduct = async (id) => {
    await fetch(`https://flipcart-1-audl.onrender.com/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  // OPEN EDIT
  const openEdit = (product) => {
    setEditing(product);
    setForm(product);
    setImages([]);
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // DESCRIPTION
  const handleEditor = (e) => {
    setForm({ ...form, description: e.target.value });
  };

  // NEW IMAGES
  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  // UPDATE
  const updateProduct = async () => {
    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(
      `https://flipcart-1-audl.onrender.com/api/products/${editing._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editing._id ? data.product : p
        )
      );

      setEditing(null);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">

        {products.map((p) => (
          <div
            key={p._id}
            className="border border-gray-200 rounded-xl p-3 bg-white"
          >
            <img
              src={p.images?.[0]}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h2 className="mt-2 font-semibold">{p.title}</h2>

            <p className="text-green-600 font-bold">
              ₹{p.price}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* EDIT MODAL */}
     {editing && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
    {/* MODAL BOX */}
    <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Product</h2>

        <button
          onClick={() => setEditing(null)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      {/* INPUTS */}
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(form)
          .filter((f) => f !== "images")
          .map((field) => (
            <input
              key={field}
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              placeholder={field}
              className="border p-2 rounded"
            />
          ))}
      </div>

      {/* DESCRIPTION */}
      <div className="mt-4 border rounded p-2">
        <EditorProvider>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <BtnBulletList />
            <BtnNumberedList />
            <BtnLink />
          </Toolbar>

          <Editor
            value={form.description || ""}
            onChange={handleEditor}
          />
        </EditorProvider>
      </div>

      {/* OLD IMAGES */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {editing.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            className="h-16 w-16 rounded object-cover border"
          />
        ))}
      </div>

      {/* NEW IMAGES */}
      <input
        type="file"
        multiple
        onChange={handleImages}
        className="mt-3"
      />

      {/* BUTTONS */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={updateProduct}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          onClick={() => setEditing(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}