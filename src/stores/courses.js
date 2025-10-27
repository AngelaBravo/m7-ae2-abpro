import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  setDoc
} from 'firebase/firestore'
import { db } from '@/firebase/config'

export const useCoursesStore = defineStore('courses', () => {
  // State
  const courses = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const isInitialized = ref(false)

  // Getters
  const allCourses = computed(() => courses.value)
  const activeCourses = computed(() => courses.value.filter(course => course.estado))
  const coursesCount = computed(() => courses.value.length)
  const getCourseByCode = computed(() => (codigo) => 
    courses.value.find(course => course.codigo === codigo)
  )

  // Actions
  const clearError = () => {
    error.value = null
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  // Load initial courses from JSON file
  const loadInitialCourses = async () => {
    try {
      setLoading(true)
      clearError()
      
      const response = await axios.get('/courses.json')
      const initialCourses = response.data
      
      // Add each course to Firestore if not already exists
      const coursesCollection = collection(db, 'courses')
      
      for (const course of initialCourses) {
        try {
          // Use course code as document ID to avoid duplicates
          await setDoc(doc(coursesCollection, course.codigo), course)
        } catch (err) {
          console.log(`Course ${course.codigo} might already exist, skipping...`)
        }
      }
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      console.error('Error loading initial courses:', err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Initialize real-time listener for Firestore
  const initCoursesListener = () => {
    const coursesCollection = collection(db, 'courses')
    
    const unsubscribe = onSnapshot(coursesCollection, (snapshot) => {
      const coursesData = []
      snapshot.forEach((doc) => {
        coursesData.push({
          id: doc.id,
          ...doc.data()
        })
      })
      courses.value = coursesData
      isInitialized.value = true
    }, (err) => {
      error.value = err.message
      console.error('Error listening to courses:', err)
    })
    
    return unsubscribe
  }

  // Add new course
  const addCourse = async (courseData) => {
    try {
      setLoading(true)
      clearError()
      
      const coursesCollection = collection(db, 'courses')
      
      // Use course code as document ID
      await setDoc(doc(coursesCollection, courseData.codigo), courseData)
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Update course
  const updateCourse = async (courseCode, courseData) => {
    try {
      setLoading(true)
      clearError()
      
      const courseDoc = doc(db, 'courses', courseCode)
      await updateDoc(courseDoc, courseData)
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Delete course
  const deleteCourse = async (courseCode) => {
    try {
      setLoading(true)
      clearError()
      
      const courseDoc = doc(db, 'courses', courseCode)
      await deleteDoc(courseDoc)
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Initialize courses (load initial data and setup listener)
  const initializeCourses = async () => {
    if (!isInitialized.value) {
      // Setup real-time listener first
      const unsubscribe = initCoursesListener()
      
      // Load initial courses if collection is empty
      // This will be handled by the onSnapshot listener
      setTimeout(async () => {
        if (courses.value.length === 0) {
          await loadInitialCourses()
        }
      }, 1000)
      
      return unsubscribe
    }
  }

  return {
    // State
    courses,
    isLoading,
    error,
    isInitialized,
    // Getters
    allCourses,
    activeCourses,
    coursesCount,
    getCourseByCode,
    // Actions
    loadInitialCourses,
    initCoursesListener,
    addCourse,
    updateCourse,
    deleteCourse,
    initializeCourses,
    clearError
  }
})