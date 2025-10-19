import React, { useEffect, useState } from "react";
import "./FeaturedRecipes.css";
import mockRecipes from "../../data/mockRecipes.json";
import { searchRecipes } from "../../utils/api";
import { Link } from "react-router-dom";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      try {
        // Try fetching real recipes from the API
        const data = await searchRecipes("featured");
        const limitedResults = data.results ? data.results.slice(0,3) : [];
        setRecipes(limitedResults.length ? limitedResults : mockRecipes.results.slice(0, 3));
      } catch (err) {
        // Fallback to mock data
        console.error("Falling back to mock recipes:", err);
        setRecipes(mockRecipes.results.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedRecipes();
  }, []);

  if (loading) return <p className="loading">Loading featured recipes...</p>;

  return (
    <section className="featured-section" aria-label="Featured Recipes">
      <div className="section-header">
        <h2>Featured Recipes 🍳</h2>
        <p>Our top picks for you this week</p>
      </div>

      <div className="featured-grid">
        {recipes.slice(0, 6).map((recipe) => (
          <article key={recipe.id} className="featured-card">
            <img
              src={recipe.image}
              alt={recipe.title}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&w=800&q=70";
              }}
            />
            <div className="featured-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.summary}</p>
              <Link to={`/recipe/${recipe.id}`} className="btn-view">
                View Recipe
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;

