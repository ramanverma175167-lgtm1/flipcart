import React from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";

const images = [
  "/iphone.jfif",
  "/samsung.jfif",
  "/realme.jfif",
  "/vivo.jfif",
];

export default function ProductDetails() {
  const navigate = useNavigate();

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

  return (
    <div className="product-page">

      {/* TOP SLIDER */}
      <div className="slider-wrapper">
        <Slider {...settings}>
          {images.map((img, index) => (
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
          Apple iPhone 15 Pro Max 256GB Natural Titanium
        </h2>

        {/* RATING */}
        <div className="rating-row">
          <span className="rating">4.5 ★</span>

          <span className="rating-text">
            12,540 Ratings & 1,240 Reviews
          </span>
        </div>

        {/* PRICE */}
        <div className="price-section">
          <span className="offer">20% OFF</span>

          <span className="price">₹42,000</span>

          <span className="old-price">₹52,000</span>
        </div>

        {/* DELIVERY */}
        <p className="delivery-text">
          Free Delivery in 2 Days
        </p>

        {/* STOCK */}
        <p className="stock-text">
          Hurry, Only Few Left!
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

          <div className="about-card">

            <p>
              • 256 GB ROM with ultra fast performance
            </p>

            <p>
              • 6.7 inch Super Retina XDR Display
            </p>

            <p>
              • 48MP Triple Camera with Night Mode
            </p>

            <p>
              • A17 Pro Chip for gaming & multitasking
            </p>

            <p>
              • Long lasting battery backup
            </p>

            <p>
              • Premium Titanium Body Design
            </p>

            <p>
              • 1 Year Brand Warranty Included
            </p>

          </div>
        </div>

        {/* PRODUCT SPECIFICATIONS */}
        <div className="specification-box">

          <h3>Product Details</h3>

          <div className="spec-row">
            <span className="spec-title">
              Brand
            </span>

            <span className="spec-value">
              Apple
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Model Name
            </span>

            <span className="spec-value">
              iPhone 15 Pro Max
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Storage
            </span>

            <span className="spec-value">
              256 GB
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Display
            </span>

            <span className="spec-value">
              6.7 inch OLED
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Camera
            </span>

            <span className="spec-value">
              48MP + 12MP + 12MP
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Battery
            </span>

            <span className="spec-value">
              4441 mAh
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Processor
            </span>

            <span className="spec-value">
              A17 Pro Chip
            </span>
          </div>

          <div className="spec-row">
            <span className="spec-title">
              Warranty
            </span>

            <span className="spec-value">
              1 Year Manufacturer Warranty
            </span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="button-row">

          {/* ADD TO CART */}
          <button
            className="cart-btn"
            onClick={() => navigate("/order-summary")}
          >
            Add to Cart
          </button>

          {/* BUY NOW */}
          <button
            className="buy-btn"
            onClick={() => navigate("/order-summary")}
          >
            Buy Now
          </button>

        </div>

      </div>
    </div>
  );
}