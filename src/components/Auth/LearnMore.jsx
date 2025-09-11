import React from 'react'
import './Auth.css'

export function LearnMore({ onClose }) {
  return (
    <div className="auth-container">
      <video 
        className="auth-video-background" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/background-vidz/5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Water Drops Animation */}
      <div className="water-drops-container">
        {Array.from({ length: 50 }, (_, i) => (
          <div 
            key={i} 
            className="water-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="auth-card learn-more-card">
        
        <button className="auth-close-btn" onClick={onClose}>
          ✕
        </button>
        
        <div className="learn-more-header">
          <h2>Our Mission & Vision</h2>
          <p className="mission-statement">
            Empowering African farmers with cutting-edge technology to create sustainable, 
            profitable agricultural practices that feed communities and drive economic growth.
          </p>
        </div>

        <div className="learn-more-content">
          <div className="mission-section">
            <h3>🌍 Why We Exist</h3>
            <p>
              Africa's agricultural potential is immense, yet many farmers face challenges 
              accessing markets, weather information, and modern farming techniques. Our platform 
              bridges these gaps by providing comprehensive digital tools and market access.
            </p>
          </div>

          <div className="features-section">
            <h3>🚀 What We Offer</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🌾</div>
                <h4>Crop Management</h4>
                <p>Track your crops, monitor growth stages, and optimize planting schedules with AI-powered insights.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌤️</div>
                <h4>Weather Intelligence</h4>
                <p>Get accurate, localized weather forecasts to make informed farming decisions and protect your crops.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h4>Market Analytics</h4>
                <p>Access real-time market prices, demand trends, and optimal selling times to maximize your profits.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h4>Direct Market Access</h4>
                <p>Connect directly with buyers, eliminate middlemen, and secure better prices for your produce.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h4>Farm Analytics</h4>
                <p>Track performance metrics, analyze trends, and make data-driven decisions to improve your farm's productivity.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌱</div>
                <h4>Sustainable Practices</h4>
                <p>Learn about eco-friendly farming methods, soil health, and resource optimization techniques.</p>
              </div>
            </div>
          </div>

          <div className="impact-section">
            <h3>📈 Our Impact</h3>
            <div className="impact-stats">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Farmers Empowered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25%</div>
                <div className="stat-label">Average Yield Increase</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">African Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">$2M+</div>
                <div className="stat-label">Additional Income Generated</div>
              </div>
            </div>
          </div>

          <div className="values-section">
            <h3>💎 Our Values</h3>
            <div className="values-list">
              <div className="value-item">
                <strong>Innovation:</strong> Leveraging technology to solve age-old farming challenges
              </div>
              <div className="value-item">
                <strong>Community:</strong> Building a network of farmers supporting each other
              </div>
              <div className="value-item">
                <strong>Sustainability:</strong> Promoting practices that protect our environment
              </div>
              <div className="value-item">
                <strong>Empowerment:</strong> Giving farmers control over their agricultural future
              </div>
            </div>
          </div>
        </div>

        <div className="learn-more-footer">
          <p>Ready to transform your farming journey?</p>
          <div className="learn-more-buttons">
            <button onClick={() => onClose()} className="btn btn-secondary">
              Back to Sign Up
            </button>
            <button onClick={() => onClose()} className="btn btn-primary">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Grass wave effect at the bottom */}
      <div className="grass-wave"></div>
    </div>
  )
}
