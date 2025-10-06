import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Dashboard } from './components/Dashboard'
import { CropManagement } from './components/CropManagement'
import { CropPagesHub } from './components/CropPagesHub'
import { WeatherForecast } from './components/WeatherForecast'
import { MarketPrices } from './components/MarketPrices'
import { ConnectBuyers } from './components/ConnectBuyers'
import { FarmAnalytics } from './components/FarmAnalytics'
import { FarmingOverview } from './components/FarmingOverview'
import { SidebarProvider } from './context/SidebarContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { Login } from './components/Auth/Login'
import { SignUp } from './components/Auth/SignUp'
import { ForgotPassword } from './components/Auth/ForgotPassword'
import { LearnMore } from './components/Auth/LearnMore'
import { AnimationTest } from './components/AnimationTest'
import './App.css'

function AppContent() {
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAuth, setShowAuth] = useState(null) // 'login', 'signup', 'forgot-password', 'test-connection', 'video-test', or null
  const { user, loading } = useAuth()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  // Scroll to top when section changes
  useEffect(() => {
    const scrollToTop = () => {
      // Try smooth scrolling first, fallback to instant scroll
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      } catch (error) {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, 0)
      }
      
      // Also scroll the main content area if it exists
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.scrollTop = 0
      }
    }
    
    scrollToTop()
  }, [currentSection])

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />
      case 'crops':
        return <CropManagement />
      case 'crop-pages':
        return <CropPagesHub onBack={() => setCurrentSection('dashboard')} />
      case 'weather':
        return <WeatherForecast />
      case 'prices':
        return <MarketPrices />
      case 'buyers':
        return <ConnectBuyers />
      case 'analytics':
        return <FarmAnalytics />
      case 'farming-overview':
        return <FarmingOverview />
      default:
        return <Dashboard />
    }
  }

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication screens if user is not logged in
  if (!user) {
    return (
      <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
        {showAuth === 'login' ? (
          <Login 
            onSwitchToSignUp={(type) => setShowAuth(type)} 
            onClose={() => setShowAuth(null)}
          />
        ) : showAuth === 'signup' ? (
          <SignUp 
            onSwitchToLogin={() => setShowAuth('login')} 
            onClose={() => setShowAuth(null)}
          />
        ) : showAuth === 'forgot-password' ? (
          <ForgotPassword 
            onSwitchToLogin={() => setShowAuth('login')} 
            onClose={() => setShowAuth(null)}
          />
        ) : showAuth === 'video-test' ? (
          <AnimationTest />
        ) : showAuth === 'learn-more' ? (
          <LearnMore onClose={() => setShowAuth(null)} />
        ) : (
          <div className="auth-landing">
            {/* Enhanced Animated Background */}
            <div className="auth-video-background"></div>
            
            {/* Floating Shapes Animation */}
            <div className="floating-shapes">
              <div className="floating-shape"></div>
              <div className="floating-shape"></div>
              <div className="floating-shape"></div>
              <div className="floating-shape"></div>
            </div>
            
            {/* Agricultural Animation Elements */}
            <div className="agriculture-animations">
              <div className="floating-leaf">🌿</div>
              <div className="floating-leaf">🌱</div>
              <div className="floating-leaf">🍃</div>
              <div className="floating-leaf">🌾</div>
              <div className="floating-leaf">🌿</div>
              
              <div className="growing-vine"></div>
              <div className="growing-vine"></div>
              <div className="growing-vine"></div>
              <div className="growing-vine"></div>
              
              <div className="green-seed"></div>
              <div className="green-seed"></div>
              <div className="green-seed"></div>
              <div className="green-seed"></div>
              
              <div className="green-particle"></div>
              <div className="green-particle"></div>
              <div className="green-particle"></div>
              <div className="green-particle"></div>
              
              <div className="green-glow"></div>
              <div className="green-glow"></div>
              
              <div className="floating-crop">🌽</div>
              <div className="floating-crop">🥔</div>
              <div className="floating-crop">🥑</div>
            </div>
            
            <div className="auth-landing-content">
              <h1>Welcome to Farmers Project</h1>
              <p className="auth-subtitle">Empowering African Farmers with Technology & Market Access</p>
              
              <div className="auth-features">
                <div className="feature-item">
                  <span className="feature-icon">🌾</span>
                  <span>Crop Management & Analytics</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌤️</span>
                  <span>Weather Forecasting</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💰</span>
                  <span>Market Price Tracking</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🤝</span>
                  <span>Connect with Buyers</span>
                </div>
              </div>
              
              <p className="auth-description">
                Join thousands of farmers across Africa who are using our platform to increase yields, 
                optimize resources, and connect directly with markets. Get started today and transform your farming journey.
              </p>
              
              <div className="auth-buttons">
                <button onClick={() => setShowAuth('login')} className="btn btn-primary">
                  Sign In
                </button>
                <button onClick={() => setShowAuth('signup')} className="btn btn-secondary">
                  Create Account
                </button>
              </div>
              
              <button 
                className="btn btn-learn-more"
                onClick={() => setShowAuth('learn-more')}
              >
                Learn More About Our Mission
              </button>
            </div>
            
            {/* Grass wave effect at the bottom */}
            <div className="grass-wave"></div>
          </div>
        )}
      </div>
    )
  }

  // Show main app if user is authenticated
  return (
    <NotificationProvider>
      <SidebarProvider>
        <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
          <div className="app-layout">
            <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
            <div className="app-main">
              <Header 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode}
              />
              <main className="app-content" id="main-content">
                {renderSection()}
              </main>
              <Footer currentSection={currentSection} setCurrentSection={setCurrentSection} />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
