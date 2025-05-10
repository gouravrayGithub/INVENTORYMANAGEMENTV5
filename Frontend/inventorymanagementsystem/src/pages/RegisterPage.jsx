import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';

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
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="register-input"
        value={registerData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="register-input"
        value={registerData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role (Owner, Staff, Manager)"
        className="register-input"
        value={registerData.role}
        onChange={handleChange}
      />
      <div className="register-button-group">
        <button className="register-button" onClick={handleSubmit}>
          Register
        </button>
        <button className="register-back-button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;