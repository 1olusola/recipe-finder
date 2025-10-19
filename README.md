# Recipe Finder App

A responsive web app built with **React** that allows users to search for recipes, view details, and save favorites. Uses the Spoonacular API with a mock data fallback and session caching.

## Live demo
Click Here: recipe-finder-indol-sigma.vercel.app

## Features
- Search recipes by ingredients or name (Spoonacular API)
- Recipe detail page with ingredients and instructions
- Save / remove favorites (localStorage)
- Responsive design (miobile-first)
- Debounced search, sessionStorage caching, mock fallback for API limits

## Setup
1. Clone:
   ```bash
   git clone <recipe-finder git url>
   cd recipe-finder
   npm install
   ```
2. Create `.env.local`:
   ```
   REACT_APP_SPOONACULAR_KEY=YOUR_KEY_HERE
   ```
   If you omit the key, the app will use local mock data.

3. Run:
   ```bash
   npm start
   ```

## Scripts
- `npm start` — development
- `npm run build` — production build

## Tech
React, React Router, Axios, Framer Motion (for animations)

## Notes
- The app caches search responses in `sessionStorage` to reduce API usage.
- When Spoonacular API fails or is rate-limited, the app falls back to `src/data/mockRecipes.json`.

## License
MIT © 2025 Olusola Ogunwobi
