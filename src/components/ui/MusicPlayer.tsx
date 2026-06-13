import { useState, useRef, useCallback } from 'react'
import { loadMusica } from '../../data/dataLoader'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const musica = loadMusica()

  const toggle = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.minimize-btn')) return
    if (minimized) {
      setMinimized(false)
      return
    }
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }, [minimized])

  const toggleSize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setMinimized((prev) => !prev)
  }, [])

  return (
    <div
      onClick={toggle}
      className={`fixed bottom-[85px] right-5 z-[90] bg-black/80 border border-neon-cyan rounded-[50px] flex items-center gap-2.5 backdrop-blur-sm cursor-pointer transition-all duration-300 overflow-hidden ${
        minimized ? 'w-[45px] p-2.5 justify-center' : 'px-2.5 py-2 max-w-[300px]'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') toggle(e as unknown as React.MouseEvent) }}
    >
      <i
        className={`fas fa-compact-disc text-neon-cyan text-2xl min-w-[24px] ${
          playing ? 'animate-spin-slow' : ''
        }`}
      />
      {!minimized && (
        <>
          <span className="text-xs font-bold">LOFI</span>
          <i className={`fas ${playing ? 'fa-pause' : 'fa-play'} text-xs ml-1`} />
          <button
            onClick={toggleSize}
            className="minimize-btn bg-none border-none text-gray-400 cursor-pointer text-xs hover:text-white ml-1"
          >
            <i className="fas fa-compress-alt" />
          </button>
        </>
      )}
      <audio ref={audioRef} src={musica.streamUrl} preload="none" />
    </div>
  )
}
