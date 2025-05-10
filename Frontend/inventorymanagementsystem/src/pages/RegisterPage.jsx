import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/RegisterPage.css';

function RegisterPage() {
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    role: '' 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate confirm password
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate role
    if (!registerData.role) {
      newErrors.role = 'Role is required';
    } else if (!['owner', 'staff', 'manager'].includes(registerData.role.toLowerCase())) {
      newErrors.role = 'Role must be Owner, Staff, or Manager';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Create payload without confirmPassword
      const payload = {
        email: registerData.email,
        password: registerData.password,
        role: registerData.role
      };
      
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setErrors({ general: data.message || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-image-container">
          <img src="/src/assets/images/inventory-register.png" alt="Inventory Registration" className="register-image" />
        </div>
        
        <div className="register-form-container">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join InventoryPro and start managing your inventory</p>
          
          {registrationSuccess ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <p>Registration successful! Redirecting to login...</p>
            </div>
          ) : (
            <>
              {errors.general && <div className="error-message">{errors.general}</div>}
              
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <i className="fas fa-envelope icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`register-input ${errors.email ? 'input-error' : ''}`}
                      value={registerData.email}
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
                      placeholder="Create a password"
                      className={`register-input ${errors.password ? 'input-error' : ''}`}
                      value={registerData.password}
                      onChange={handleChange}
                    />
                    <i 
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock icon"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className={`register-input ${errors.confirmPassword ? 'input-error' : ''}`}
                      value={registerData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user-tag icon"></i>
                    <select
                      id="role"
                      name="role"
                      className={`register-input ${errors.role ? 'input-error' : ''}`}
                      value={registerData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select a role</option>
                      <option value="Owner">Owner</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  {errors.role && <span className="error-text">{errors.role}</span>}
                </div>
                
                <div className="terms-container">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                </div>
                
                <button 
                  type="submit" 
                  className="register-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><span className="spinner"></span> Creating Account...</>
                  ) : (
                    'Register'
                  )}
                </button>
              </form>
              
              <div className="register-footer">
                <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;