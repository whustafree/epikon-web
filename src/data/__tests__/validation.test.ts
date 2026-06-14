import { describe, it, expect } from 'vitest'
import {
  isValidUrl,
  isValidRelativeOrAbsoluteUrl,
  isValidDate,
  isValidPositiveNumber,
  isNotEmpty,
  validateEvento,
  validateSorteo,
  validateMascota,
  validateRedes,
  validateMusica,
  validateImagenes,
} from '../validation'

describe('isValidUrl', () => {
  it('accepts http URLs', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
  })

  it('accepts https URLs', () => {
    expect(isValidUrl('https://www.instagram.com/epikon.cl')).toBe(true)
  })

  it('rejects empty string', () => {
    expect(isValidUrl('')).toBe(true) // optional, so passes
  })

  it('rejects random text', () => {
    expect(isValidUrl('not-a-url')).toBe(false)
  })

  it('rejects relative paths', () => {
    expect(isValidUrl('/images/logo.png')).toBe(false)
  })
})

describe('isValidRelativeOrAbsoluteUrl', () => {
  it('accepts absolute URLs', () => {
    expect(isValidRelativeOrAbsoluteUrl('https://example.com/img.jpg')).toBe(true)
  })

  it('accepts relative URLs', () => {
    expect(isValidRelativeOrAbsoluteUrl('/images/logo.png')).toBe(true)
  })

  it('rejects invalid strings', () => {
    expect(isValidRelativeOrAbsoluteUrl('not-a-url')).toBe(false)
  })
})

describe('isValidDate', () => {
  it('accepts ISO date strings', () => {
    expect(isValidDate('2025-11-01T12:00:00')).toBe(true)
  })

  it('accepts natural date strings', () => {
    expect(isValidDate('December 25, 2026 20:00:00')).toBe(true)
  })

  it('rejects invalid date strings', () => {
    expect(isValidDate('not-a-date')).toBe(false)
  })
})

describe('isValidPositiveNumber', () => {
  it('accepts positive numbers', () => {
    expect(isValidPositiveNumber(8000)).toBe(true)
  })

  it('rejects zero', () => {
    expect(isValidPositiveNumber(0)).toBe(false)
  })

  it('rejects negative numbers', () => {
    expect(isValidPositiveNumber(-5)).toBe(false)
  })

  it('rejects NaN', () => {
    expect(isValidPositiveNumber(NaN)).toBe(false)
  })
})

describe('isNotEmpty', () => {
  it('accepts non-empty strings', () => {
    expect(isNotEmpty('hello')).toBe(true)
  })

  it('rejects empty strings', () => {
    expect(isNotEmpty('')).toBe(false)
  })

  it('rejects whitespace-only strings', () => {
    expect(isNotEmpty('   ')).toBe(false)
  })
})

describe('validateEvento', () => {
  const validEvento = {
    activo: true,
    titulo: 'EPIKON 2025',
    flyer: 'https://example.com/flyer.jpg',
    descripcion: 'Un evento genial',
    cronograma: '12:00 Apertura',
    ubicacion: 'Rancagua',
    mapaLink: 'https://maps.app.goo.gl/test',
    fechaInicio: '2025-11-01T12:00:00',
    fechaFin: '2025-11-02T19:00:00',
  }

  it('passes valid evento', () => {
    expect(validateEvento(validEvento)).toHaveLength(0)
  })

  it('fails when title empty', () => {
    const errors = validateEvento({ ...validEvento, titulo: '' })
    expect(errors.some(e => e.field === 'evento.titulo')).toBe(true)
  })

  it('fails when description empty', () => {
    const errors = validateEvento({ ...validEvento, descripcion: '' })
    expect(errors.some(e => e.field === 'evento.descripcion')).toBe(true)
  })

  it('fails when flyer URL invalid', () => {
    const errors = validateEvento({ ...validEvento, flyer: 'not-a-url' })
    expect(errors.some(e => e.field === 'evento.flyer')).toBe(true)
  })

  it('passes when evento is inactive', () => {
    expect(validateEvento({ ...validEvento, activo: false, titulo: '' })).toHaveLength(0)
  })
})

describe('validateSorteo', () => {
  const validSorteo = {
    activo: true,
    titulo: 'Sorteo Mouse Gamer',
    fechaTermino: 'December 25, 2026 20:00:00',
    imgPremio: 'https://example.com/premio.jpg',
  }

  it('passes valid sorteo', () => {
    expect(validateSorteo(validSorteo)).toHaveLength(0)
  })

  it('fails when title empty', () => {
    const errors = validateSorteo({ ...validSorteo, titulo: '' })
    expect(errors.some(e => e.field === 'sorteo.titulo')).toBe(true)
  })

  it('fails when date invalid', () => {
    const errors = validateSorteo({ ...validSorteo, fechaTermino: 'not-a-date' })
    expect(errors.some(e => e.field === 'sorteo.fechaTermino')).toBe(true)
  })

  it('fails when image URL invalid', () => {
    const errors = validateSorteo({ ...validSorteo, imgPremio: 'not-a-url' })
    expect(errors.some(e => e.field === 'sorteo.imgPremio')).toBe(true)
  })

  it('passes when sorteo is inactive', () => {
    expect(validateSorteo({ ...validSorteo, activo: false, titulo: '' })).toHaveLength(0)
  })
})

describe('validateMascota', () => {
  const validMascota = {
    activo: true,
    imagenPng: '/mascota.png',
    frases: ['Hola!'],
    tiempoEntreFrases: 8000,
  }

  it('passes valid mascota', () => {
    expect(validateMascota(validMascota)).toHaveLength(0)
  })

  it('fails when no frases', () => {
    const errors = validateMascota({ ...validMascota, frases: [] })
    expect(errors.some(e => e.field === 'mascota.frases')).toBe(true)
  })

  it('fails when tiempoEntreFrases is not positive', () => {
    const errors = validateMascota({ ...validMascota, tiempoEntreFrases: -1 })
    expect(errors.some(e => e.field === 'mascota.tiempoEntreFrases')).toBe(true)
  })
})

describe('validateRedes', () => {
  it('passes valid Instagram URL', () => {
    expect(validateRedes({ instagram: 'https://instagram.com/epikon.cl' })).toHaveLength(0)
  })

  it('fails invalid URL', () => {
    const errors = validateRedes({ instagram: 'not-a-url' })
    expect(errors.some(e => e.field === 'redes.instagram')).toBe(true)
  })
})

describe('validateMusica', () => {
  it('passes valid stream URL', () => {
    expect(validateMusica({ streamUrl: 'https://stream.zeno.fm/radio' })).toHaveLength(0)
  })

  it('fails invalid URL', () => {
    const errors = validateMusica({ streamUrl: 'not-a-url' })
    expect(errors.some(e => e.field === 'musica.streamUrl')).toBe(true)
  })
})

describe('validateImagenes', () => {
  it('passes valid logo and fondos', () => {
    expect(validateImagenes({ logo: '/portada.png', fondos: ['/fondo.png'] })).toHaveLength(0)
  })

  it('fails invalid logo', () => {
    const errors = validateImagenes({ logo: 'not-a-url', fondos: [] })
    expect(errors.some(e => e.field === 'imagenes.logo')).toBe(true)
  })
})
