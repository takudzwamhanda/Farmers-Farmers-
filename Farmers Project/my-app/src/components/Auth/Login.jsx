import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, Mail, Lock, Loader2, X } from 'lucide-react'
import './Auth.css'

export function Login({ onSwitchToSignUp, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { signIn, error } = useAuth()

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose()
    } else {
      window.history.back()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      return
    }

    setIsLoading(true)
    
    try {
      await signIn(email, password)
      // Success - user will be redirected automatically by AuthContext
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      {/* Enhanced Animated Background */}
      <div className="auth-video-background"></div>
      
      {/* Floating Shapes Animation */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
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
      <div className="auth-card">
        <button
          type="button"
          className="auth-close-btn"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your Farmers App account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <button
              type="button"
              className="auth-link"
              onClick={() => onSwitchToSignUp('forgot-password')}
              disabled={isLoading}
            >
              Forgot your password?
            </button>
          </p>
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-link"
              onClick={() => onSwitchToSignUp('signup')}
              disabled={isLoading}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
} 