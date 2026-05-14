import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../store/AppContext.jsx';

export default function Favorites() {
  const { state, removeFromFavorites } = useContext(AppContext);
  const favorites = state.favorites || [];

  return (
    <div style={{ padding: '20px' }}>
      <h1>⭐ My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>No favorites yet!</p>
          <Link to="/Movies" style={{
            display: 'inline-block',
            marginTop: '15px',
            padding: '12px 25px',
            backgroundColor: '#e50914',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
          }}>
            Browse Movies
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {favorites.map((movie) => (
            <div key={movie.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, position: 'relative' }}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: 6 }}
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''}
                />
                <h3 style={{ margin: '8px 0' }}>{movie.title}</h3>
                <small>⭐ {movie.vote_average} • 📅 {movie.release_date}</small>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(movie.id);
                }}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#e50914',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

