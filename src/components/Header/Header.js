import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Recipe Finder</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search Recipes</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/search" className="btn-primary">
          Get Started
        </Link>
      </nav>
      <button className="hamburger" aria-label="Open menu">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </header>
  );
}

