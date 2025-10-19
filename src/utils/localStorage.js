const KEY = "recipe_favorites";

export const getFavorites = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading favorites from localStorage", e);
    return [];
  }
};

export const saveFavorite = (recipe) => {
  try {
    const favs = getFavorites();
    if (!favs.find(r => r.id === recipe.id)) {
      favs.push(recipe);
      localStorage.setItem(KEY, JSON.stringify(favs));
      // dispatch storage event for other tabs
      window.dispatchEvent(new Event('storage'));
    }
  } catch (e) {
    console.error("Error saving favorite", e);
  }
};

export const removeFavorite = (id) => {
  try {
    const favs = getFavorites().filter(r => r.id !== id);
    localStorage.setItem(KEY, JSON.stringify(favs));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error("Error removing favorite", e);
  }
};

