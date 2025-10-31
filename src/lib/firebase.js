import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Log environment variables for debugging (remove in production)
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '***' : 'MISSING',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'MISSING',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'MISSING',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'MISSING',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'MISSING',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'MISSING'
})

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

let auth = null
let firebaseApp = null
const hasRequiredEnv = !!(firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId)

try {
  if (hasRequiredEnv) {
    console.log('Initializing Firebase...')
    firebaseApp = initializeApp(firebaseConfig)
    auth = getAuth(firebaseApp)
    console.log('Firebase initialized successfully')
  } else {
    console.warn('Firebase environment variables are missing or incomplete.')
    console.warn('Please check your .env.local file and ensure all required Firebase variables are set.')
  }
} catch (error) {
  console.error('Firebase initialization error:', error)
}

const firebaseConfigured = hasRequiredEnv && auth !== null

// Add auth state change listener for debugging
if (auth) {
  import('firebase/auth').then(({ onAuthStateChanged }) => {
    onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User signed in' : 'No user signed in')
    })
  })
}

export { auth, firebaseApp, firebaseConfigured }
