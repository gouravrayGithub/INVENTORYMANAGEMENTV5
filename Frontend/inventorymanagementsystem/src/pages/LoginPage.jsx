// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
  // Save email
  localStorage.setItem('userEmail', loginData.email);
      // ⬇️ Call /role API to get role
      const roleResponse = await fetch(`http://localhost:8080/api/auth/role?email=${loginData.email}`);
      if (roleResponse.ok) {
        const roleData = await roleResponse.json();
        const role = roleData.role.toLowerCase();  // owner / manager / staff

        // Navigate based on role
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
    <div>
      <h2>Login Page</h2>
      <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default LoginPage;
