import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        setError(error.message)
      } else {
        setUser(session?.user ?? null)
      }
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, userData = {}) => {
    try {
      setError(null)
      
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase not configured. Please use demo credentials: demo@farmers.com / demo123')
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) {
        // Provide more user-friendly error messages
        let errorMessage = error.message
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.'
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.'
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.'
        } else if (error.message.includes('For security purposes, you can only request this after')) {
          const match = error.message.match(/(\d+) seconds/)
          if (match) {
            const seconds = match[1]
            errorMessage = `Rate limit reached. Please wait ${seconds} seconds before trying again.`
          } else {
            errorMessage = 'Rate limit reached. Please wait a moment before trying again.'
          }
        }
        setError(errorMessage)
        throw error
      }
      return data
    } catch (error) {
      if (!error.message.includes('User already registered') && 
          !error.message.includes('Password should be at least') && 
          !error.message.includes('Invalid email')) {
        setError('An unexpected error occurred. Please try again.')
      }
      throw error
    }
  }

  const signIn = async (email, password) => {
    try {
      setError(null)
      
      // Demo mode - bypass authentication for testing
      if (email === 'demo@farmers.com' && password === 'demo123') {
        const demoUser = {
          id: 'demo-user-123',
          email: 'demo@farmers.com',
          user_metadata: {
            full_name: 'Demo Farmer',
            phone: '+263771234567'
          }
        }
        setUser(demoUser)
        return { user: demoUser }
      }
      
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase not configured. Please use demo credentials: demo@farmers.com / demo123')
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        // Provide more user-friendly error messages
        let errorMessage = error.message
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again or use demo credentials: demo@farmers.com / demo123'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account before signing in.'
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a moment before trying again.'
        } else if (error.message.includes('For security purposes, you can only request this after')) {
          const match = error.message.match(/(\d+) seconds/)
          if (match) {
            const seconds = match[1]
            errorMessage = `Rate limit reached. Please wait ${seconds} seconds before trying again.`
          } else {
            errorMessage = 'Rate limit reached. Please wait a moment before trying again.'
          }
        }
        setError(errorMessage)
        throw error
      }
      return data
    } catch (error) {
      if (!error.message.includes('Invalid login credentials') && 
          !error.message.includes('Email not confirmed') && 
          !error.message.includes('Too many requests')) {
        setError('An unexpected error occurred. Please try again.')
      }
      throw error
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        // Provide more user-friendly error messages
        let errorMessage = error.message
        if (error.message.includes('User not found')) {
          errorMessage = 'No account found with this email address. Please check your email or sign up for a new account.'
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many password reset attempts. Please wait a moment before trying again.'
        }
        setError(errorMessage)
        throw error
      }
    } catch (error) {
      if (!error.message.includes('User not found') && 
          !error.message.includes('Too many requests')) {
        setError('An unexpected error occurred. Please try again.')
      }
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })
      
      if (error) throw error
      return data
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 