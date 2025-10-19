import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchInput.trim())}`;
    }
  };

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

          <form className="hero-search" onSubmit={handleSearch}>
            <div className="search-wrapper">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter ingredients, e.g., chicken, tomato"
                className="search-input"
                aria-label="Search recipes by ingredients"
              />
              <button type="submit" className="btn-search">
                Search
              </button>
            </div>
          </form>

          <div className="search-filters">
            <button 
              type="button" 
              className="pill"
              onClick={() => setSearchInput("vegetarian")}
            >
              Vegetarian
            </button>
            <button 
              type="button" 
              className="pill"
              onClick={() => setSearchInput("30 minutes")}
            >
              30 mins
            </button>
            <button 
              type="button" 
              className="pill"
              onClick={() => setSearchInput("dessert")}
            >
              Dessert
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <img
              src="assets/hero-image.jpg"
              alt="Cooking ingredients on table"
              loading="eager"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80";
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
