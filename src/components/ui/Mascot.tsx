import { useState, useEffect, useCallback } from 'react'
import { loadMascota } from '../../data/dataLoader'

export default function Mascot() {
  const [dismissed, setDismissed] = useState(false)
  const [text, setText] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)

  const m = loadMascota()

  const cyclePhrase = useCallback(() => {
    if (dismissed) return
    setShowBubble(false)
    setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % m.frases.length)
      setShowBubble(true)
    }, 1000)
  }, [dismissed, m.frases.length])

  useEffect(() => {
    if (!m.activo) return
    setText(m.frases[0])
    setTimeout(() => setShowBubble(true), 1000)

    if (m.frases.length > 1) {
      const interval = setInterval(cyclePhrase, m.tiempoEntreFrases)
      return () => clearInterval(interval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setText(m.frases[phraseIndex])
  }, [phraseIndex, m.frases])

  if (!m.activo) return null

  // Restore button (small circle)
  if (dismissed) {
    return (
      <button
        onClick={() => { setDismissed(false); setShowBubble(true) }}
        className="fixed bottom-[150px] right-[10px] z-[1900] w-[50px] h-[50px] bg-bg-card border-2 border-neon-cyan rounded-full flex items-center justify-center cursor-pointer p-0 overflow-hidden"
        style={{ boxShadow: '0 0 15px #00ffcc' }}
      >
        <img src={m.imagenPng} alt="Mascota" className="w-full h-full object-cover" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-[150px] right-[15px] z-[1900] flex flex-col items-end transition-transform duration-300 pointer-events-none">
      {/* Bubble */}
      <div
        className={`pointer-events-auto relative mb-2.5 bg-bg-card border-2 border-neon-cyan text-white px-3.5 py-2.5 rounded-2xl rounded-br-none max-w-[200px] text-sm text-right shadow-lg transition-all duration-500 ${
          showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <span>{text}</span>
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2.5 -right-2.5 bg-neon-pink text-white w-5 h-5 rounded-full text-xs flex items-center justify-center cursor-pointer border-none font-bold"
        >
          ×
        </button>
      </div>
      {/* Mascot image */}
      <img
        src={m.imagenPng}
        alt="Guía Epikon"
        className="w-[120px] h-auto animate-float-mascot pointer-events-auto cursor-help"
      />
    </div>
  )
}
