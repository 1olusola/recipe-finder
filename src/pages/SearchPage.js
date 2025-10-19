import React, { useEffect, useState } from "react";
import { searchRecipes } from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import useDebounce from "../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage(){
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12;

  useEffect(() => {
    // auto-search when debounced query changes
    if (!debounced) { setRecipes([]); setErr(null); return; }
    const doSearch = async () => {
      setLoading(true); setErr(null);
      try {
        const results = await searchRecipes(debounced, { number: PAGE_SIZE, offset: page * PAGE_SIZE });
        setRecipes(results);
      } catch (e) {
        setErr(e.message || "Failed to fetch recipes");
      } finally { setLoading(false); }
    };
    doSearch();
  }, [debounced, page]);

  return (
    <div className="container">
      <div style={{margin:'24px 0'}}>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by ingredients or recipe name, e.g., chicken, tomato" className="search-input" />
      </div>

      {loading && <LoadingSpinner />}

      {err && <ErrorMessage message={err} onRetry={() => { setPage(0); setQuery(debounced); }} />}

      {!loading && !err && recipes.length === 0 && debounced && (
        <div style={{padding:24}}>No recipes found for "{debounced}". Try another search.</div>
      )}

      <div className="results-grid">
        {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>

      {recipes.length > 0 && (
        <div style={{display:'flex', justifyContent:'center', margin:24}}>
          <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page===0} className="page-btn">Prev</button>
          <span style={{padding:'8px 16px'}}>Page {page+1}</span>
          <button onClick={() => setPage(p => p+1)} className="page-btn">Next</button>
        </div>
      )}
    </div>
  );
}

