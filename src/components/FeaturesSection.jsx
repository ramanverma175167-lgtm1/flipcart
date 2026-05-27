import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const truncate = (text, limit = 18) =>
  text?.length > limit
    ? text.slice(0, limit) + "..."
    : text;

export default function FeaturesSection() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // CART STATE
  // =========================
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

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
      console.log(error);
    }

    setLoading(false);
  };

  // =========================
  // LOAD CART
  // =========================
  const loadCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);
  };

  useEffect(() => {
    fetchProducts();

    loadCart();

    // LISTEN CART UPDATE
    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };
  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product) => {
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // CHECK EXIST
    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (exists) return;

    // ADD PRODUCT
    const updatedCart = [
      ...cart,
      {
        ...product,
        qty: 1,
      },
    ];

    // SAVE
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // UPDATE STATE
    setCartItems(updatedCart);

    // UPDATE HEADER
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = (productId) => {

    // CURRENT CART
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // REMOVE PRODUCT
    const updatedCart = cart.filter(
      (item) => item._id !== productId
    );

    // SAVE UPDATED CART
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // UPDATE STATE
    setCartItems(updatedCart);

    // UPDATE HEADER COUNT
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =========================
  // BUY NOW
  // =========================
const buyNow = (product) => {
  localStorage.setItem(
    "buyNowProduct",
    JSON.stringify({
      ...product,
      qty: 1,
    })
  );

  navigate(`/product-details/${product._id}`); // ✅ FIXED
};

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-10 bg-[#f1f3f6]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#f1f3f6]">

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] sm:gap-3">

        {products.map((product) => {

          // CHECK IN CART
          const alreadyAdded = cartItems.some(
            (item) => item._id === product._id
          );

          return (
            <div
              key={product._id}
              onClick={() =>
                navigate(
                  `/product-details/${product._id}`
                )
              }
              className="bg-white flex flex-col cursor-pointer border border-gray-100 overflow-hidden"
            >

              {/* IMAGE */}
              <div className="h-[150px] sm:h-52 flex items-center justify-center bg-white p-1 sm:p-3">

                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="h-full w-full object-contain hover:scale-105 transition-all duration-300"
                />

              </div>

              {/* DETAILS */}
              <div className="flex flex-col flex-1 px-2 py-2 sm:p-3">

                {/* TITLE */}
                <h3 className="text-[12px] sm:text-sm font-medium text-gray-800 leading-4 sm:leading-5 min-h-[34px] sm:min-h-[42px]">
                  {truncate(product.title, 40)}
                </h3>

                {/* DISCOUNT */}
                <div className="flex justify-between items-center mt-1 sm:mt-2">

                  <span className="bg-green-700 text-white text-[9px] sm:text-[10px] px-1.5 py-[2px] rounded font-semibold">
                    {product.discount || "OFF"}
                  </span>

                  <span className="text-[10px] sm:text-xs line-through text-gray-500">
                    ₹{product.oldPrice}
                  </span>

                </div>

                {/* PRICE */}
                <div className="flex justify-between items-center mt-1 sm:mt-2">

                  <span className="text-sm sm:text-lg font-bold text-black">
                    ₹{product.price}
                  </span>

                  <img
                    src="/icons/assured.jpg"
                    className="w-10 sm:w-12"
                    alt="assured"
                  />

                </div>

                {/* DELIVERY */}
                <p className="text-red-600 text-[10px] sm:text-xs mt-1 font-medium">
                  Limited Time Deal
                </p>

                <p className="text-gray-500 text-[10px] sm:text-xs mt-[2px]">
                  {product.delivery ||
                    "Free Delivery"}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-4">

                  {/* CART BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (alreadyAdded) {
                        removeFromCart(product._id);
                      } else {
                        addToCart(product);
                      }
                    }}
                    className={`flex-1 h-8 sm:h-10 rounded-md text-[11px] sm:text-sm font-semibold transition-all ${
                      alreadyAdded
                        ? "bg-red-500 text-white"
                        : "bg-[#ff9f00] text-white"
                    }`}
                  >
                    {alreadyAdded
                      ? "Remove"
                      : "Cart"}
                  </button>

                  {/* BUY NOW */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      buyNow(product);
                    }}
                    className="flex-1 h-8 sm:h-10 bg-[#fb641b] text-white rounded-md text-[11px] sm:text-sm font-semibold"
                  >
                    Buy now
                  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}