import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Filters from "../components/Filters/Filters";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { searchRecipes } from "../utils/api";
import "./SearchPage.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    mealType: "",
    diet: "",
    cuisine: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Handle search
  const handleSearch = async (newQuery, newFilters = filters, reset = true) => {
    try {
      setLoading(true);
      setError("");
      const results = await searchRecipes(newQuery, newFilters, page);
      if (reset) {
        setRecipes(results);
      } else {
        setRecipes((prev) => [...prev, ...results]);
      }
      setHasMore(results.length > 0);
    } catch (err) {
      setError("Unable to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle “Load More”
  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await handleSearch(query, filters, false);
  };

  // Auto-fetch cached results if available
  useEffect(() => {
    const cached = sessionStorage.getItem("lastSearch");
    if (cached) {
      const { query, results } = JSON.parse(cached);
      setQuery(query);
      setRecipes(results);
    }
  }, []);

  // Save results to cache
  useEffect(() => {
    if (recipes.length > 0) {
      sessionStorage.setItem("lastSearch", JSON.stringify({ query, results: recipes }));
    }
  }, [recipes, query]);

  return (
    <>
      <main className="search-page">
        <section className="search-hero">
          <h1>Find Delicious Recipes 🍳</h1>
          <p>Search by ingredient, meal type, or dietary preference.</p>
          <SearchBar onSearch={handleSearch} />
        </section>

        <section className="search-content">
          <aside className="filters-column">
            <Filters filters={filters} setFilters={setFilters} />
          </aside>

          <div className="results-column">
            {loading && <LoadingSpinner />}
            {error && <p className="error-message">{error}</p>}

            {!loading && recipes.length === 0 && (
              <div className="empty-state">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3480/3480475.png"
                  alt="Empty search results"
                />
                <h2>No recipes found</h2>
                <p>Try a different search keyword or filter.</p>
              </div>
            )}

            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {!loading && hasMore && recipes.length > 0 && (
              <button className="btn-load" onClick={loadMore}>
                Load more recipes
              </button>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

