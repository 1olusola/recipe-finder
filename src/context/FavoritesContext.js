// src/context/FavoritesContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites((prev) => {
      if (prev.find((r) => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  const isFavorite = (id) => favorites.some((r) => r.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

