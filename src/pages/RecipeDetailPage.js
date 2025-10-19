import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeDetail } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { FavoritesContext } from "../context/FavoritesContext";
import "./RecipeDetailPage.css";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true); setErr(null);
      try {
        const data = await getRecipeDetail(id);
        if (mounted) setRecipe(data);
      } catch (e) { if (mounted) setErr(e.message || "Failed to load recipe"); }
      finally { if (mounted) setLoading(false); }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (err) return <ErrorMessage message={err} onRetry={() => window.location.reload()} />;
  if (!recipe) return <div style={{padding:24}}>Recipe not found</div>;

  const fav = isFavorite(recipe.id);
  const toggleFav = () => {
    if (fav) removeFavorite(recipe.id);
    else addFavorite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image || "/assets/placeholder.jpg",
      summary: recipe.summary || ""
    });
  };

  return (
    <div className="container recipe-detail">
      <div className="detail-grid">
        <div className="left">
          <img src={recipe.image || "/assets/placeholder.jpg"} alt={recipe.title} className="hero-img" />
          <h1>{recipe.title}</h1>
          <div className="meta-row">
            {recipe.readyInMinutes && <span>⏱ {recipe.readyInMinutes} mins</span>}
            {recipe.servings && <span>• 🍽 {recipe.servings}</span>}
          </div>
          <section>
            <h2>Ingredients</h2>
            <ul className="ingredients">
              {(recipe.extendedIngredients || recipe.ingredients || []).map((ing, idx) => (
                <li key={idx}>{ing.original || ing.name}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Instructions</h2>
            <div className="instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions || recipe.summary || "<p>No instructions provided.</p>" }} />
          </section>
        </div>
        <aside className="right">
          <div className="sidebar-card">
            <h3>{recipe.title}</h3>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button className="btn-primary" onClick={toggleFav}>{fav ? "Remove Favorite" : "Save to Favorites"}</button>
              <a className="btn-secondary" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">Share</a>
            </div>
            <div style={{marginTop:16}}>
              <strong>Nutrition</strong>
              <div style={{marginTop:8}}>
                {recipe.nutrition ? <div>{recipe.nutrition.nutrients.slice(0,4).map(n => <div key={n.name}>{n.name}: {n.amount}{n.unit}</div>)}</div> : <div>—</div>}
              </div>
            </div>
          </div>
          <div style={{height:24}} />
          <div>
            <h4>Related Recipes</h4>
            {/* Minimal: Recommend slice of mock or cached search */}
            <div style={{display:'grid',gap:12,marginTop:8}}>
              <Link to="/search">Browse similar recipes</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

