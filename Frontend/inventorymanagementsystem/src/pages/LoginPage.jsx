import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
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
            setErrors({ general: 'Unknown role' });
          }
        } else {
          setErrors({ general: 'Failed to fetch user role' });
        }
      } else {
        const errorText = await response.text();
        setErrors({ general: errorText || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image-container">
          <img src="/src/assets/images/inventory-login.png" alt="Inventory Management" className="login-image" />
        </div>
        
        <div className="login-form-container">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Login to access your inventory dashboard</p>
          
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope icon"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`login-input ${errors.email ? 'input-error' : ''}`}
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`login-input ${errors.password ? 'input-error' : ''}`}
                  value={loginData.password}
                  onChange={handleChange}
                />
                <i 
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            
            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <><span className="spinner"></span> Logging in...</>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <Link to="/register" className="register-link">Register Now</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;