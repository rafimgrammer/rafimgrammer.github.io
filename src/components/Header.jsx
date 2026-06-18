// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img src="/assets/hallym.png" alt="Hallym Logo" className="header-logo-img" />
          HALLYM ECO MAP
        </Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/map">Map</Link>
      </nav>
    </header>
  );
}