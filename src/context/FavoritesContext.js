import React, { createContext, useEffect, useState } from "react";
import { getFavorites as lsGetFavorites, saveFavorite as lsSaveFavorite, removeFavorite as lsRemoveFavorite } from "../utils/localStorage";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(lsGetFavorites());
    // listen to storage events (sync across tabs)
    const onStorage = (e) => {
      if (e.key === 'recipe_favorites') {
        setFavorites(lsGetFavorites());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addFavorite = (recipe) => {
    lsSaveFavorite(recipe);
    setFavorites(lsGetFavorites());
  };

  const removeFavorite = (id) => {
    lsRemoveFavorite(id);
    setFavorites(lsGetFavorites());
  };

  const isFavorite = (id) => favorites.some(r => r.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

