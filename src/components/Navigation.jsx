import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../store/AppContext.jsx';

export default function Navigation() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

   
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('user');
      
     
      if (!userData && isLoggedIn) {
        handleLogout();
      }
      
      setIsLoggedIn(loginStatus && userData !== null);
    };

  
    const interval = setInterval(checkLoginStatus, 1000);

   
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user'); 
    setIsLoggedIn(false);
    navigate('/Movies');
  };

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
      <Link to={isLoggedIn ? "/Movies" : "/"} style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
        🎬 MoView
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {isLoggedIn ? (
          <>
            <Link to="/Movies" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px' }}>
              Movies
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
              ⭐ Favorites ({state.favorites.length})
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 15px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px' }}>
              Login
            </Link>
            <Link to="/register" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              padding: '8px 15px',
              backgroundColor: '#e50914',
              borderRadius: '4px',
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}