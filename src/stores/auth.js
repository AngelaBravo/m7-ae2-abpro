import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '@/firebase/config'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const isAuthenticated = ref(false)
  const showWelcomeModal = ref(false)

  // Getters
  const currentUser = computed(() => user.value)
  const userEmail = computed(() => user.value?.email || '')
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)

  // Actions
  const clearError = () => {
    error.value = null
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  // Register new user
  const register = async (email, password) => {
    try {
      setLoading(true)
      clearError()
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      isAuthenticated.value = true
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Login existing user
  const login = async (email, password) => {
    try {
      setLoading(true)
      clearError()
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      isAuthenticated.value = true
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      isAuthenticated.value = false
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  // Initialize auth state listener
  const initAuthListener = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser
          isAuthenticated.value = true
          showWelcomeModal.value = true
        } else {
          user.value = null
          isAuthenticated.value = false
          showWelcomeModal.value = false
        }
        resolve(unsubscribe)
      })
    })
  }

  const hideWelcomeModal = () => {
    showWelcomeModal.value = false
  }

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated,
    showWelcomeModal,
    // Getters
    currentUser,
    userEmail,
    isLoggedIn,
    // Actions
    register,
    login,
    logout,
    clearError,
    initAuthListener,
    hideWelcomeModal
  }
})