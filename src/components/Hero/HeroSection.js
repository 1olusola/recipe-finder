import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-tag">Try now</span>
          <h1 className="hero-heading">
            Find recipes with what you already have
          </h1>
          <p className="hero-subtext">
            Enter ingredients (e.g., chicken, tomato) and discover quick,
            delicious meals tailored to your diet.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Enter ingredients, e.g., chicken, tomato"
              className="search-input"
            />
            <Link to="/search" className="btn-search">
              Search
            </Link>
          </div>

          <div className="search-filters">
            <button className="pill">Vegetarian</button>
            <button className="pill">30 mins</button>
            <button className="pill">Dessert</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="assets/hero-image.jpg"
            alt="Cooking ingredients on table"
            onError={(e) =>
              (e.target.src =
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=60")
            }
          />
        </div>
      </div>
    </section>
  );
}

