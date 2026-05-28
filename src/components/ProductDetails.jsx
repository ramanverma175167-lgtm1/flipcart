import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductDetails.css";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PRODUCT
  // =========================
  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `https://flipcart-1-audl.onrender.com/api/products/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // =========================
  // ADD TO CART FUNCTION
  // =========================
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item._id === product._id);

    let updatedCart;

    if (exists) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // update header/cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // =========================
  // BUY NOW
  // =========================
  const buyNow = () => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({ ...product, qty: 1 })
    );

    navigate("/order-summary");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="product-page">

      {/* IMAGE SLIDER */}
      <div className="slider-wrapper">
        <Slider {...settings}>
          {product.images?.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt="product"
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* DETAILS */}
      <div className="details-container">

        <h2 className="product-title">
          {product.title}
        </h2>

        <div className="rating-row">
          <span className="rating">
            {product.rating || "4.5"} ★
          </span>
          <span className="rating-text">
            {product.reviews || "0 Reviews"}
          </span>
        </div>

        <div className="price-section">
          <span className="offer">
            {product.discount || "OFF"}
          </span>

          <span className="price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{product.oldPrice}
          </span>
        </div>

        <p className="delivery-text">
          {product.delivery || "Free Delivery"}
        </p>

        <p className="stock-text">
          {product.stock || "In Stock"}
        </p>

        {/* ASSURED */}
        <div className="service-row">
          <div className="service-box">
            <img
              src="/icons/assured.jpg"
              alt="assured"
              className="service-icon"
            />
            <span>Flipkart Assured</span>
          </div>

          <div className="service-box">
            <span>🔁</span>
            <span>7 Days Replacement</span>
          </div>

          <div className="service-box">
            <span>❌</span>
            <span>No Cash On Delivery</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="feature-box">
          <h3>About this item</h3>

          <div
            className="about-card"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          />
        </div>

        {/* SPECIFICATIONS */}
        <div className="specification-box">
          <h3>Product Details</h3>

          <div className="spec-row">
            <span>Storage</span>
            <span>{product.storage}</span>
          </div>

          <div className="spec-row">
            <span>Display</span>
            <span>{product.display}</span>
          </div>

          <div className="spec-row">
            <span>Camera</span>
            <span>{product.camera}</span>
          </div>

          <div className="spec-row">
            <span>Battery</span>
            <span>{product.battery}</span>
          </div>

          <div className="spec-row">
            <span>Processor</span>
            <span>{product.processor}</span>
          </div>

          <div className="spec-row">
            <span>Warranty</span>
            <span>{product.warranty}</span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="button-row">

          {/* ADD TO CART */}
          <button
            className="cart-btn"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          {/* BUY NOW */}
          <button
            className="buy-btn"
            onClick={buyNow}
          >
            Buy Now
          </button>

        </div>

      </div>
    </div>
  );
}