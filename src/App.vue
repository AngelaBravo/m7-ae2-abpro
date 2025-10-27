<template>
  <div id="app">
    <!-- Loading Screen -->
    <div v-if="isInitializing" class="loading-screen">
      <div class="container-fluid h-100 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <h5 class="text-primary mb-2">Adweb Online</h5>
          <p class="text-muted">Inicializando aplicación...</p>
        </div>
      </div>
    </div>

    <!-- Main App -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Stores
const authStore = useAuthStore()

// State
const isInitializing = ref(true)

// Lifecycle
onMounted(async () => {
  try {
    // Initialize Firebase auth listener
    await authStore.initAuthListener()
    
    // Wait a bit for auth state to settle
    await new Promise(resolve => setTimeout(resolve, 1500))
    
  } catch (error) {
    console.error('Error initializing app:', error)
  } finally {
    isInitializing.value = false
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  z-index: 9999;
}

.spinner-border {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
