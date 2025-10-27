<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="row w-100">
      <div class="col-12 col-md-6 col-lg-4 mx-auto">
        <div class="card shadow-lg border-0 rounded-lg">
          <div class="card-header bg-primary text-white text-center py-4">
            <h3 class="mb-0">
              <i class="fas fa-sign-in-alt me-2"></i>
              Iniciar Sesión
            </h3>
            <p class="mb-0 mt-2">Adweb Online - Cursos</p>
          </div>
          <div class="card-body p-4">
            <!-- Error Alert -->
            <div v-if="authStore.error" class="alert alert-danger alert-dismissible fade show" role="alert">
              <i class="fas fa-exclamation-triangle me-2"></i>
              {{ authStore.error }}
              <button 
                type="button" 
                class="btn-close" 
                @click="authStore.clearError()"
                aria-label="Close">
              </button>
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">
                  <i class="fas fa-envelope me-2"></i>
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  class="form-control form-control-lg" 
                  id="email"
                  v-model="form.email"
                  :disabled="authStore.isLoading"
                  required
                  placeholder="ejemplo@correo.com"
                />
              </div>
              
              <div class="mb-4">
                <label for="password" class="form-label">
                  <i class="fas fa-lock me-2"></i>
                  Contraseña
                </label>
                <input 
                  type="password" 
                  class="form-control form-control-lg" 
                  id="password"
                  v-model="form.password"
                  :disabled="authStore.isLoading"
                  required
                  placeholder="••••••••"
                />
              </div>

              <div class="d-grid gap-2">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  :disabled="authStore.isLoading || !isFormValid"
                >
                  <span v-if="authStore.isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i v-else class="fas fa-sign-in-alt me-2"></i>
                  {{ authStore.isLoading ? 'Ingresando...' : 'Ingresar' }}
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <small class="text-muted">
              ¿No tienes cuenta? 
              <router-link to="/register" class="text-decoration-none">
                Regístrate aquí
              </router-link>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Router and stores
const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = ref({
  email: '',
  password: ''
})

// Computed
const isFormValid = computed(() => {
  return form.value.email.trim() !== '' && form.value.password.trim() !== ''
})

// Methods
const handleLogin = async () => {
  if (!isFormValid.value) return
  
  const result = await authStore.login(form.value.email, form.value.password)
  
  if (result.success) {
    // Redirect to home page
    router.push('/home')
  }
}
</script>

<style scoped>
.card {
  max-width: 400px;
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0 !important;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background: linear-gradient(45deg, #0d6efd, #0b5ed7);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #0b5ed7, #0a58ca);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.3);
}

.bg-light {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
}
</style>