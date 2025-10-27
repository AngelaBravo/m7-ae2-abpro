<template>
  <div class="home-view">
    <!-- Navigation Bar -->
    <NavBar />

    <!-- Main Content -->
    <div class="container-fluid py-4">
      <!-- Page Header -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h1 class="h2 mb-2">
                <i class="fas fa-home me-2 text-primary"></i>
                Cursos Disponibles
              </h1>
              <p class="text-muted mb-0">
                Explora nuestra oferta académica en desarrollo web
              </p>
            </div>
            <div class="text-end">
              <span class="badge bg-primary fs-6">
                {{ coursesStore.coursesCount }} cursos
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="coursesStore.isLoading && coursesStore.allCourses.length === 0" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando cursos...</span>
        </div>
        <p class="mt-3 text-muted">Cargando cursos...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="coursesStore.error" class="row">
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Error al cargar los cursos: {{ coursesStore.error }}
            <button 
              class="btn btn-outline-danger btn-sm ms-3" 
              @click="reloadCourses">
              <i class="fas fa-redo me-1"></i>
              Reintentar
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="coursesStore.allCourses.length === 0" class="text-center py-5">
        <i class="fas fa-book-open text-muted" style="font-size: 4rem;"></i>
        <h4 class="mt-3 text-muted">No hay cursos disponibles</h4>
        <p class="text-muted">Los cursos aparecerán aquí una vez que sean agregados.</p>
      </div>

      <!-- Courses Grid -->
      <div v-else class="row g-4">
        <div 
          v-for="course in coursesStore.allCourses" 
          :key="course.codigo"
          class="col-12 col-sm-6 col-lg-4 col-xl-3">
          <div class="card h-100 course-card shadow-sm">
            <!-- Course Image -->
            <div class="card-img-top-container">
              <img 
                :src="course.img" 
                :alt="course.nombre"
                class="card-img-top"
                loading="lazy"
                @error="handleImageError"
              />
              <!-- Status Badge -->
              <div class="position-absolute top-0 end-0 m-2">
                <span 
                  class="badge" 
                  :class="course.estado ? 'bg-success' : 'bg-secondary'">
                  {{ course.estado ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="card-body d-flex flex-column">
              <!-- Course Title -->
              <h5 class="card-title text-primary mb-2">
                {{ course.nombre }}
              </h5>

              <!-- Course Description -->
              <p class="card-text text-muted small mb-3 flex-grow-1">
                {{ course.descripcion }}
              </p>

              <!-- Course Details -->
              <div class="course-details mb-3">
                <div class="row g-2 text-sm">
                  <div class="col-6">
                    <i class="fas fa-clock text-info me-1"></i>
                    <small>{{ course.duracion }}</small>
                  </div>
                  <div class="col-6">
                    <i class="fas fa-tag text-warning me-1"></i>
                    <small>{{ formatPrice(course.precio) }}</small>
                  </div>
                  <div class="col-6">
                    <i class="fas fa-users text-success me-1"></i>
                    <small>{{ course.inscritos }}/{{ course.cupos }}</small>
                  </div>
                  <div class="col-6">
                    <i class="fas fa-hashtag text-secondary me-1"></i>
                    <small>{{ course.codigo }}</small>
                  </div>
                </div>
              </div>

              <!-- Progress Bar for Enrollment -->
              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <small class="text-muted">Inscripciones</small>
                  <small class="text-muted">{{ enrollmentPercentage(course) }}%</small>
                </div>
                <div class="progress" style="height: 6px;">
                  <div 
                    class="progress-bar" 
                    :class="getProgressBarColor(enrollmentPercentage(course))"
                    role="progressbar" 
                    :style="{ width: enrollmentPercentage(course) + '%' }"
                    :aria-valuenow="enrollmentPercentage(course)" 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button 
                class="btn btn-outline-primary btn-sm w-100"
                :disabled="!course.estado || course.inscritos >= course.cupos"
                @click="showCourseInfo(course)">
                <i v-if="!course.estado" class="fas fa-ban me-1"></i>
                <i v-else-if="course.inscritos >= course.cupos" class="fas fa-users-slash me-1"></i>
                <i v-else class="fas fa-info-circle me-1"></i>
                
                <span v-if="!course.estado">No Disponible</span>
                <span v-else-if="course.inscritos >= course.cupos">Sin Cupos</span>
                <span v-else>Ver Detalles</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div v-if="coursesStore.allCourses.length > 0" class="row mt-5">
        <div class="col-12">
          <div class="card bg-light border-0">
            <div class="card-body">
              <h6 class="card-title text-muted mb-3">
                <i class="fas fa-chart-bar me-2"></i>
                Estadísticas Generales
              </h6>
              <div class="row text-center">
                <div class="col-6 col-md-3">
                  <div class="stat-item">
                    <h4 class="text-primary mb-1">{{ coursesStore.coursesCount }}</h4>
                    <small class="text-muted">Total Cursos</small>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="stat-item">
                    <h4 class="text-success mb-1">{{ activeCourses }}</h4>
                    <small class="text-muted">Cursos Activos</small>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="stat-item">
                    <h4 class="text-info mb-1">{{ totalEnrolled }}</h4>
                    <small class="text-muted">Total Inscritos</small>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="stat-item">
                    <h4 class="text-warning mb-1">{{ availableSpots }}</h4>
                    <small class="text-muted">Cupos Disponibles</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Course Info Modal -->
  <div 
    class="modal fade" 
    id="courseModal" 
    tabindex="-1" 
    ref="courseModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content" v-if="selectedCourse">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="fas fa-book me-2"></i>
            {{ selectedCourse.nombre }}
          </h5>
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            data-bs-dismiss="modal">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 text-center mb-3">
              <img 
                :src="selectedCourse.img" 
                :alt="selectedCourse.nombre"
                class="img-fluid rounded shadow-sm"
                style="max-height: 200px; object-fit: contain;"
              />
            </div>
            <div class="col-md-8">
              <h6 class="text-muted">Información del Curso</h6>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <i class="fas fa-hashtag text-primary me-2"></i>
                  <strong>Código:</strong> {{ selectedCourse.codigo }}
                </li>
                <li class="mb-2">
                  <i class="fas fa-clock text-info me-2"></i>
                  <strong>Duración:</strong> {{ selectedCourse.duracion }}
                </li>
                <li class="mb-2">
                  <i class="fas fa-tag text-warning me-2"></i>
                  <strong>Precio:</strong> {{ formatPrice(selectedCourse.precio) }}
                </li>
                <li class="mb-2">
                  <i class="fas fa-users text-success me-2"></i>
                  <strong>Cupos:</strong> {{ selectedCourse.inscritos }}/{{ selectedCourse.cupos }}
                </li>
                <li class="mb-2">
                  <i class="fas fa-circle me-2" 
                     :class="selectedCourse.estado ? 'text-success' : 'text-secondary'"></i>
                  <strong>Estado:</strong> 
                  {{ selectedCourse.estado ? 'Activo' : 'Inactivo' }}
                </li>
              </ul>
              
              <div class="mt-3">
                <h6 class="text-muted">Descripción</h6>
                <p>{{ selectedCourse.descripcion }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useCoursesStore } from '@/stores/courses'

// Store
const coursesStore = useCoursesStore()

// Refs
const selectedCourse = ref(null)
const courseModal = ref(null)

// Computed
const activeCourses = computed(() => 
  coursesStore.allCourses.filter(course => course.estado).length
)

const totalEnrolled = computed(() => 
  coursesStore.allCourses.reduce((sum, course) => sum + course.inscritos, 0)
)

const availableSpots = computed(() => 
  coursesStore.allCourses.reduce((sum, course) => sum + (course.cupos - course.inscritos), 0)
)

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(parseInt(price))
}

const enrollmentPercentage = (course) => {
  if (course.cupos === 0) return 0
  return Math.round((course.inscritos / course.cupos) * 100)
}

const getProgressBarColor = (percentage) => {
  if (percentage >= 90) return 'bg-danger'
  if (percentage >= 70) return 'bg-warning'
  if (percentage >= 30) return 'bg-info'
  return 'bg-success'
}

const handleImageError = (event) => {
  // Fallback image
  event.target.src = 'https://via.placeholder.com/300x200/e9ecef/6c757d?text=Imagen+No+Disponible'
}

const showCourseInfo = (course) => {
  selectedCourse.value = course
  // Using Bootstrap modal programmatically
  const modal = new bootstrap.Modal(document.getElementById('courseModal'))
  modal.show()
}

const reloadCourses = async () => {
  await coursesStore.initializeCourses()
}

// Lifecycle
onMounted(async () => {
  // Initialize courses when component mounts
  await coursesStore.initializeCourses()
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.course-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: none;
  border-radius: 15px;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-img-top-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-card:hover .card-img-top {
  transform: scale(1.05);
}

.course-details .row {
  font-size: 0.85rem;
}

.stat-item {
  padding: 1rem 0;
}

.progress {
  border-radius: 10px;
}

.progress-bar {
  border-radius: 10px;
}

.btn {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.modal-content {
  border-radius: 15px;
  border: none;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}

.modal-header {
  border-radius: 15px 15px 0 0 !important;
}

@media (max-width: 576px) {
  .card-img-top-container {
    height: 150px;
  }
  
  .course-details .col-6 {
    margin-bottom: 0.5rem;
  }
}
</style>