import { useState } from 'react'
import { Mail, Loader2, X, ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export function ForgotPassword({ onSwitchToLogin, onClose }) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)
  
  const { resetPassword } = useAuth()

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose()
    } else {
      window.history.back()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      await resetPassword(email)
      setIsSuccess(true)
    } catch (error) {
      setError(error.message || 'Failed to send password reset email')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
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
            <div className="success-icon">
              <CheckCircle size={48} color="#10b981" />
            </div>
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to {email}</p>
          </div>

          <div className="auth-footer">
            <p>
              Didn't receive the email?{' '}
              <button
                type="button"
                className="auth-link"
                onClick={() => {
                  setIsSuccess(false)
                  setError(null)
                }}
              >
                Try again
              </button>
            </p>
            <p>
              Remember your password?{' '}
              <button
                type="button"
                className="auth-link"
                onClick={onSwitchToLogin}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    )
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
          <h2>Forgot Password?</h2>
          <p>Enter your email to receive a password reset link</p>
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

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <button
              type="button"
              className="auth-link"
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
