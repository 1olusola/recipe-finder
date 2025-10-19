import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Recipe Finder — Built with{" "}
        <span className="heart">❤️</span> using React
      </p>
    </footer>
  );
}

