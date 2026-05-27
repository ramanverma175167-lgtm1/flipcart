import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  // =========================
  // LOAD CART
  // =========================
  const loadCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) ||
      [];

    setCartItems(cart);
  };

  useEffect(() => {
    loadCart();

    // LIVE UPDATE
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
  // UPDATE CART EVERYWHERE
  // =========================
  const updateCart = (updatedCart) => {
    // SAVE UPDATED CART
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
  // REMOVE PRODUCT
  // =========================
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    updateCart(updatedCart);
  };

  // =========================
  // INCREASE QTY
  // =========================
  const increaseQty = (id) => {
    const updatedCart = cartItems.map(
      (item) => {
        if (item._id === id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }

        return item;
      }
    );

    updateCart(updatedCart);
  };

  // =========================
  // DECREASE QTY
  // =========================
  const decreaseQty = (id) => {
    const updatedCart = cartItems.map(
      (item) => {
        if (
          item._id === id &&
          item.qty > 1
        ) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }

        return item;
      }
    );

    updateCart(updatedCart);
  };

  // =========================
  // TOTAL PRICE
  // =========================
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-2 sm:p-4">

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg p-10 text-center flex flex-col items-center justify-center min-h-[70vh]">

          {/* ICON */}
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">

            <FaShoppingCart className="text-5xl text-gray-400" />

          </div>

          {/* TEXT */}
          <h2 className="text-xl font-bold text-gray-800 mt-5">
            Your cart is empty
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Looks like you have not added
            anything to your cart yet.
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-[#2874f0] hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-all"
          >
            Shop Now
          </button>

        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">

          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-3 flex gap-3 rounded-md"
              >

                {/* IMAGE */}
                <div className="w-28 h-28 flex items-center justify-center">

                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />

                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  <h2 className="text-sm sm:text-base font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-lg font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <p className="text-xs text-green-600 mt-1">
                    Free Delivery
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                      className="w-8 h-8 border rounded text-lg"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                      className="w-8 h-8 border rounded text-lg"
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeItem(item._id)
                    }
                    className="mt-4 text-red-500 font-semibold text-sm"
                  >
                    REMOVE
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white p-4 sticky top-3 rounded-md">

              <h2 className="text-sm font-bold text-gray-500 border-b pb-3">
                PRICE DETAILS
              </h2>

              <div className="flex justify-between mt-4 text-sm">

                <span>
                  Price (
                  {cartItems.length} items)
                </span>

                <span>
                  ₹
                  {totalPrice.toLocaleString()}
                </span>

              </div>

              <div className="flex justify-between mt-3 text-sm">

                <span>
                  Delivery Charges
                </span>

                <span className="text-green-600">
                  FREE
                </span>

              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-base">

                <span>Total Amount</span>

                <span>
                  ₹
                  {totalPrice.toLocaleString()}
                </span>

              </div>

              <button
                onClick={() =>
                  navigate("/order-summary")
                }
                className="w-full h-11 bg-[#fb641b] text-white font-semibold mt-5 rounded-md"
              >
                Place Order
              </button>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}