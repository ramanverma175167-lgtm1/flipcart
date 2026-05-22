import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "Apple iPhone 15 Pro Max 256GB",
    image: "/iphone.jfif",
    off: "20% OFF",
    price: "₹42,000",
    oldPrice: "₹52,000",
    assured: "/icons/assured.jpg",
  },
  {
    name: "Samsung Galaxy S24 Ultra 5G",
    image: "/samsung.jfif",
    off: "15% OFF",
    price: "₹38,500",
    oldPrice: "₹45,999",
    assured: "/icons/assured.jpg",
  },
  {
    name: "Realme Narzo 70 Turbo",
    image: "/realme.jfif",
    off: "25% OFF",
    price: "₹18,999",
    oldPrice: "₹24,999",
    assured: "/icons/assured.jpg",
  },
  {
    name: "Vivo Y20 Smartphone",
    image: "/vivo.jfif",
    off: "40% OFF",
    price: "₹12,499",
    oldPrice: "₹18,499",
    assured: "/icons/assured.jpg",
  },
];

const truncate = (text, limit = 18) =>
  text.length > limit ? text.slice(0, limit) + "..." : text;

export default function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#f1f3f6] p-1">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

        {products.map((product, index) => (
          <div
            key={index}

            // ✅ CARD CLICK
            onClick={() => navigate("/product-details")}

            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer"
          >

            {/* IMAGE */}
            <div className="h-44 flex items-center justify-center p-1">
              <img
                src={product.image}
                alt={product.name}
                className="h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="p-2 flex flex-col flex-1">

              <h3 className="text-sm font-semibold">
                {truncate(product.name, 18)}
              </h3>

              <div className="flex justify-between mt-2">
                <span className="bg-green-700 text-white text-xs px-2 py-1 rounded">
                  {product.off}
                </span>

                <span className="text-xs line-through text-gray-500">
                  {product.oldPrice}
                </span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-sm font-bold">
                  {product.price}
                </span>

                <img
                  src={product.assured}
                  className="w-12"
                  alt="assured"
                />
              </div>

              <p className="text-red-600 text-xs mt-1">
                Limited Time Deal
              </p>

              <p className="text-gray-600 text-xs">
                Free Delivery in 2 Days
              </p>

              {/* BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent double trigger
                  navigate("/product-details");
                }}
                className="mt-3 w-full h-8 bg-[#ffc200] text-black rounded-md font-semibold"
              >
                Buy Now
              </button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}