// src/components/FavoriteButton.js
import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import "./FavoriteButton.css";

export default function FavoriteButton({ recipe }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`favorite-btn ${isFavorite(recipe.id) ? "active" : ""}`}
    >
      {isFavorite(recipe.id) ? "❤️ Saved" : "🤍 Save"}
    </button>
  );
}

