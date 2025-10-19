import React from "react";
import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <span className="step-number">1</span>
          <h3>Enter Ingredients</h3>
          <p>Type what’s in your kitchen (e.g., rice, tomato, egg).</p>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <h3>Find Recipes</h3>
          <p>We’ll show recipes you can make right away.</p>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <h3>Cook & Enjoy</h3>
          <p>Follow easy instructions to cook delicious meals.</p>
        </div>
      </div>
    </section>
  );
}

