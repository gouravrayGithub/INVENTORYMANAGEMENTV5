// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [registerData, setRegisterData] = useState({ email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData)
    });
    const data = await response.json();
    console.log(data);
    navigate('/');  // Redirect back to landing after register
  };

  return (
    <div className="form-page">
      <h2>Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={registerData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={registerData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role (Owner, Staff, Manager)"
        value={registerData.role}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Register</button>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default RegisterPage;
