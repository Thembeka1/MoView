import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favourites";
import Register from "./pages/Register";
import Login from "./pages/login";

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}
