import axios from "axios";
import mockData from "../data/mockRecipes.json";

const API_KEY = process.env.REACT_APP_SPOONACULAR_KEY || "";
const BASE = "https://api.spoonacular.com/recipes";

const axiosInstance = axios.create({ timeout: 10000 });

const mockFallback = (err) => {
  console.warn("Falling back to mock data due to API error:", err?.message || err);
  return mockData.results || [];
};

export const searchRecipes = async (query, params = { number: 12, offset: 0 }) => {
  const q = (query || "").trim();
  const cacheKey = `search::${q}::${JSON.stringify(params)}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    if (!API_KEY) {
      const fallback = mockFallback(new Error("No API key present"));
      sessionStorage.setItem(cacheKey, JSON.stringify(fallback));
      return fallback;
    }

    const res = await axiosInstance.get(`${BASE}/complexSearch`, {
      params: { apiKey: API_KEY, query: q, number: params.number, offset: params.offset, addRecipeInformation: true }
    });

    const results = res.data.results || [];
    sessionStorage.setItem(cacheKey, JSON.stringify(results));
    return results;
  } catch (err) {
    const fallback = mockFallback(err);
    try { sessionStorage.setItem(cacheKey, JSON.stringify(fallback)); } catch {}
    return fallback;
  }
};

export const getRecipeDetail = async (id) => {
  const cacheKey = `detail::${id}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  try {
    if (!API_KEY) {
      const item = (mockData.results || []).find(r => String(r.id) === String(id));
      sessionStorage.setItem(cacheKey, JSON.stringify(item || null));
      return item || null;
    }
    const res = await axiosInstance.get(`${BASE}/${id}/information`, {
      params: { apiKey: API_KEY, includeNutrition: true }
    });
    sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    const item = (mockData.results || []).find(r => String(r.id) === String(id));
    sessionStorage.setItem(cacheKey, JSON.stringify(item || null));
    return item || null;
  }
};


export const getFeaturedRecipes = async () => {
  const cache = sessionStorage.getItem("featuredRecipes");
  if (cache) return JSON.parse(cache);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=6&apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`
    );
    const data = await response.json();
    const recipes = data.recipes || [];
    sessionStorage.setItem("featuredRecipes", JSON.stringify(recipes));
    return recipes;
  } catch (error) {
    console.error("Error fetching featured recipes:", error);
    return require("../data/mockRecipes.json");
  }
};

