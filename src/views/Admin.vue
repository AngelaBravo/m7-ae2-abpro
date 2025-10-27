<template>
  <div class="admin-view">
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
                <i class="fas fa-cogs me-2 text-primary"></i>
                Administración de Cursos
              </h1>
              <p class="text-muted mb-0">
                Gestiona todos los cursos del sistema
              </p>
            </div>
            <button 
              class="btn btn-success btn-lg"
              @click="openAddCourseModal">
              <i class="fas fa-plus me-2"></i>
              Agregar Curso
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-book fa-2x me-3"></i>
                <div>
                  <h4 class="mb-0">{{ coursesStore.coursesCount }}</h4>
                  <small>Total Cursos</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-check-circle fa-2x me-3"></i>
                <div>
                  <h4 class="mb-0">{{ activeCourses }}</h4>
                  <small>Cursos Activos</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-info text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-users fa-2x me-3"></i>
                <div>
                  <h4 class="mb-0">{{ totalEnrolled }}</h4>
                  <small>Total Inscritos</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-dollar-sign fa-2x me-3"></i>
                <div>
                  <h4 class="mb-0">{{ formatPrice(totalRevenue) }}</h4>
                  <small>Ingresos Totales</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Courses Table -->
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="fas fa-table me-2"></i>
                Lista de Cursos
              </h5>
            </div>
            <div class="card-body p-0">
              <!-- Loading State -->
              <div v-if="coursesStore.isLoading && coursesStore.allCourses.length === 0" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3 text-muted">Cargando cursos...</p>
              </div>

              <!-- Empty State -->
              <div v-else-if="coursesStore.allCourses.length === 0" class="text-center py-5">
                <i class="fas fa-inbox text-muted" style="font-size: 3rem;"></i>
                <h5 class="mt-3 text-muted">No hay cursos registrados</h5>
                <p class="text-muted">Comienza agregando tu primer curso.</p>
              </div>

              <!-- Table -->
              <div v-else class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-primary">
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Imagen</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Duración</th>
                      <th scope="col">Cupos</th>
                      <th scope="col">Inscritos</th>
                      <th scope="col" class="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="course in coursesStore.allCourses" :key="course.codigo">
                      <td class="fw-bold">{{ course.codigo }}</td>
                      <td>
                        <img 
                          :src="course.img" 
                          :alt="course.nombre"
                          class="course-thumb"
                          @error="handleImageError"
                        />
                      </td>
                      <td>
                        <div class="fw-bold">{{ course.nombre }}</div>
                        <small class="text-muted">{{ course.descripcion }}</small>
                      </td>
                      <td>
                        <span 
                          class="badge" 
                          :class="course.estado ? 'bg-success' : 'bg-secondary'">
                          {{ course.estado ? 'Activo' : 'Inactivo' }}
                        </span>
                      </td>
                      <td class="fw-bold text-success">{{ formatPrice(course.precio) }}</td>
                      <td>
                        <i class="fas fa-clock text-info me-1"></i>
                        {{ course.duracion }}
                      </td>
                      <td class="text-center">
                        <span class="badge bg-primary">{{ course.cupos }}</span>
                      </td>
                      <td class="text-center">
                        <span class="badge bg-info">{{ course.inscritos }}</span>
                        <div class="progress mt-1" style="height: 4px;">
                          <div 
                            class="progress-bar bg-info" 
                            :style="{ width: enrollmentPercentage(course) + '%' }">
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        <div class="btn-group" role="group">
                          <button 
                            class="btn btn-outline-primary btn-sm"
                            @click="openEditCourseModal(course)"
                            title="Editar curso">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button 
                            class="btn btn-outline-danger btn-sm"
                            @click="confirmDeleteCourse(course)"
                            title="Eliminar curso">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add/Edit Course Modal -->
  <div class="modal fade" id="courseFormModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header" :class="isEditMode ? 'bg-warning' : 'bg-success'">
          <h5 class="modal-title text-white">
            <i :class="isEditMode ? 'fas fa-edit' : 'fas fa-plus'" class="me-2"></i>
            {{ isEditMode ? 'Editar Curso' : 'Agregar Nuevo Curso' }}
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <form @submit.prevent="handleSubmitCourse">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="codigo" class="form-label">Código del Curso *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="codigo"
                  v-model="courseForm.codigo"
                  :readonly="isEditMode"
                  required
                  placeholder="Ej: 0005"
                />
              </div>
              <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre del Curso *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="nombre"
                  v-model="courseForm.nombre"
                  required
                  placeholder="Ej: JavaScript Avanzado"
                />
              </div>
              <div class="col-12">
                <label for="descripcion" class="form-label">Descripción *</label>
                <textarea 
                  class="form-control" 
                  id="descripcion"
                  v-model="courseForm.descripcion"
                  rows="3"
                  required
                  placeholder="Descripción del curso..."
                ></textarea>
              </div>
              <div class="col-12">
                <label for="img" class="form-label">URL de la Imagen *</label>
                <input 
                  type="url" 
                  class="form-control" 
                  id="img"
                  v-model="courseForm.img"
                  required
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div class="col-md-6">
                <label for="precio" class="form-label">Precio (CLP) *</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="precio"
                  v-model="courseForm.precio"
                  required
                  min="0"
                  placeholder="30000"
                />
              </div>
              <div class="col-md-6">
                <label for="duracion" class="form-label">Duración *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="duracion"
                  v-model="courseForm.duracion"
                  required
                  placeholder="Ej: 2 meses"
                />
              </div>
              <div class="col-md-4">
                <label for="cupos" class="form-label">Cupos *</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="cupos"
                  v-model="courseForm.cupos"
                  required
                  min="1"
                  placeholder="20"
                />
              </div>
              <div class="col-md-4">
                <label for="inscritos" class="form-label">Inscritos</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="inscritos"
                  v-model="courseForm.inscritos"
                  min="0"
                  :max="courseForm.cupos"
                  placeholder="0"
                />
              </div>
              <div class="col-md-4">
                <label for="estado" class="form-label">Estado</label>
                <select class="form-select" id="estado" v-model="courseForm.estado">
                  <option :value="true">Activo</option>
                  <option :value="false">Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="fas fa-times me-2"></i>
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn" 
              :class="isEditMode ? 'btn-warning' : 'btn-success'"
              :disabled="coursesStore.isLoading">
              <span v-if="coursesStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else :class="isEditMode ? 'fas fa-save' : 'fas fa-plus'" class="me-2"></i>
              {{ coursesStore.isLoading ? 'Procesando...' : (isEditMode ? 'Actualizar Curso' : 'Agregar Curso') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div class="modal fade" id="confirmationModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Confirmar Eliminación
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" v-if="courseToDelete">
          <p class="mb-3">
            ¿Estás seguro de que deseas eliminar el curso <strong>{{ courseToDelete.nombre }}</strong>?
          </p>
          <div class="alert alert-warning">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Esta acción no se puede deshacer.
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <i class="fas fa-times me-2"></i>
            Cancelar
          </button>
          <button 
            type="button" 
            class="btn btn-danger"
            @click="handleDeleteCourse"
            :disabled="coursesStore.isLoading">
            <span v-if="coursesStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="fas fa-trash me-2"></i>
            {{ coursesStore.isLoading ? 'Eliminando...' : 'Sí, borrar' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Success/Error Toast -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div 
      id="actionToast" 
      class="toast" 
      :class="toastType"
      role="alert">
      <div class="toast-header">
        <i :class="toastIcon" class="me-2"></i>
        <strong class="me-auto">{{ toastTitle }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        {{ toastMessage }}
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
const isEditMode = ref(false)
const courseToDelete = ref(null)
const toastType = ref('bg-success')
const toastIcon = ref('fas fa-check-circle')
const toastTitle = ref('')
const toastMessage = ref('')

// Form data
const courseForm = ref({
  codigo: '',
  nombre: '',
  descripcion: '',
  img: '',
  precio: '',
  duracion: '',
  cupos: '',
  inscritos: 0,
  estado: true
})

// Computed
const activeCourses = computed(() => 
  coursesStore.allCourses.filter(course => course.estado).length
)

const totalEnrolled = computed(() => 
  coursesStore.allCourses.reduce((sum, course) => sum + course.inscritos, 0)
)

const totalRevenue = computed(() => 
  coursesStore.allCourses.reduce((sum, course) => sum + (course.inscritos * parseInt(course.precio)), 0)
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

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/60x40/e9ecef/6c757d?text=N/A'
}

const resetForm = () => {
  courseForm.value = {
    codigo: '',
    nombre: '',
    descripcion: '',
    img: '',
    precio: '',
    duracion: '',
    cupos: '',
    inscritos: 0,
    estado: true
  }
}

const openAddCourseModal = () => {
  isEditMode.value = false
  resetForm()
  const modal = new bootstrap.Modal(document.getElementById('courseFormModal'))
  modal.show()
}

const openEditCourseModal = (course) => {
  isEditMode.value = true
  courseForm.value = { ...course }
  const modal = new bootstrap.Modal(document.getElementById('courseFormModal'))
  modal.show()
}

const handleSubmitCourse = async () => {
  const formData = {
    ...courseForm.value,
    precio: courseForm.value.precio.toString(),
    cupos: parseInt(courseForm.value.cupos),
    inscritos: parseInt(courseForm.value.inscritos) || 0
  }

  let result
  if (isEditMode.value) {
    result = await coursesStore.updateCourse(courseForm.value.codigo, formData)
  } else {
    result = await coursesStore.addCourse(formData)
  }

  if (result.success) {
    showToast(
      'success',
      isEditMode.value ? 'Curso Actualizado' : 'Curso Agregado',
      isEditMode.value ? 'El curso ha sido actualizado exitosamente.' : 'El curso ha sido agregado exitosamente.'
    )
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('courseFormModal'))
    modal.hide()
  } else {
    showToast('error', 'Error', result.error)
  }
}

const confirmDeleteCourse = (course) => {
  courseToDelete.value = course
  const modal = new bootstrap.Modal(document.getElementById('confirmationModal'))
  modal.show()
}

const handleDeleteCourse = async () => {
  if (!courseToDelete.value) return

  const result = await coursesStore.deleteCourse(courseToDelete.value.codigo)

  if (result.success) {
    showToast('success', 'Curso Eliminado', 'El curso ha sido eliminado exitosamente.')
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'))
    modal.hide()
    courseToDelete.value = null
  } else {
    showToast('error', 'Error', result.error)
  }
}

const showToast = (type, title, message) => {
  if (type === 'success') {
    toastType.value = 'bg-success text-white'
    toastIcon.value = 'fas fa-check-circle text-white'
  } else {
    toastType.value = 'bg-danger text-white'
    toastIcon.value = 'fas fa-exclamation-triangle text-white'
  }
  
  toastTitle.value = title
  toastMessage.value = message
  
  const toast = new bootstrap.Toast(document.getElementById('actionToast'))
  toast.show()
}

// Lifecycle
onMounted(async () => {
  await coursesStore.initializeCourses()
})
</script>

<style scoped>
.admin-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.course-thumb {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
}

.table th {
  font-weight: 600;
  font-size: 0.9rem;
  vertical-align: middle;
}

.table td {
  vertical-align: middle;
}

.btn-group .btn {
  margin: 0 2px;
}

.modal-content {
  border-radius: 15px;
  border: none;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}

.modal-header {
  border-radius: 15px 15px 0 0 !important;
}

.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0 !important;
}

.progress {
  height: 4px;
}

.toast {
  border-radius: 10px;
}

@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.85rem;
  }
  
  .course-thumb {
    width: 40px;
    height: 30px;
  }
}
</style>