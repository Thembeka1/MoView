import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../store/AppContext.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, fetchMovieDetails, addToFavorites, removeFromFavorites, isFavorite } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      try {
        await fetchMovieDetails(id);
      } catch (error) {
        console.error('Failed to load movie details', error);
      }
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading movie details...</div>;
  }

  const movie = state.selectedMovie;
  if (!movie) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Movie not found.</div>;
  }

  const favorite = isFavorite(movie.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
          />
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ marginTop: 0 }}>{movie.title}</h1>
          {movie.tagline && <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '15px' }}>"{movie.tagline}"</p>}

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div>
              <strong>⭐ Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
            </div>
            <div>
              <strong>📅 Release:</strong> {movie.release_date || 'Unknown'}
            </div>
            {movie.runtime && (
              <div>
                <strong>⏱ Runtime:</strong> {movie.runtime} min
              </div>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <strong>Genres:</strong>{' '}
              {movie.genres.map((g, i) => (
                <span key={g.id} style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  marginLeft: i > 0 ? '8px' : 0,
                  backgroundColor: '#e0e0e0',
                  borderRadius: '15px',
                  fontSize: '14px',
                }}>
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <h3>Overview</h3>
            <p style={{ lineHeight: '1.6', color: '#555' }}>
              {movie.overview || 'No overview available.'}
            </p>
          </div>

          {movie.budget > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <strong>💰 Budget:</strong> ${movie.budget.toLocaleString()}
            </div>
          )}

          {movie.revenue > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <strong>💵 Revenue:</strong> ${movie.revenue.toLocaleString()}
            </div>
          )}

          <button
            onClick={handleFavoriteToggle}
            style={{
              padding: '12px 25px',
              backgroundColor: favorite ? '#e50914' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {favorite ? '⭐ Remove from Favorites' : '⭐ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}