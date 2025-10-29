import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../store/AppContext.jsx';

export default function Navigation() {
  const { state } = useContext(AppContext);

  return (
    <nav style={{
      padding: '15px 20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #333'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
         MoView
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px' }}>
          Home
        </Link>
        <Link to="/favorites" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          padding: '8px 15px',
          backgroundColor: '#e50914',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
           Favorites ({state.favorites.length})
        </Link>
      </div>
    </nav>
  );
}