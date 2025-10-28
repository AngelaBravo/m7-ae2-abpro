import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'

// Mocks y stub mutable usado por la fábrica de módulos para que las pruebas puedan cambiarlo entre casos
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}))

let authStub = reactive({
  userEmail: 'user@example.com',
  isLoading: false,
  showWelcomeModal: false,
  logout: vi.fn(async () => ({ success: true })),
  hideWelcomeModal: vi.fn()
})

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => authStub
}))

// Importar el componente después de los mocks para que el módulo use las implementaciones simuladas
import NavBar from '../components/NavBar.vue'

describe('NavBar.vue', () => {
  beforeEach(() => {
    // reiniciar mocks/estado entre pruebas
    mockPush.mockClear()
    authStub.userEmail = 'user@example.com'
    authStub.isLoading = false
    authStub.showWelcomeModal = false
    authStub.logout = vi.fn(async () => ({ success: true }))
    authStub.hideWelcomeModal = vi.fn()
  })

  it('renderiza el correo electrónico del usuario conectado', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' }
        }
      }
    })

    expect(wrapper.text()).toContain('user@example.com')
  })

  it('muestra estado de carga en el botón de cerrar sesión cuando isLoading=true', () => {
    authStub.isLoading = true
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' }
        }
      }
    })

    const btn = wrapper.find('button.dropdown-item.text-danger')
    // el botón debe estar deshabilitado y mostrar la etiqueta de carga
    expect(btn.attributes('disabled')).toBeDefined()
    expect(btn.text()).toContain('Cerrando sesión...')
  })

  it('llama a logout y navega a /login cuando logout tiene éxito', async () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' }
        }
      }
    })
    const btn = wrapper.find('button.dropdown-item.text-danger')

    await btn.trigger('click')
    // esperar microtareas
    await nextTick()

    expect(authStub.logout).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('muestra el modal de bienvenida cuando showWelcomeModal=true y lo oculta al aceptarlo', async () => {
    authStub.showWelcomeModal = true
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' }
        }
      }
    })

    // El contenido del modal debe estar presente
    expect(wrapper.html()).toContain('Has ingresado correctamente al sistema')

    const botonEntendido = wrapper.find('.modal-footer button.btn.btn-success')
    expect(botonEntendido.exists()).toBe(true)

    await botonEntendido.trigger('click')
    expect(authStub.hideWelcomeModal).toHaveBeenCalled()
  })
})
