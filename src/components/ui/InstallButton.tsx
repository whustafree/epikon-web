import { useEffect, useState } from 'react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  if (!deferredPrompt) return null

  return (
    <button
      onClick={handleInstall}
      className="hidden mx-auto my-5 bg-neon-pink text-white border-none px-5 py-2.5 rounded-[30px] font-bold animate-pulse-neon cursor-pointer"
      style={{ display: 'block' }}
    >
      <i className="fas fa-download" /> INSTALAR APP
    </button>
  )
}
