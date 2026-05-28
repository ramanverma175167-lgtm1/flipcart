import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GatewayPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("qr");

  const orderData = JSON.parse(
    localStorage.getItem("pendingOrder")
  );

  const address = orderData?.address;
  const cart = orderData?.items || [];

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const handleConfirm = () => {
    const order = {
      items: cart,
      address,
      total,
      paymentMethod: method,
      date: new Date(),
    };

    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([order, ...oldOrders])
    );

    localStorage.removeItem("pendingOrder");
    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/orders");
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] p-4">
        <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-bold text-gray-700">
            No payment data found
          </h2>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-3 sm:p-4 flex justify-center">
      
      <div className="w-full max-w-2xl lg:max-w-3xl bg-white rounded-xl shadow p-4 sm:p-6">

        {/* TITLE */}
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Confirm payment
        </h2>

        {/* ADDRESS */}
        {address && (
          <div className="border rounded-lg p-3 sm:p-4 mb-4 text-sm bg-gray-50">
            <p className="font-bold text-base">{address.name}</p>
            <p className="break-words">
              {address.house}, {address.colony}
            </p>
            <p className="break-words">
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="mt-1">📞 {address.mobile}</p>
          </div>
        )}

        {/* PAYMENT OPTIONS */}
        <div className="space-y-3">

          {/* QR */}
          <div
            onClick={() => setMethod("qr")}
            className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition ${
              method === "qr"
                ? "border-blue-600 bg-blue-50"
                : "bg-white"
            }`}
          >
            <p className="font-semibold text-sm sm:text-base">
              Pay via QR Code
            </p>

            {method === "qr" && (
              <div className="mt-3 flex justify-center">
                <img
                  src="/qrcode.avif"
                  className="w-40 sm:w-52 max-w-full"
                  alt="QR"
                />
              </div>
            )}
          </div>

          {/* UPI */}
          <div
            onClick={() => setMethod("upi")}
            className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition ${
              method === "upi"
                ? "border-blue-600 bg-blue-50"
                : "bg-white"
            }`}
          >
            <p className="font-semibold text-sm sm:text-base">
              UPI Payment
            </p>

            {method === "upi" && (
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  UPI ID: <b>mukesh@upi</b>
                </p>
                <p>Pay using GPay / PhonePe / Paytm</p>
              </div>
            )}
          </div>

          {/* BANK */}
          <div
            onClick={() => setMethod("bank")}
            className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition ${
              method === "bank"
                ? "border-blue-600 bg-blue-50"
                : "bg-white"
            }`}
          >
            <p className="font-semibold text-sm sm:text-base">
              Bank Transfer
            </p>

            {method === "bank" && (
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p>Bank: SBI</p>
                <p>Account: 1234567890</p>
                <p>IFSC: SBIN0001234</p>
              </div>
            )}
          </div>
        </div>

        {/* TOTAL */}
        <div className="border-t mt-5 pt-4 flex justify-between font-bold text-base sm:text-lg">
          <span>Total Payable</span>
          <span>₹{total.toLocaleString()}</span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white py-3 mt-5 rounded-lg font-semibold active:scale-95 transition"
        >
          Confirm Payment
        </button>

      </div>
    </div>
  );
}