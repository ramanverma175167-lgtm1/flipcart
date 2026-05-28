import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

export default function OrderSummary() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD CART + FETCH PRODUCTS
  // =========================
  useEffect(() => {

    const fetchCartProducts =
      async () => {

        try {

          // GET SAVED CART
          const savedCart =
            JSON.parse(
              localStorage.getItem("cart")
            ) || [];

          console.log(
            "SAVED CART:",
            savedCart
          );

          // EMPTY CART
          if (savedCart.length === 0) {

            setCartItems([]);

            setLoading(false);

            return;
          }

          // FETCH ALL PRODUCTS
          const res = await fetch(
            "https://flipcart-1-audl.onrender.com/api/products"
          );

          const data =
            await res.json();

          console.log(
            "PRODUCTS:",
            data.products
          );

          if (!data.success) {

            setLoading(false);

            return;
          }

          // MATCH CART PRODUCTS
          const updatedCart =
            savedCart
              .map((cartItem) => {

                const product =
                  data.products.find(
                    (p) =>
                      String(p._id) ===
                      String(
                        cartItem.productId
                      )
                  );

                if (!product) {

                  console.log(
                    "PRODUCT NOT FOUND:",
                    cartItem
                  );

                  return null;
                }

                return {
                  ...product,
                  qty:
                    cartItem.qty || 1,
                };
              })
              .filter(Boolean);

          console.log(
            "UPDATED CART:",
            updatedCart
          );

          setCartItems(updatedCart);

        } catch (error) {

          console.log(
            "ORDER SUMMARY ERROR:",
            error
          );

        }

        setLoading(false);
      };

    fetchCartProducts();

  }, []);

  // =========================
  // TOTALS
  // =========================
  const totalAmount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.qty || 1),
      0
    );

  const totalOldPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.oldPrice ||
            item.price ||
            0
        ) *
          Number(item.qty || 1),
      0
    );

  const totalDiscount =
    totalOldPrice -
    totalAmount;

  // =========================
  // CONTINUE
  // =========================
  const handleContinue = () => {

    const user = JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    );

    // LOGIN CHECK
    if (!user) {

      navigate("/login");

      return;
    }

    // ADDRESS PAGE
    navigate("/address");
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">

        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f1f3f6] p-2 sm:p-4">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* STEP HEADER */}
          <div className="bg-white p-4 shadow-sm rounded-md">

            <div className="flex items-center justify-between">

              {/* ADDRESS */}
              <div className="flex flex-col items-center flex-1">

                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>

                <p className="text-xs font-semibold text-green-600 mt-1">
                  Cart Products
                </p>

              </div>

              <div className="flex-1 h-[2px] bg-green-500 mx-1"></div>

              {/* ORDER */}
              <div className="flex flex-col items-center flex-1">

                <div className="w-8 h-8 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>

                <p className="text-xs font-semibold text-[#2874f0] mt-1">
                  Order Summary
                </p>

              </div>

              <div className="flex-1 h-[2px] bg-gray-300 mx-1"></div>

              {/* PAYMENT */}
              <div className="flex flex-col items-center flex-1">

                <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center text-sm font-bold">
                  3
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Payment
                </p>

              </div>

            </div>

          </div>

          {/* EMPTY CART */}
          {cartItems.length === 0 && (

            <div className="bg-white rounded-md p-10 text-center">

              <h2 className="text-xl font-bold text-gray-700">
                Your Cart is Empty
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Add some products first
              </p>

              <button
                onClick={() =>
                  navigate("/")
                }
                className="mt-5 bg-[#2874f0] text-white px-6 py-2 rounded-md"
              >
                Shop Now
              </button>

            </div>
          )}

          {/* PRODUCTS */}
          {cartItems.map((product) => (

            <div
              key={product._id}
              className="bg-white shadow-sm rounded-md p-3 sm:p-4 flex gap-4"
            >

              {/* IMAGE */}
              <div className="w-28 h-28 border border-gray-100 rounded flex items-center justify-center bg-white">

                <img
                  src={
                    product.images?.[0]
                  }
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />

              </div>

              {/* DETAILS */}
              <div className="flex-1">

                <h2 className="text-sm sm:text-base font-semibold text-gray-800 leading-5">

                  {product.title}

                </h2>

                <div className="flex items-center gap-2 mt-2 flex-wrap">

                  <span className="text-lg font-bold text-black">

                    ₹
                    {Number(
                      product.price
                    ).toLocaleString()}

                  </span>

                  {product.oldPrice && (

                    <span className="text-sm text-gray-500 line-through">

                      ₹
                      {Number(
                        product.oldPrice
                      ).toLocaleString()}

                    </span>
                  )}

                  {product.discount && (

                    <span className="text-sm text-green-600 font-semibold">

                      {product.discount}

                    </span>
                  )}

                </div>

                <p className="text-xs text-green-700 mt-2 font-medium">
                  Delivery by Tomorrow
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Qty: {product.qty}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* RIGHT */}
        {cartItems.length > 0 && (

          <div>

            <div className="bg-white shadow-sm rounded-md p-4 sticky top-3">

              <h2 className="text-sm font-bold text-gray-500 border-b border-gray-200 pb-3 uppercase">
                Price Details
              </h2>

              <div className="flex justify-between mt-4 text-sm">

                <span>
                  Price (
                  {cartItems.length} items)
                </span>

                <span>
                  ₹
                  {totalOldPrice.toLocaleString()}
                </span>

              </div>

              <div className="flex justify-between mt-3 text-sm">

                <span>Discount</span>

                <span className="text-green-600">

                  - ₹
                  {totalDiscount.toLocaleString()}

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

              <div className="border-t border-dashed border-gray-300 mt-4 pt-4 flex justify-between font-bold text-base">

                <span>Total Amount</span>

                <span>
                  ₹
                  {totalAmount.toLocaleString()}
                </span>

              </div>

              <p className="text-green-600 text-sm font-semibold mt-4">

                You will save ₹
                {totalDiscount.toLocaleString()}

              </p>

              <button
                onClick={handleContinue}
                className="w-full h-11 bg-[#fb641b] text-white font-semibold mt-5 rounded-md active:scale-[0.98] transition-all"
              >
                Continue
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}