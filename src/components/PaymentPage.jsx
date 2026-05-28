import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("qr");
  const [address, setAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOGIN CHECK =================
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");

    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ================= LOAD DATA =================
  useEffect(() => {
    const loadData = async () => {
      try {
        // ADDRESS
        const savedAddress = JSON.parse(
          localStorage.getItem("deliveryAddress")
        );

        setAddress(savedAddress);

        // CART
        const savedCart =
          JSON.parse(localStorage.getItem("cart")) || [];

        console.log("CART FROM LOCALSTORAGE:", savedCart);

        // EMPTY CART CHECK
        if (savedCart.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        // FETCH PRODUCTS
        const res = await fetch(
          "https://flipcart-1-audl.onrender.com/api/products"
        );

        const data = await res.json();

        if (data.success) {
          // FIXED: productId matching
          const updatedCart = savedCart
            .map((cartItem) => {
              const product = data.products.find(
                (p) => p._id === cartItem.productId
              );

              if (!product) return null;

              return {
                ...product,
                qty: cartItem.qty || 1,
              };
            })
            .filter(Boolean);

          setCartItems(updatedCart);
        }
      } catch (error) {
        console.log("PAYMENT PAGE ERROR:", error);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // ================= TOTALS =================
  const totalOldPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.oldPrice || item.price || 0) *
        Number(item.qty || 1),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.qty || 1),
    0
  );

  const totalDiscount = totalOldPrice - totalPrice;

  // ================= PAYMENT =================
 const handlePayment = () => {
  const orderData = {
    items: cartItems,
    address,
    total: totalPrice,
    paymentMethod: selectedMethod,
    orderDate: new Date(),
  };

  // SAVE TEMP ORDER (NOT FINAL YET)
  localStorage.setItem(
    "pendingOrder",
    JSON.stringify(orderData)
  );

  // GO TO GATEWAY PAGE
  navigate("/gateway");
};

  // ================= LOADING =================
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

          {/* STEPS */}
          <div className="bg-white p-4 shadow-sm rounded-lg">
            <div className="flex justify-between">

              <div className="text-green-600 text-sm font-bold">✓ Address</div>
              <div className="text-green-600 text-sm font-bold">✓ Order</div>
              <div className="text-blue-600 text-sm font-bold">Payment</div>

            </div>
          </div>

          {/* ADDRESS */}
          {address && (
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="font-bold text-sm mb-2">Delivery Address</h2>
              <p>{address.name}</p>
              <p>{address.house}, {address.colony}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p>📞 {address.mobile}</p>
            </div>
          )}

          {/* CART ITEMS */}
          <div className="flex flex-col gap-3">

            {cartItems.length === 0 ? (
              <div className="bg-white p-5 text-center rounded-xl text-gray-500">
                No products found in cart
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4">

                  <img
                    src={item.images?.[0] || "/noimage.png"}
                    className="w-28 h-28 object-contain"
                    alt=""
                  />

                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    <p className="font-bold">₹{item.price * item.qty}</p>
                  </div>

                </div>
              ))
            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white p-4 rounded-xl shadow-sm">

          <h2 className="font-bold border-b pb-2">Payment Details</h2>

          <div className="flex justify-between mt-3 text-sm">
            <span>Price</span>
            <span>₹{totalOldPrice}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>Discount</span>
            <span className="text-green-600">- ₹{totalDiscount}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="border-t mt-3 pt-3 font-bold flex justify-between">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-orange-500 text-white py-2 mt-4 rounded-md"
          >
            Confirm Payment
          </button>

        </div>

      </div>
    </div>
  );
}