// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container">
      <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
        <h1>InventoryPro</h1>
        <div className="auth-buttons">
          <Link to="/login"><button className="btn login-btn">Login</button></Link>
          <Link to="/register"><button className="btn register-btn">Register</button></Link>
        </div>
      </header>

      <main className="landing-content">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Smart Inventory Management for Modern Businesses</h2>
            <p>Track inventory, manage stock levels, and optimize your supply chain with our powerful yet intuitive platform</p>
            <Link to="/register" className="cta-link">
              <button className="btn cta-btn">Start Managing Inventory</button>
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📦 Real-time Stock Tracking</h3>
              <p>Monitor inventory levels in real-time across multiple warehouses. Get instant alerts for low stock and optimize reordering.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Powerful Analytics</h3>
              <p>Make data-driven decisions with comprehensive analytics and reporting. Identify trends and forecast future inventory needs.</p>
            </div>
            <div className="feature-card">
              <h3>🔄 Streamlined Workflows</h3>
              <p>Automate routine tasks, from purchase orders to stock transfers. Save time and reduce errors with custom workflows.</p>
            </div>
            <div className="feature-card">
              <h3>👥 Role-Based Access</h3>
              <p>Assign specific permissions to staff, managers, and owners. Ensure everyone has the right level of access for their role.</p>
            </div>
            <div className="feature-card">
              <h3>📱 Mobile Friendly</h3>
              <p>Access your inventory system anywhere, anytime. Responsive design works perfectly on desktops, tablets, and smartphones.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Enterprise Security</h3>
              <p>Rest easy with enterprise-grade security features protecting your valuable inventory data and business operations.</p>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Register Your Account</h3>
                <p>Sign up for InventoryPro in minutes. Choose your role and create your account with a secure password.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Add Your Inventory</h3>
                <p>Import existing inventory or add products one by one. Organize items by categories, locations, and more.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Manage & Monitor</h3>
                <p>Track stock levels, fulfill orders, and generate reports. Get notifications when stock is running low.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Analyze & Optimize</h3>
                <p>Use built-in analytics to optimize inventory levels, reduce costs, and improve efficiency.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <h2 className="section-title">Trusted by Businesses Worldwide</h2>
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"InventoryPro transformed our warehouse operations. Stock discrepancies have been reduced by 95% and we've cut ordering costs by 30%."</p>
              </div>
              <div className="testimonial-author">
                <img src="/src/assets/images/testimonial1.jpg" alt="John Smith" className="author-image" />
                <div className="author-info">
                  <h4>John Smith</h4>
                  <p>Warehouse Manager, TechSupply Co.</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The mobile app allows our team to update inventory from anywhere in the warehouse. We've saved countless hours and improved accuracy."</p>
              </div>
              <div className="testimonial-author">
                <img src="/src/assets/images/testimonial2.jpg" alt="Sarah Johnson" className="author-image" />
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Operations Director, Global Retail Inc.</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The analytics dashboard gives us insights we never had before. We now know exactly what to stock and when, eliminating both stockouts and excess inventory."</p>
              </div>
              <div className="testimonial-author">
                <img src="/src/assets/images/testimonial3.jpg" alt="Michael Chang" className="author-image" />
                <div className="author-info">
                  <h4>Michael Chang</h4>
                  <p>CEO, FastShip Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to optimize your inventory management?</h2>
            <p>Join thousands of businesses that use InventoryPro to streamline operations and boost profitability.</p>
            <Link to="/register" className="cta-link">
              <button className="btn cta-btn">Get Started Today</button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>InventoryPro</h2>
            <p>Smart inventory management for modern businesses</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Use Cases</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-social">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 InventoryPro. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;