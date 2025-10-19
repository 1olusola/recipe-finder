import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetail } from "../utils/api";
import { useFavorites } from "../context/FavoritesContext";
import FavoriteButton from "../components/FavoriteButton";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./RecipeDetailPage.css";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeDetail(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!recipe) {
    return (
      <div className="loading-container">
        <p>Loading recipe details...</p>
      </div>
    );
  }

  const handlePrint = () => window.print();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: "Check out this recipe!",
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="recipe-detail-page">
      <main className="recipe-detail-container">
        <div className="recipe-main">
          <img
            src={recipe.image || "https://source.unsplash.com/800x600/?food"}
            alt={recipe.title}
            className="recipe-detail-image"
          />
          <h1 className="recipe-title">{recipe.title}</h1>

          <div className="recipe-meta">
            <p>⏱ {recipe.readyInMinutes || 20} mins</p>
            <p>🍽 Serves {recipe.servings || 2}</p>
            <p>Difficulty: Easy</p>
          </div>

          <p className="recipe-summary">
            {recipe.summary
              ? recipe.summary.replace(/<[^>]*>/g, "")
              : "A simple, delicious dish for everyday cooking."}
          </p>

          <span className="recipe-category">
            {recipe.cuisines?.[0] || "General"}
          </span>
        </div>

        <aside className="recipe-aside">
          <div className="recipe-actions shadow-box">
            <h3>Recipe Actions</h3>
            <div className="action-buttons">
              <FavoriteButton recipe={recipe} />
              <button className="print-btn" onClick={handlePrint}>
                🖨 Print
              </button>
              <button className="share-btn" onClick={handleShare}>
                📤 Share
              </button>
            </div>
          </div>

          <div className="nutrition shadow-box">
            <h3>Nutrition (per serving)</h3>
            <div className="nutrition-list">
              <p>Calories: {recipe.nutrition?.nutrients?.[0]?.amount || 240} kcal</p>
              <p>Protein: {recipe.nutrition?.nutrients?.[1]?.amount || 8} g</p>
              <p>Carbs: {recipe.nutrition?.nutrients?.[2]?.amount || 32} g</p>
              <p>Fat: {recipe.nutrition?.nutrients?.[3]?.amount || 6} g</p>
            </div>
          </div>

          <div className="shopping-list shadow-box">
            <h3>Shopping List</h3>
            <button className="shopping-btn">🛒 Add all to shopping list</button>
          </div>

          <div className="related shadow-box">
            <h3>Related Recipes</h3>
            {relatedRecipes.length > 0 ? (
              relatedRecipes.map((item) => (
                <div className="related-item" key={item.id}>
                  <img
                    src={item.image || "https://source.unsplash.com/300x200/?food"}
                    alt={item.title}
                  />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.readyInMinutes} mins • Easy</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No related recipes available.</p>
            )}
          </div>
        </aside>
      </main>

      <section className="ingredients-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients?.map((ing, i) => (
            <li key={i}>{ing.original}</li>
          )) || <li>No ingredients listed.</li>}
        </ul>
      </section>

      <section className="instructions-section">
        <h2>Instructions</h2>
        <ol>
          {recipe.analyzedInstructions?.[0]?.steps?.map((step, i) => (
            <li key={i}>{step.step}</li>
          )) || <li>No instructions available.</li>}
        </ol>
        <div className="chef-tip">
          💡 Chef Tips: Use quality olive oil. Add chili flakes for a spicy kick.
        </div>
      </section>
    </div>
  );
};

export default RecipeDetailPage;

