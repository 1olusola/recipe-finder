import React from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import "./HomePage.css";
import mockData from "../data/mockRecipes.json";

export default function HomePage(){
  const featured = mockData.results.slice(0,3);
  return (
    <section className="home-hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-left">
            <h1>Find recipes with what you already have</h1>
            <p>Enter ingredients (e.g., chicken, tomato) and discover quick, delicious meals tailored to your diet.</p>
            <div style={{marginTop:16}}>
              <Link to="/search" className="btn-primary">Start Searching</Link>
            </div>
          </div>
          <div className="hero-right">
            <img src="/assets/hero-image.jpg" alt="plate" style={{width:'100%', borderRadius:16}}/>
          </div>
        </div>
        <h2 style={{marginTop:32}}>Featured Recipes</h2>
        <div className="grid" style={{marginTop:16}}>
          {featured.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </section>
  );
}

