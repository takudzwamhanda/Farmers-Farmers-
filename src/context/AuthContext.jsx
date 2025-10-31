import { createContext, useContext, useEffect, useState } from 'react'
import { auth, firebaseConfigured } from '../lib/firebase'
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
  // A simple in-memory mock user store used when Firebase isn't configured
  const [devUsers, setDevUsers] = useState([])

  useEffect(() => {
    if (!auth) {
      // Firebase not configured; keep user null but stop loading to let UI render
      // This lets the app run without auth in development if env vars are missing.
      // We'll expose mock auth methods below so the UI can function in dev.
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
      if (!auth) {
        // Dev-mode mock sign up: store a fake user in-memory and set as current user
        const fakeUser = {
          uid: `dev-${Date.now()}`,
          email,
          displayName: userData.full_name || userData.displayName || null
        }
        setDevUsers(prev => [...prev, { email, password, user: fakeUser }])
        setUser(fakeUser)
        return { user: fakeUser }
      }
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
      if (!auth) {
        // Dev-mode mock sign in: find matching in-memory user
        const found = devUsers.find(u => u.email === email && u.password === password)
        if (!found) {
          const err = new Error('Invalid credentials (dev mock)')
          setError(err.message)
          throw err
        }
        setUser(found.user)
        return { user: found.user }
      }
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
      if (!auth) {
        // Dev-mode mock sign out
        setUser(null)
        return
      }
      await firebaseSignOut(auth)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      if (!auth) {
        // Dev-mode no-op for reset
        return
      }
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      setError(error.message || 'An unexpected error occurred. Please try again.')
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      if (!auth) {
        // Dev-mode update profile: update in-memory user
        if (!user) throw new Error('Not authenticated (dev mock)')
        const updated = { ...user, ...updates }
        setUser(updated)
        return { user: updated }
      }
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
    firebaseConfigured,
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