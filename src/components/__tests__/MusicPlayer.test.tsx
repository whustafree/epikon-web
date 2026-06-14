import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import MusicPlayer from '../ui/MusicPlayer'

// Mock dataLoader
vi.mock('../../data/dataLoader', () => ({
  loadMusica: () => ({ streamUrl: 'https://stream.test/radio' }),
}))

describe('MusicPlayer', () => {
  beforeEach(() => {
    cleanup()
    // Mock HTMLAudioElement
    HTMLAudioElement.prototype.play = vi.fn(() => Promise.resolve())
    HTMLAudioElement.prototype.pause = vi.fn()
    Object.defineProperty(HTMLAudioElement.prototype, 'paused', {
      get: () => true,
      configurable: true,
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('renders with LOFI label and play icon', () => {
    render(<MusicPlayer />)
    const lofiLabels = screen.getAllByText('LOFI')
    expect(lofiLabels.length).toBeGreaterThanOrEqual(1)
    const playIcon = document.querySelector('.fa-play')
    expect(playIcon).toBeInTheDocument()
    const discIcon = document.querySelector('.fa-compact-disc')
    expect(discIcon).toBeInTheDocument()
  })

  it('has a minimize button', () => {
    render(<MusicPlayer />)
    const compressIcon = document.querySelector('.fa-compress-alt')
    expect(compressIcon).toBeInTheDocument()
  })

  it('minimizes when compress button is clicked', () => {
    render(<MusicPlayer />)
    const minimizeBtn = document.querySelector('.minimize-btn')
    expect(minimizeBtn).toBeInTheDocument()

    if (minimizeBtn) {
      // Click the minimize button
      fireEvent.click(minimizeBtn)
      // After minimize, the text/button block unmounts (conditional render)
      expect(document.querySelector('.minimize-btn')).toBeNull()
      expect(screen.queryByText('LOFI')).not.toBeInTheDocument()
      // The disc icon should still be there
      expect(document.querySelector('.fa-compact-disc')).toBeInTheDocument()
    }
  })

  it('audio element has correct src', () => {
    render(<MusicPlayer />)
    const audio = document.querySelector('audio')
    expect(audio).toBeInTheDocument()
    expect(audio?.getAttribute('src')).toBe('https://stream.test/radio')
  })
})
