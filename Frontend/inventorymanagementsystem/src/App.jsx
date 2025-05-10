// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import OwnerPage from './pages/OwnerPage';
import ManagerPage from './pages/ManagerPage';
import StaffPage from './pages/StaffPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/manager" element={<ManagerPage email={userEmail} />} />
      <Route path="/staff" element={<StaffPage email={userEmail} />} />

    </Routes>
  );
}

export default App;
