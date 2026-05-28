import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD CART FROM DB
  // =========================
  const loadCart = async () => {

    try {

      // GET LOCAL CART
      const localCart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      console.log(
        "LOCAL CART:",
        localCart
      );

      // EMPTY CART
      if (localCart.length === 0) {

        setCartItems([]);

        setLoading(false);

        return;
      }

      // FETCH PRODUCTS
      const updatedCart =
        await Promise.all(

          localCart.map(
            async (cartItem) => {

              try {

                const res =
                  await fetch(
                    `https://flipcart-1-audl.onrender.com/api/products/${cartItem.productId}`
                  );

                const data =
                  await res.json();

                // PRODUCT FOUND
                if (
                  data.success
                ) {

                  return {
                    ...data.product,
                    qty:
                      cartItem.qty || 1,
                  };
                }

                return null;

              } catch (err) {

                console.log(
                  "FETCH ERROR:",
                  err
                );

                return null;
              }
            }
          )
        );

      // REMOVE NULL PRODUCTS
      const validCart =
        updatedCart.filter(Boolean);

      console.log(
        "VALID CART:",
        validCart
      );

      // UPDATE STATE
      setCartItems(validCart);

    } catch (error) {

      console.log(
        "LOAD CART ERROR:",
        error
      );
    }

    setLoading(false);
  };

  // =========================
  // INITIAL LOAD
  // =========================
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
  // UPDATE CART
  // =========================
  const updateCart = (
    updatedProducts
  ) => {

    // SAVE ONLY ID + QTY
    const minimalCart =
      updatedProducts.map(
        (item) => ({
          productId:
            item._id,
          qty:
            item.qty || 1,
        })
      );

    // SAVE
    localStorage.setItem(
      "cart",
      JSON.stringify(
        minimalCart
      )
    );

    // UPDATE STATE
    setCartItems(
      updatedProducts
    );

    // UPDATE HEADER
    window.dispatchEvent(
      new Event(
        "cartUpdated"
      )
    );
  };

  // =========================
  // REMOVE PRODUCT
  // =========================
  const removeItem = (id) => {

    const updatedCart =
      cartItems.filter(
        (item) =>
          item._id !== id
      );

    updateCart(
      updatedCart
    );
  };

  // =========================
  // INCREASE QTY
  // =========================
  const increaseQty = (id) => {

    const updatedCart =
      cartItems.map((item) => {

        if (
          item._id === id
        ) {

          return {
            ...item,
            qty:
              Number(
                item.qty
              ) + 1,
          };
        }

        return item;
      });

    updateCart(
      updatedCart
    );
  };

  // =========================
  // DECREASE QTY
  // =========================
  const decreaseQty = (id) => {

    const updatedCart =
      cartItems.map((item) => {

        if (
          item._id === id &&
          item.qty > 1
        ) {

          return {
            ...item,
            qty:
              Number(
                item.qty
              ) - 1,
          };
        }

        return item;
      });

    updateCart(
      updatedCart
    );
  };

  // =========================
  // TOTALS
  // =========================
  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.price || 0
        ) *
          Number(
            item.qty || 1
          ),
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
          Number(
            item.qty || 1
          ),
      0
    );

  const totalDiscount =
    totalOldPrice -
    totalPrice;

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6]">

        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      </div>
    );
  }

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
            Looks like you have not added anything yet.
          </p>

          {/* BUTTON */}
          <button
            onClick={() =>
              navigate("/")
            }
            className="mt-6 bg-[#2874f0] text-white px-8 py-3 rounded-md font-semibold"
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
                className="bg-white p-3 sm:p-4 flex gap-4 rounded-md shadow-sm"
              >

                {/* IMAGE */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 border border-gray-100 rounded-md overflow-hidden flex items-center justify-center bg-white">

                  <img
                    src={
                      item.images?.[0]
                    }
                    alt={
                      item.title
                    }
                    className="max-h-full object-contain"
                  />

                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 leading-5">
                    {item.title}
                  </h2>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">

                    <span className="text-lg font-bold">
                      ₹
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </span>

                    {item.oldPrice && (

                      <span className="text-sm text-gray-500 line-through">

                        ₹
                        {Number(
                          item.oldPrice
                        ).toLocaleString()}

                      </span>
                    )}

                    {item.discount && (

                      <span className="text-sm text-green-600 font-semibold">
                        {item.discount}
                      </span>
                    )}

                  </div>

                  <p className="text-xs text-green-600 mt-2 font-medium">
                    Free Delivery
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() =>
                        decreaseQty(
                          item._id
                        )
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
                        increaseQty(
                          item._id
                        )
                      }
                      className="w-8 h-8 border rounded text-lg"
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeItem(
                        item._id
                      )
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

            <div className="bg-white p-4 sticky top-3 rounded-md shadow-sm">

              <h2 className="text-sm font-bold text-gray-500 border-b pb-3 uppercase">
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

                <span>
                  Discount
                </span>

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

              <div className="border-t border-dashed mt-4 pt-4 flex justify-between font-bold text-base">

                <span>
                  Total Amount
                </span>

                <span>
                  ₹
                  {totalPrice.toLocaleString()}
                </span>

              </div>

              <button
                onClick={() =>
                  navigate(
                    "/order-summary"
                  )
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