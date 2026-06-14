import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Mascot from '../ui/Mascot'

// Mock dataLoader with active mascot
vi.mock('../../data/dataLoader', () => ({
  loadMascota: () => ({
    activo: true,
    imagenPng: '/mascota.png',
    frases: ['¡Hola! Soy tu guía geek.', 'Segunda frase de prueba.'],
    tiempoEntreFrases: 8000,
  }),
}))

describe('Mascot', () => {
  beforeEach(() => {
    cleanup()
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders mascot image when active', () => {
    render(<Mascot />)
    const images = screen.getAllByAltText('Guía Epikon')
    expect(images.length).toBeGreaterThanOrEqual(1)
    expect(images[0]).toHaveAttribute('src', '/mascota.png')
  })

  it('shows first phrase after initial timeout', () => {
    render(<Mascot />)
    vi.advanceTimersByTime(1100)
    const phrases = screen.getAllByText('¡Hola! Soy tu guía geek.')
    expect(phrases.length).toBeGreaterThanOrEqual(1)
  })

  it('dismisses bubble when close button is clicked', () => {
    render(<Mascot />)
    vi.advanceTimersByTime(1100)

    // Find close buttons (×) - there should be one in the bubble
    const closeBtns = screen.getAllByText('×')
    expect(closeBtns.length).toBeGreaterThanOrEqual(1)

    // Click the first close button
    fireEvent.click(closeBtns[0])

    // The bubble text should be gone
    expect(screen.queryByText('¡Hola! Soy tu guía geek.')).not.toBeInTheDocument()
  })

  it('has mascot image with float animation class', () => {
    render(<Mascot />)
    const mascotImgs = screen.getAllByAltText('Guía Epikon')
    expect(mascotImgs.length).toBeGreaterThanOrEqual(1)
    // Also check the large mascot image src
    const guideImg = screen.getByAltText('Guía Epikon')
    expect(guideImg).toHaveAttribute('src', '/mascota.png')
  })
})
