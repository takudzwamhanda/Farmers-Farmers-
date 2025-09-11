import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Loader2, X } from 'lucide-react'
import './Auth.css'

export function SignUp({ onSwitchToLogin, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    location: '',
    farmSize: '',
    experienceYears: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { signUp, error } = useAuth()

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose()
    } else {
      window.history.back()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)
    
    try {
      const userData = {
        full_name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        farm_size: formData.farmSize,
        experience_years: parseInt(formData.experienceYears) || 0
      }

      await signUp(formData.email, formData.password, userData)
      // Success - user will be redirected automatically
    } catch (error) {
      console.error('Sign up error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <video 
        className="auth-video-background" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/background-vidz/3.mp4" type="video/mp4" />
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
          <h2>Join Farmers App</h2>
          <p>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-group">
              <Phone size={20} className="input-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+263 77 123 4567"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <div className="input-group">
              <MapPin size={20} className="input-icon" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City or Province"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="farmSize">Farm Size (Hectares)</label>
              <input
                type="number"
                id="farmSize"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                placeholder="0.0"
                min="0"
                step="0.1"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="experienceYears">Years of Experience</label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                placeholder="0"
                min="0"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading || !formData.email || !formData.password || !formData.fullName}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
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