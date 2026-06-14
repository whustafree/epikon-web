import { describe, it, expect, beforeEach } from 'vitest'
import { loadEvento, loadEquipo, loadGaleriaActual, clearDataCache } from '../dataLoader'
import { adminStore } from '../adminStore'

describe('dataLoader loaders', () => {
  beforeEach(() => {
    localStorage.clear()
    clearDataCache()
  })

  describe('loadEvento', () => {
    it('returns default evento when no admin data', () => {
      const evento = loadEvento()
      expect(evento.titulo).toBe('EPIKON 2025: Expreso Mágico')
      expect(evento.activo).toBe(true)
    })

    it('returns admin evento when saved', () => {
      adminStore.save({
        evento: { activo: true, titulo: 'Admin Event', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
        equipo: [], faq: [], galeriaActual: [], galeriaAnterior: [],
        redes: { instagram: '' }, imagenes: { logo: '', fondos: [] }, musica: { streamUrl: '' },
        mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
        sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
        instagramFeed: { activo: false, posts: [] },
        cosplayGallery: { activo: false, list: [] },
        infoComunidad: { activo: false, titulo: '', guias: [] },
      })
      clearDataCache()
      expect(loadEvento().titulo).toBe('Admin Event')
    })
  })

  describe('loadEquipo', () => {
    it('returns default equipo filtered by activo', () => {
      const equipo = loadEquipo()
      expect(equipo.length).toBeGreaterThan(0)
      expect(equipo.every(m => m.activo)).toBe(true)
    })

    it('returns empty array when admin saved empty', () => {
      adminStore.save({
        evento: { activo: true, titulo: 'Test', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
        equipo: [], faq: [], galeriaActual: [], galeriaAnterior: [],
        redes: { instagram: '' }, imagenes: { logo: '', fondos: [] }, musica: { streamUrl: '' },
        mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
        sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
        instagramFeed: { activo: false, posts: [] },
        cosplayGallery: { activo: false, list: [] },
        infoComunidad: { activo: false, titulo: '', guias: [] },
      })
      clearDataCache()
      expect(loadEquipo()).toHaveLength(0)
    })
  })

  describe('loadGaleriaActual', () => {
    it('returns default photos when no admin data', () => {
      const galeria = loadGaleriaActual()
      expect(galeria.length).toBeGreaterThan(0)
    })

    it('returns empty array when admin saved empty', () => {
      adminStore.save({
        evento: { activo: true, titulo: 'Test', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
        equipo: [], faq: [], galeriaActual: [], galeriaAnterior: [],
        redes: { instagram: '' }, imagenes: { logo: '', fondos: [] }, musica: { streamUrl: '' },
        mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
        sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
        instagramFeed: { activo: false, posts: [] },
        cosplayGallery: { activo: false, list: [] },
        infoComunidad: { activo: false, titulo: '', guias: [] },
      })
      clearDataCache()
      expect(loadGaleriaActual()).toHaveLength(0)
    })
  })

  describe('loadRedes, loadImagenes, loadMusica, loadMascota', () => {
    it('returns defaults from config', async () => {
      const { loadRedes, loadImagenes, loadMusica, loadMascota } = await import('../dataLoader')
      expect(loadRedes().instagram).toBe('https://www.instagram.com/epikon.cl')
      expect(loadImagenes().logo).toBe('/portada.png')
      expect(loadMusica().streamUrl).toBe('https://stream.zeno.fm/0r0xa792kwzuv')
      expect(loadMascota().activo).toBe(true)
    })
  })

  describe('loadSorteo, loadInstagramFeed, loadCosplayGallery, loadInfoComunidad', () => {
    it('returns defaults from config', async () => {
      const { loadSorteo, loadInstagramFeed, loadCosplayGallery, loadInfoComunidad } = await import('../dataLoader')
      expect(loadSorteo().activo).toBe(false)
      expect(loadInstagramFeed().activo).toBe(true)
      expect(loadCosplayGallery().activo).toBe(true)
      expect(loadInfoComunidad().activo).toBe(true)
    })
  })

  describe('clearDataCache', () => {
    it('forces fresh load from localStorage after clearing cache', () => {
      // First load caches default data
      expect(loadEvento().titulo).toBe('EPIKON 2025: Expreso Mágico')

      // Save new data to localStorage
      adminStore.save({
        evento: { activo: true, titulo: 'Should Show After Cache Clear', flyer: '', descripcion: '', cronograma: '', ubicacion: '', mapaLink: '', fechaInicio: '', fechaFin: '' },
        equipo: [], faq: [], galeriaActual: [], galeriaAnterior: [],
        redes: { instagram: '' }, imagenes: { logo: '', fondos: [] }, musica: { streamUrl: '' },
        mascota: { activo: false, imagenPng: '', frases: [], tiempoEntreFrases: 5000 },
        sorteo: { activo: false, titulo: '', fechaTermino: '', imgPremio: '' },
        instagramFeed: { activo: false, posts: [] },
        cosplayGallery: { activo: false, list: [] },
        infoComunidad: { activo: false, titulo: '', guias: [] },
      })

      // Without clearing cache, still returns cached (old) value
      expect(loadEvento().titulo).toBe('EPIKON 2025: Expreso Mágico')

      // Clear cache → now reads from localStorage with new data
      clearDataCache()
      expect(loadEvento().titulo).toBe('Should Show After Cache Clear')
    })
  })
})
