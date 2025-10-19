import React, { useState } from "react";
import "./NewsletterSection.css";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Simulate submission (no backend yet)
    setTimeout(() => {
      setStatus("✅ Thanks for subscribing!");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-heading">Get weekly meal ideas</h2>
        <p className="newsletter-subtext">
          Fresh recipes straight to your inbox. No spam, promise.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>

        {status && <small className="newsletter-status">{status}</small>}
        <p className="newsletter-privacy">We respect your privacy.</p>
      </div>
    </section>
  );
}

