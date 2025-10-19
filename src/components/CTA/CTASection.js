import React from "react";
import { Link } from "react-router-dom";
import "./CTASection.css";

export default function CTASection() {
  return (
    <section className="cta-section">
      <h2>Ready to Discover Your Next Meal?</h2>
      <p>Find recipes from ingredients you already have at home.</p>
      <Link to="/search" className="btn-primary btn-cta">
        Start Searching
      </Link>
    </section>
  );
}

