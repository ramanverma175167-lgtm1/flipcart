import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

const truncate = (
  text,
  limit = 15
) =>
  text?.length > limit
    ? text.slice(0, limit) + "..."
    : text;

export default function FeaturesSection() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);

  // =========================
  // NEW: MESSAGE STATE
  // =========================
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {

    try {

      const res = await fetch(
        "https://flipcart-1-audl.onrender.com/api/products"
      );

      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }

    } catch (error) {
      console.log("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD CART
  // =========================
  const loadCart = () => {

    try {

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setCartItems(cart);

    } catch (error) {
      setCartItems([]);
    }
  };

  useEffect(() => {

    fetchProducts();
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };

  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product) => {

    try {

      let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const exists = cart.find(
        (item) =>
          String(item.productId) === String(product._id)
      );

      if (exists) {
        showMessage("Already in cart");
        return;
      }

      const updatedCart = [
        ...cart,
        {
          productId: product._id,
          qty: 1,
        },
      ];

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      setCartItems(updatedCart);

      window.dispatchEvent(new Event("cartUpdated"));

      // ✅ NEW: SUCCESS MESSAGE
      showMessage("Product added to cart");

    } catch (error) {
      console.log("ADD ERROR:", error);
    }
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = (productId) => {

    try {

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const updatedCart = cart.filter(
        (item) =>
          String(item.productId) !== String(productId)
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      setCartItems(updatedCart);

      window.dispatchEvent(new Event("cartUpdated"));

      showMessage("Removed from cart");

    } catch (error) {
      console.log("REMOVE ERROR:", error);
    }
  };

  const buyNow = (product) => {

    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({
        productId: product._id,
        qty: 1,
      })
    );

    navigate(`/product-details/${product._id}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 bg-[#f1f3f6]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#f1f3f6] p-1 sm:p-3">

      {/* =========================
          MESSAGE TOAST (NEW)
      ========================= */}
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm z-50 shadow-lg">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] sm:gap-3">

        {products.map((product) => {

          const alreadyAdded = cartItems.some(
            (item) =>
              String(item.productId) === String(product._id)
          );

          return (
            <div
              key={product._id}
              className="bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-md transition-all duration-300"
            >

              <div
                onClick={() =>
                  navigate(`/product-details/${product._id}`)
                }
                className="cursor-pointer"
              >

                <div className="h-[150px] sm:h-52 flex items-center justify-center bg-white p-1 sm:p-3">

                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />

                </div>

                <div className="px-2 py-2 sm:p-3">

                  <h3 className="text-[12px] sm:text-sm font-medium text-gray-800">
                    {truncate(product.title, 40)}
                  </h3>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm font-bold">
                      ₹{product.price}
                    </span>
                  </div>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 p-2 sm:p-3">

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (alreadyAdded) {
                      removeFromCart(product._id);
                    } else {
                      addToCart(product);
                    }
                  }}
                  className={`flex-1 h-9 sm:h-10 rounded-md text-sm font-semibold ${
                    alreadyAdded
                      ? "bg-red-500 text-white"
                      : "bg-[#ff9f00] text-white"
                  }`}
                >
                  {alreadyAdded ? "Remove" : "Cart"}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    buyNow(product);
                  }}
                  className="flex-1 h-9 sm:h-10 bg-[#fb641b] text-white rounded-md text-sm font-semibold"
                >
                  Buy now
                </button>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}