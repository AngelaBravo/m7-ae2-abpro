// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgRbpGcV_oIBa9Zh4wimZIiTTyxgv7HPU",
  authDomain: "m7ae2abpro.firebaseapp.com",
  projectId: "m7ae2abpro",
  storageBucket: "m7ae2abpro.firebasestorage.app",
  messagingSenderId: "563820053865",
  appId: "1:563820053865:web:099134c4984d19f29729f8"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app