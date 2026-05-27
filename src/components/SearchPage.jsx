import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaShieldAlt } from "react-icons/fa";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const query =
    new URLSearchParams(location.search).get("q") || "";

  const [products, setProducts] = useState([]);

  // FETCH + FILTER PRODUCTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://flipcart-1-audl.onrender.com/api/products");
        const data = await res.json();

        if (data.success) {
          const q = query.toLowerCase();

          const filtered = data.products.filter((p) => {
            return (
              p.title?.toLowerCase().includes(q) ||
              p.brand?.toLowerCase().includes(q) ||
              p.category?.toLowerCase().includes(q)
            );
          });

          setProducts(filtered);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (query) fetchData();
  }, [query]);

  // discount calculator
  const getDiscount = (price, oldPrice) => {
    if (!oldPrice || !price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-2 sm:p-4">

      {/* HEADER */}
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Results for <span className="text-[#2874f0]">"{query}"</span>
        </h2>

        <p className="text-xs text-gray-500">
          {products.length} products found
        </p>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          No Products Found
        </div>
      ) : (
        <div className="flex flex-col gap-3">

          {products.map((item) => {
            const discount = getDiscount(item.price, item.oldPrice);

            return (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/product-details/${item._id}`)
                }
                className="bg-white rounded-xl shadow-sm flex gap-3 p-3 hover:shadow-md transition cursor-pointer active:scale-[0.99]"
              >

                {/* IMAGE */}
                <div className="w-28 h-28 flex items-center justify-center flex-shrink-0 bg-white border rounded-lg">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  {/* TITLE */}
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.title}
                  </h2>

                  {/* BRAND */}
                  <p className="text-xs text-gray-500 mt-1">
                    {item.brand}
                  </p>

                  {/* ASSURED BADGE */}
                  <div className="flex items-center gap-1 mt-1 text-xs text-green-600 font-semibold">
                    <FaShieldAlt className="text-green-600" />
                    <span>Assured Product</span>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-1 mt-1 text-xs text-yellow-500">
                    <FaStar />
                    <span>{item.rating || 4.2} ⭐</span>
                  </div>

                  {/* PRICE */}
                  <div className="mt-2 flex items-center gap-2 flex-wrap">

                    <span className="text-base font-bold text-black">
                      ₹{item.price}
                    </span>

                    <span className="text-xs text-gray-500 line-through">
                      ₹{item.oldPrice || item.price + 1000}
                    </span>

                    {discount > 0 && (
                      <span className="text-green-600 text-xs font-semibold">
                        {discount}% OFF
                      </span>
                    )}

                  </div>

                  <p className="text-xs text-green-600 mt-1 font-medium">
                    Free Delivery in 2-3 days
                  </p>

                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}