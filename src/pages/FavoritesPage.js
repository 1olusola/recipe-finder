import React, { useEffect, useState } from "react";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Remove from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <>
      <main className="favorites-page">
        <section className="favorites-hero">
          <h1>My Favorites ❤️</h1>
          <p>All your saved recipes in one place.</p>
        </section>

        {favorites.length === 0 ? (
          <section className="empty-state">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#E0E0E0"
              fill="none"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
                3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <h2>You haven’t saved any recipes yet!</h2>
            <p>Start exploring and save your favorites.</p>
            <a href="/search" className="btn-find">
              Go Find Recipes
            </a>
          </section>
        ) : (
          <section className="favorites-grid">
            {favorites.map((recipe) => (
              <article key={recipe.id} className="recipe-card">
                <img
                  src={
                    recipe.image ||
                    "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg"
                  }
                  alt={recipe.title}
                />
                <div className="card-content">
                  <h3 className="card-title">{recipe.title}</h3>
                  <p className="card-desc">
                    {recipe.summary
                      ? recipe.summary.replace(/<[^>]+>/g, "").slice(0, 100) +
                        "..."
                      : "Delicious recipe saved to your favorites."}
                  </p>
                  <div className="card-footer">
                    <a href={`/recipe/${recipe.id}`} className="btn-view">
                      View
                    </a>
                    <button
                      className="btn-remove"
                      onClick={() => removeFavorite(recipe.id)}
                      aria-label="Remove from favorites"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                          2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                          4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 
                          3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                          11.54L12 21.35z"
                          fill="#E74C3C"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}

