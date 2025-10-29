import React, { useContext, useState } from 'react';
import { AppContext } from '../store/AppContext.jsx';

export default function SearchBar() {
  const { state, searchMovies } = useContext(AppContext);
  const [input, setInput] = useState(state.searchQuery || '');

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    searchMovies(value);
  };

  const clearSearch = () => {
    setInput('');
    searchMovies('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={handleSearch}
          placeholder="Search movies by title..."
          style={{
            flex: 1,
            padding: '12px 15px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            outline: 'none',
          }}
        />
        {input && (
          <button
            onClick={clearSearch}
            style={{
              padding: '12px 20px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

