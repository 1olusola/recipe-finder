// src/components/Filters/Filters.js
import React from "react";
import "./Filters.css";

export default function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      <h3>Filter Recipes</h3>

      <label>
        Meal Type
        <select name="mealType" value={filters.mealType} onChange={handleChange}>
          <option value="">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </label>

      <label>
        Diet
        <select name="diet" value={filters.diet} onChange={handleChange}>
          <option value="">Any</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
        </select>
      </label>

      <label>
        Cuisine
        <select name="cuisine" value={filters.cuisine} onChange={handleChange}>
          <option value="">Any</option>
          <option value="african">African</option>
          <option value="asian">Asian</option>
          <option value="italian">Italian</option>
          <option value="american">American</option>
        </select>
      </label>
    </div>
  );
}

