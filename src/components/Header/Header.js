import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          Recipe Finder
        </Link>
        
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/search" onClick={closeMenu}>Search Recipes</Link>
          <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
          <Link to="/search" className="btn-primary" onClick={closeMenu}>
            Get Started
          </Link>
        </nav>

        <button 
          className={`hamburger ${isMenuOpen ? "hamburger-open" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div className="nav-overlay" onClick={closeMenu}></div>
        )}
      </div>
    </header>
  );
}
