import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import AdminPage from '../AdminPage'

// Mock dataLoader and adminStore
vi.mock('../../data/dataLoader', () => ({
  clearDataCache: vi.fn(),
}))

const mockDefaultData = {
  evento: { activo: true, titulo: 'Test Event', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
  equipo: [{ activo: true, nombre: 'Test Staff', rol: 'Admin', foto: '', link: '' }],
  faq: [{ p: 'Test?', r: 'Yes!' }],
  galeriaActual: ['https://example.com/photo1.jpg'],
  galeriaAnterior: [],
  redes: { instagram: 'https://instagram.com/test' },
  imagenes: { logo: '/logo.png', fondos: [] },
  musica: { streamUrl: 'https://stream.test' },
  mascota: { activo: true, imagenPng: '/mascota.png', frases: ['Hola!'], tiempoEntreFrases: 8000 },
  sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
  instagramFeed: { activo: false, posts: [] },
  cosplayGallery: { activo: false, list: [] },
  infoComunidad: { activo: false, titulo: '', guias: [] },
}

vi.mock('../../data/adminStore', () => ({
  adminStore: {
    load: vi.fn(() => mockDefaultData),
    save: vi.fn(),
    clear: vi.fn(),
  },
}))

// Mock validation
vi.mock('../../data/validation', () => ({
  validateAllAdminData: vi.fn(() => []),
  type: {},
}))

// Mock LanguageContext
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}))

describe('AdminPage - Login', () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    cleanup()
  })

  it('shows login form when not logged in', () => {
    render(<AdminPage />)
    expect(screen.getByPlaceholderText('admin.loginPlaceholder')).toBeInTheDocument()
    expect(screen.getByText('admin.loginButton')).toBeInTheDocument()
  })

  it('shows error for wrong password', () => {
    render(<AdminPage />)
    const input = screen.getByPlaceholderText('admin.loginPlaceholder')
    const button = screen.getByText('admin.loginButton')

    fireEvent.change(input, { target: { value: 'wrongpassword' } })
    fireEvent.click(button)

    // Should show error (it's the loginError key from translations)
    // But since we mock t to return the key, it should show 'admin.loginError'
    // Actually, the error is set from the login handler, not from t()
    // Let's check for the error text
    expect(screen.getByText('Contraseña incorrecta')).toBeInTheDocument()
  })

  it('logs in with correct password', () => {
    render(<AdminPage />)
    const input = screen.getByPlaceholderText('admin.loginPlaceholder')
    const button = screen.getByText('admin.loginButton')

    fireEvent.change(input, { target: { value: 'epikon2025' } })
    fireEvent.click(button)

    // After login, should show the admin panel title
    expect(screen.getByText('admin.panelTitle')).toBeInTheDocument()
    // Login form should be gone
    expect(screen.queryByText('admin.loginButton')).not.toBeInTheDocument()
  })

  it('logs in on Enter key press', () => {
    render(<AdminPage />)
    const input = screen.getByPlaceholderText('admin.loginPlaceholder')

    fireEvent.change(input, { target: { value: 'epikon2025' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    // Should be logged in
    expect(screen.getByText('admin.panelTitle')).toBeInTheDocument()
  })
})
