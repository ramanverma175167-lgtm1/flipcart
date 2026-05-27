import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductDetails.css";

export default function ProductDetails() {
  const navigate = useNavigate();

  // GET PRODUCT ID FROM URL
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH SINGLE PRODUCT
  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${id}`
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

      {/* TOP SLIDER */}
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

      {/* PRODUCT DETAILS */}
      <div className="details-container">

        {/* TITLE */}
        <h2 className="product-title">
          {product.title}
        </h2>

        {/* RATING */}
        <div className="rating-row">

          <span className="rating">
            {product.rating || "4.5"} ★
          </span>

          <span className="rating-text">
            {product.reviews || "0 Reviews"}
          </span>

        </div>

        {/* PRICE */}
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

        {/* DELIVERY */}
        <p className="delivery-text">
          {product.delivery || "Free Delivery"}
        </p>

        {/* STOCK */}
        <p className="stock-text">
          {product.stock || "In Stock"}
        </p>

        {/* SERVICE SECTION */}
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
            <span className="service-emoji">🔁</span>

            <span>7 Days Replacement</span>
          </div>

          <div className="service-box">
            <span className="service-emoji">❌</span>

            <span>No Cash On Delivery</span>
          </div>

        </div>

        {/* ABOUT PRODUCT */}
        <div className="feature-box">

          <h3>About this item</h3>

          <div
            className="about-card"
            dangerouslySetInnerHTML={{
              __html: product.description || "",
            }}
          />

        </div>

        {/* PRODUCT SPECIFICATIONS */}
        <div className="specification-box">

          <h3>Product Details</h3>

          <div className="spec-row">
            <span className="spec-title">
              Storage
            </span>

            <span className="spec-value">
              {product.storage}
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Display
            </span>

            <span className="spec-value">
              {product.display}
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Camera
            </span>

            <span className="spec-value">
              {product.camera}
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Battery
            </span>

            <span className="spec-value">
              {product.battery}
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Processor
            </span>

            <span className="spec-value">
              {product.processor}
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Warranty
            </span>

            <span className="spec-value">
              {product.warranty}
            </span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="button-row">

          {/* ADD TO CART */}
          <button
            className="cart-btn"
            onClick={() =>
              navigate("/order-summary")
            }
          >
            Add to Cart
          </button>

          {/* BUY NOW */}
          <button
            className="buy-btn"
            onClick={() =>
              navigate("/order-summary")
            }
          >
            Buy Now
          </button>

        </div>

      </div>
    </div>
  );
}