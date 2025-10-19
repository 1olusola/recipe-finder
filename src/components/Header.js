import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const loc = useLocation();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">Recipe Finder</Link>
        <nav className="nav">
          <Link to="/" className={loc.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/search" className={loc.pathname.startsWith("/search") ? "active" : ""}>Search</Link>
          <Link to="/favorites" className={loc.pathname === "/favorites" ? "active" : ""}>Favorites</Link>
        </nav>
      </div>
    </header>
  );
}

