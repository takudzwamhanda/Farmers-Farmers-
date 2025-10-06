import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!auth) {
      // Firebase not configured; keep user null but stop loading to let UI render
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || null)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signUp = async (email, password, userData = {}) => {
    try {
      setError(null)
      if (!auth) throw new Error('Authentication not configured')
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      // Optionally set displayName and other profile fields
      if (userData && (userData.full_name || userData.displayName)) {
        await firebaseUpdateProfile(cred.user, {
          displayName: userData.full_name || userData.displayName
        })
      }
      return { user: cred.user }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred. Please try again.')
      throw error
    }
  }

  const signIn = async (email, password) => {
    try {
      setError(null)
      if (!auth) throw new Error('Authentication not configured')
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return { user: cred.user }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred. Please try again.')
      throw error
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      if (!auth) throw new Error('Authentication not configured')
      await firebaseSignOut(auth)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      if (!auth) throw new Error('Authentication not configured')
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      setError(error.message || 'An unexpected error occurred. Please try again.')
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      if (!auth.currentUser) throw new Error('Not authenticated')
      await firebaseUpdateProfile(auth.currentUser, updates)
      return { user: auth.currentUser }
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