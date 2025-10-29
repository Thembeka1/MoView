import React, { useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/AppContext.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Movies() {
  const { state, fetchMovies, resetMovies, addToFavorites, isFavorite } = useContext(AppContext);

  useEffect(() => {
    if (state.movies.length === 0) {
      fetchMovies().catch(() => {/* error handled in context */});
    }
  }, []);

  const movies = state.movies || [];

  // Filter movies based on search query
  const filteredMovies = useMemo(() => {
    if (!state.searchQuery) return movies;
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [movies, state.searchQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Popular Movies</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={fetchMovies}
          style={{
            padding: '10px 20px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          🔄 Display Movies
        </button>
        <button 
          onClick={resetMovies}
          style={{
            padding: '10px 20px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          🧹 Reset
        </button>
      </div>

      <SearchBar />

      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : filteredMovies.length === 0 ? (
        <p>No movies found matching "{state.searchQuery}"</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
          {filteredMovies.map((movie) => {
            const favorite = isFavorite(movie.id);
            return (
              <div key={movie.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    alt={movie.title}
                    style={{ width: '100%', borderRadius: 6, cursor: 'pointer' }}
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''}
                  />
                  <h3 style={{ margin: '8px 0' }}>{movie.title}</h3>
                  <small>⭐ {movie.vote_average} • 📅 {movie.release_date}</small>
                </Link>
                <button
                  onClick={() => addToFavorites(movie)}
                  disabled={favorite}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '8px',
                    backgroundColor: favorite ? '#ccc' : '#e50914',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: favorite ? 'not-allowed' : 'pointer',
                  }}
                >
                  {favorite ? '✓ In Favorites' : '⭐ Add to Favorites'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
