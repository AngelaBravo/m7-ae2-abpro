<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand fw-bold" to="/home">
        <i class="fas fa-graduation-cap me-2"></i>
        Adweb Online
      </router-link>

      <!-- Mobile menu button -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation items -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/home"
              active-class="active">
              <i class="fas fa-home me-1"></i>
              Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/admin"
              active-class="active">
              <i class="fas fa-cogs me-1"></i>
              Administración
            </router-link>
          </li>
        </ul>

        <!-- User info and logout -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
              <i class="fas fa-user-circle me-1"></i>
              {{ authStore.userEmail }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <span class="dropdown-item-text">
                  <small class="text-muted">Conectado como:</small><br>
                  <strong>{{ authStore.userEmail }}</strong>
                </span>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button 
                  class="dropdown-item text-danger" 
                  @click="handleLogout"
                  :disabled="authStore.isLoading">
                  <i class="fas fa-sign-out-alt me-2"></i>
                  {{ authStore.isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión' }}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Welcome Modal -->
  <div 
    class="modal fade" 
    id="welcomeModal" 
    tabindex="-1" 
    :class="{ show: authStore.showWelcomeModal }"
    :style="{ display: authStore.showWelcomeModal ? 'block' : 'none' }"
    data-bs-backdrop="static" 
    data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-success text-white">
          <h5 class="modal-title">
            <i class="fas fa-check-circle me-2"></i>
            ¡Bienvenido!
          </h5>
        </div>
        <div class="modal-body text-center">
          <div class="mb-3">
            <i class="fas fa-user-check text-success" style="font-size: 3rem;"></i>
          </div>
          <h6>Has ingresado correctamente al sistema</h6>
          <p class="text-muted mb-0">
            <strong>{{ authStore.userEmail }}</strong>
          </p>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-success" 
            @click="closeWelcomeModal">
            <i class="fas fa-thumbs-up me-2"></i>
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal backdrop -->
  <div 
    v-if="authStore.showWelcomeModal" 
    class="modal-backdrop fade show">
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Router and stores
const router = useRouter()
const authStore = useAuthStore()

// Methods
const handleLogout = async () => {
  const result = await authStore.logout()
  
  if (result.success) {
    // Redirect to login page
    router.push('/login')
  }
}

const closeWelcomeModal = () => {
  authStore.hideWelcomeModal()
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 5px;
  margin: 0 2px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.text-danger:hover {
  background-color: #f8d7da !important;
}

/* Custom modal styles */
.modal-content {
  border-radius: 15px;
  border: none;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}

.modal-header {
  border-radius: 15px 15px 0 0 !important;
  border-bottom: none;
}

.modal-footer {
  border-top: none;
  border-radius: 0 0 15px 15px !important;
}
</style>