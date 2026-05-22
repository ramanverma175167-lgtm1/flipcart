
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
    const navigate = useNavigate();
  const product = {
    name: "Apple iPhone 15 Pro Max 256GB",
    image: "/iphone.jfif",
    price: 42000,
    oldPrice: 52000,
    off: "20% OFF",
  };

  const address = JSON.parse(
    localStorage.getItem("deliveryAddress")
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-2 sm:p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* TOP STEPS */}
          <div className="bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">

              {/* ADDRESS */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                  ✓
                </div>

                <p className="text-xs font-semibold text-green-600 mt-1">
                  Address
                </p>
              </div>

              <div className="flex-1 h-[2px] bg-green-500 mx-1"></div>

              {/* ORDER SUMMARY */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-[#2874f0] text-white text-sm font-bold flex items-center justify-center">
                  2
                </div>

                <p className="text-xs font-semibold text-[#2874f0] mt-1">
                  Order Summary
                </p>
              </div>

              <div className="flex-1 h-[2px] bg-gray-300 mx-1"></div>

              {/* PAYMENT */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-black text-sm font-bold flex items-center justify-center">
                  3
                </div>

                <p className="text-xs font-medium text-gray-500 mt-1">
                  Payment
                </p>
              </div>
            </div>
          </div>

          
          {/* PRODUCT CARD */}
          <div className="bg-white shadow-sm p-4 flex gap-4">

            {/* IMAGE */}
            <div className="w-28 h-28 flex items-center justify-center border border-gray-100">
              <img
                src={product.image}
                alt="product"
                className="max-h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-lg font-bold text-black">
                  ₹{product.price.toLocaleString()}
                </span>

                <span className="text-sm text-gray-500 line-through">
                  ₹{product.oldPrice.toLocaleString()}
                </span>

                <span className="text-sm text-green-600 font-semibold">
                  {product.off}
                </span>
              </div>

              <p className="text-xs text-green-700 mt-2 font-medium">
                Delivery by Tomorrow
              </p>

              <p className="text-xs text-gray-500 mt-1">
                7 Days Replacement Policy
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <div className="bg-white shadow-sm p-4 sticky top-3">

            <h2 className="text-sm font-bold text-gray-500 border-b border-gray-200 pb-3 uppercase">
              Price Details
            </h2>

            <div className="flex items-center justify-between mt-4 text-sm">
              <span>Price (1 item)</span>
              <span>₹52,000</span>
            </div>

            <div className="flex items-center justify-between mt-3 text-sm">
              <span>Discount</span>
              <span className="text-green-600">- ₹10,000</span>
            </div>

            <div className="flex items-center justify-between mt-3 text-sm">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="border-t border-dashed border-gray-300 mt-4 pt-4 flex items-center justify-between font-bold text-base">
              <span>Total Amount</span>
              <span>₹42,000</span>
            </div>

            <p className="text-green-600 text-sm font-semibold mt-4">
              You will save ₹10,000 on this order
            </p>

            {/* BUTTON */}
            <button
  onClick={() => navigate("/Payment-details")}
  className="w-full h-11 bg-[#fb641b] text-white font-semibold mt-5 active:scale-[0.98] transition-all"
>
  Continue
</button>
          </div>
        </div>
      </div>
    </div>
  );
}
