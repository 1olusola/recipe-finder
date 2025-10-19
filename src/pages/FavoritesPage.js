import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import "./FavoritesPage.css";

export default function FavoritesPage(){
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container">
        <section className="favorites-hero">
          <h1>My Favorites ❤️</h1>
          <p>All your saved recipes in one place.</p>
        </section>
        <section className="empty-state">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <h2>You haven’t saved any recipes yet!</h2>
          <p>Start exploring and save your favorites.</p>
          <Link to="/search" className="btn-find">Go Find Recipes</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="favorites-hero">
        <h1>My Favorites ❤️</h1>
        <p>All your saved recipes in one place.</p>
      </section>

      <section className="favorites-grid" aria-label="Favorite recipes">
        {favorites.map(r => (
          <article className="recipe-card" key={r.id}>
            <img src={r.image || "/assets/placeholder.jpg"} alt={r.title} />
            <div className="card-content">
              <h3 className="card-title">{r.title}</h3>
              <p className="card-desc">{r.summary ? r.summary.replace(/<[^>]+>/g, "").slice(0,120) : "Saved recipe."}</p>
              <div className="card-footer">
                <Link to={`/recipe/${r.id}`} className="btn-view">View</Link>
                <button className="btn-remove" aria-label="Remove from favorites" onClick={() => removeFavorite(r.id)}>
                  <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

