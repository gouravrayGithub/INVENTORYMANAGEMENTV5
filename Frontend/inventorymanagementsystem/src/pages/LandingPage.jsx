// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>TaskFlow</h1>
        <div className="auth-buttons">
          <Link to="/login"><button className="btn login-btn">Login</button></Link>
          <Link to="/register"><button className="btn register-btn">Register</button></Link>
        </div>
      </header>

      <main className="landing-content">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Organize Your Work, Boost Your Productivity</h2>
            <p>Manage tasks, collaborate with teams, and achieve your goals efficiently</p>
            <Link to="/register" className="cta-link">
              <button className="btn cta-btn">Get Started for Free</button>
            </Link>
          </div>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <h3>📋 Intuitive Task Management</h3>
              <p>Create, organize, and prioritize tasks with drag-and-drop simplicity.</p>
            </div>
            <div className="feature-card">
              <h3>⏱️ Time Tracking</h3>
              <p>Monitor your productivity with built-in time tracking and analytics.</p>
            </div>
            <div className="feature-card">
              <h3>👥 Team Collaboration</h3>
              <p>Share projects, assign tasks, and communicate in real-time.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;