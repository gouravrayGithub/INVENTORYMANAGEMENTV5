// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="app">
      <header className="header">
        <h1>Landing Page</h1>
        <div className="auth-buttons">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
