import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import { useFavorites } from "../../context/FavoritesContext";

const RecipeCard = ({ recipe }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-link">
        <img
          src={
            recipe.image ||
            "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600"
          }
          alt={recipe.title}
          className="recipe-img"
        />

        <div className="card-content">
          <h3 className="card-title">{recipe.title}</h3>
          <p className="card-meta">
            {recipe.readyInMinutes
              ? `${recipe.readyInMinutes} mins`
              : "Quick recipe"}
          </p>
        </div>
      </Link>

      <div className="card-footer">
        <button
          className={`btn-fav ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
          aria-label={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;

