import axios from "axios";
import mockData from "../data/mockRecipes.json";

/**
 * Spoonacular config
 */
const API_KEY = process.env.REACT_APP_SPOONACULAR_KEY || "";
const BASE = "https://api.spoonacular.com/recipes";

/**
 * Utility to fetch with timeout and error handling
 */
const axiosInstance = axios.create({
  timeout: 10000
});

const useMockFallback = (err) => {
  console.warn("Falling back to mock data due to API error:", err?.message || err);
  return mockData.results || [];
};

/**
 * Search recipes.
 * Implements sessionStorage caching to avoid repeated requests for same query.
 * Cache key: search::{query}::{JSON.stringify(params)}
 */
export const searchRecipes = async (query, params = { number: 12, offset: 0 }) => {
  const q = (query || "").trim();
  const cacheKey = `search::${q}::${JSON.stringify(params)}`;
  try {
    // check session cache
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    if (!API_KEY) {
      // no API key — fallback
      const fallback = useMockFallback(new Error("No API key present"));
      sessionStorage.setItem(cacheKey, JSON.stringify(fallback));
      return fallback;
    }

    const res = await axiosInstance.get(`${BASE}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: q,
        number: params.number,
        offset: params.offset,
        addRecipeInformation: true // include summary/image
      }
    });

    const results = res.data.results || [];
    // save to session cache
    sessionStorage.setItem(cacheKey, JSON.stringify(results));
    return results;
  } catch (err) {
    // fallback to mock data
    const fallback = useMockFallback(err);
    try { sessionStorage.setItem(cacheKey, JSON.stringify(fallback)); } catch(e) {}
    return fallback;
  }
};

/**
 * Get recipe detail by id
 */
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
    // fallback: try to find in mockData
    const item = (mockData.results || []).find(r => String(r.id) === String(id));
    sessionStorage.setItem(cacheKey, JSON.stringify(item || null));
    return item || null;
  }
};

