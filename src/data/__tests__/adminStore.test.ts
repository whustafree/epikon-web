import { describe, it, expect, beforeEach } from 'vitest'
import { adminStore } from '../adminStore'

const STORAGE_KEY = 'epikon-admin-data'

describe('adminStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('load returns default data when nothing saved', () => {
    const data = adminStore.load()
    expect(data).toBeDefined()
    expect(data.evento).toBeDefined()
    expect(data.evento.titulo).toBe('EPIKON 2025: Expreso Mágico')
    expect(data.equipo).toBeDefined()
    expect(data.equipo.length).toBeGreaterThan(0)
    expect(data.redes.instagram).toBe('https://www.instagram.com/epikon.cl')
    expect(data.musica.streamUrl).toBe('https://stream.zeno.fm/0r0xa792kwzuv')
    expect(data.mascota.activo).toBe(true)
  })

  it('saves and loads data correctly', () => {
    const testData = {
      evento: { activo: true, titulo: 'Test Event', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
      equipo: [],
      faq: [],
      galeriaActual: [],
      galeriaAnterior: [],
      redes: { instagram: 'https://instagram.com/test' },
      imagenes: { logo: '/logo.png', fondos: [] },
      musica: { streamUrl: 'https://stream.test' },
      mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
      sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
      instagramFeed: { activo: false, posts: [] },
      cosplayGallery: { activo: false, list: [] },
      infoComunidad: { activo: false, titulo: '', guias: [] },
    }

    adminStore.save(testData)
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()

    const loaded = adminStore.load()
    expect(loaded.evento.titulo).toBe('Test Event')
    expect(loaded.redes.instagram).toBe('https://instagram.com/test')
    expect(loaded.mascota.activo).toBe(false)
    expect(loaded.equipo).toHaveLength(0)
  })

  it('clear removes data from localStorage', () => {
    adminStore.save({
      evento: { activo: true, titulo: 'Test', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
      equipo: [],
      faq: [],
      galeriaActual: [],
      galeriaAnterior: [],
      redes: { instagram: '' },
      imagenes: { logo: '', fondos: [] },
      musica: { streamUrl: '' },
      mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
      sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
      instagramFeed: { activo: false, posts: [] },
      cosplayGallery: { activo: false, list: [] },
      infoComunidad: { activo: false, titulo: '', guias: [] },
    })
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()

    adminStore.clear()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('returns defaults after clear', () => {
    const testData = {
      evento: { activo: true, titulo: 'Custom', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
      equipo: [],
      faq: [],
      galeriaActual: [],
      galeriaAnterior: [],
      redes: { instagram: '' },
      imagenes: { logo: '', fondos: [] },
      musica: { streamUrl: '' },
      mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
      sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
      instagramFeed: { activo: false, posts: [] },
      cosplayGallery: { activo: false, list: [] },
      infoComunidad: { activo: false, titulo: '', guias: [] },
    }
    adminStore.save(testData)
    adminStore.clear()

    const loaded = adminStore.load()
    expect(loaded.evento.titulo).toBe('EPIKON 2025: Expreso Mágico') // back to default
  })

  it('handles corrupt localStorage data gracefully', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    const data = adminStore.load()
    expect(data).toBeDefined() // falls back to defaults
    expect(data.evento.titulo).toBe('EPIKON 2025: Expreso Mágico')
  })
})
