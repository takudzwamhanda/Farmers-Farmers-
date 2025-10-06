import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

let auth = null
const hasRequiredEnv = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
)

if (hasRequiredEnv) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
} else {
  // Avoid crashing the app during dev if env is missing
  // Provide a clearer message so developers know how to fix it
  console.warn(
    'Firebase environment variables missing. Copy env.example to .env.local and set VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID, etc.'
  )
}

const firebaseConfigured = hasRequiredEnv

export { auth, firebaseConfigured }


