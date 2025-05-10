import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      alert('Login successful');
      localStorage.setItem('userEmail', loginData.email);
      
      const roleResponse = await fetch(`http://localhost:8080/api/auth/role?email=${loginData.email}`);
      if (roleResponse.ok) {
        const roleData = await roleResponse.json();
        const role = roleData.role.toLowerCase();

        if (role === 'owner') {
          navigate('/owner');
        } else if (role === 'manager') {
          navigate('/manager');
        } else if (role === 'staff') {
          navigate('/staff');
        } else {
          alert('Unknown role');
        }
      } else {
        alert('Failed to fetch user role');
      }
    } else {
      const errorText = await response.text();
      alert(errorText);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="login-input"
        value={loginData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="login-input"
        value={loginData.password}
        onChange={handleChange}
      />
      <button className="login-button" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;