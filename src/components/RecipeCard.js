import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const fav = isFavorite(recipe.id);

  const onToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fav) removeFavorite(recipe.id);
    else {
      // store minimal fields needed
      const payload = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image || recipe.imageUrl || "/assets/placeholder.jpg",
        summary: recipe.summary || ""
      };
      addFavorite(payload);
    }
  };

  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="card-link">
        <img src={recipe.image || recipe.imageUrl || "/assets/placeholder.jpg"} alt={recipe.title} />
        <div className="card-content">
          <h3 className="card-title">{recipe.title}</h3>
          <p className="card-desc">
            {recipe.summary ? recipe.summary.replace(/<[^>]+>/g, "").slice(0, 110) + "..." : "Delicious recipe."}
          </p>
          <div className="card-footer">
            <div className="meta">
              {recipe.readyInMinutes ? <span>⏱ {recipe.readyInMinutes} mins</span> : null}
            </div>
            <div className="actions">
              <button className="btn-view">View</button>
              <button aria-pressed={fav} className="btn-fav" onClick={onToggleFav} title={fav ? "Remove from favorites" : "Save to favorites"}>
                {fav ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

