import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { SET_MOVIES, RESET_MOVIES, SELECT_MOVIE, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SEARCH_MOVIES } from "./action";


export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    movies: [],
    selectedMovie: null,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    searchQuery: "",
  });

 
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const fetchMovies = async () => {
    const API_KEY = (import.meta.env.VITE_TMDB_API_KEY || '').trim();
    const RAW_TOKEN = (import.meta.env.VITE_TMDB_BEARER || '').trim();
   
    const TOKEN = RAW_TOKEN.startsWith('Bearer ') ? RAW_TOKEN.slice(7) : RAW_TOKEN;

    
    const useToken = !API_KEY && Boolean(TOKEN);
    const base = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const url = useToken ? base : `${base}${API_KEY ? `&api_key=${API_KEY}` : ''}`;

    const options = useToken
      ? { headers: { Authorization: `Bearer ${TOKEN}`, accept: 'application/json' } }
      : undefined;

    const res = await fetch(url, options);
    if (!res.ok) {
      let body = '';
      try {
        body = await res.text();
      } catch {}
      console.error('TMDB fetch failed', res.status, res.statusText, body);
      throw new Error(`TMDB error ${res.status}`);
    }
    const data = await res.json();
    dispatch({ type: SET_MOVIES, payload: data.results || [] });
  };

  const resetMovies = () => dispatch({ type: RESET_MOVIES });

  const selectMovie = (movie) => dispatch({ type: SELECT_MOVIE, payload: movie });

  const fetchMovieDetails = async (id) => {
    const API_KEY = (import.meta.env.VITE_TMDB_API_KEY || '').trim();
    const RAW_TOKEN = (import.meta.env.VITE_TMDB_BEARER || '').trim();
    const TOKEN = RAW_TOKEN.startsWith('Bearer ') ? RAW_TOKEN.slice(7) : RAW_TOKEN;

    const useToken = !API_KEY && Boolean(TOKEN);
    const base = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const url = useToken ? base : `${base}${API_KEY ? `&api_key=${API_KEY}` : ''}`;

    const options = useToken
      ? { headers: { Authorization: `Bearer ${TOKEN}`, accept: 'application/json' } }
      : undefined;

    const res = await fetch(url, options);
    if (!res.ok) {
      console.error('TMDB fetch movie details failed', res.status);
      throw new Error(`TMDB error ${res.status}`);
    }
    const data = await res.json();
    dispatch({ type: SELECT_MOVIE, payload: data });
    return data;
  };

  const addToFavorites = (movie) => {
    if (!state.favorites.find(fav => fav.id === movie.id)) {
      dispatch({ type: ADD_TO_FAVORITES, payload: movie });
    }
  };

  const removeFromFavorites = (movieId) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: movieId });
  };

  const searchMovies = (query) => {
    dispatch({ type: SEARCH_MOVIES, payload: query });
  };

  const isFavorite = (movieId) => {
    return state.favorites.some(fav => fav.id === movieId);
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      fetchMovies, 
      resetMovies, 
      selectMovie, 
      fetchMovieDetails,
      addToFavorites,
      removeFromFavorites,
      searchMovies,
      isFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
}
