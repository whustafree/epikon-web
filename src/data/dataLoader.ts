import { config, type Evento, type Miembro, type FAQ } from './config'
import { adminStore } from './adminStore'

let cachedData: ReturnType<typeof adminStore.load> | null = null

function getData() {
  if (!cachedData) {
    try {
      cachedData = adminStore.load()
    } catch {
      cachedData = null
    }
  }
  return cachedData
}

export function loadEvento(): Evento {
  const data = getData()
  return data?.evento ?? config.evento
}

export function loadEquipo(): Miembro[] {
  const data = getData()
  if (data?.equipo && data.equipo.length > 0) return data.equipo
  return config.social.equipo.miembros.filter(m => m.activo)
}

export function loadFaq(): FAQ[] {
  const data = getData()
  if (data?.faq && data.faq.length > 0) return data.faq
  return config.social.infoComunidad.faq
}

export function loadGaleriaActual(): string[] {
  const data = getData()
  if (data?.galeriaActual && data.galeriaActual.length > 0) return data.galeriaActual
  return config.social.galeriaCompleta.actual
}

export function loadGaleriaAnterior(): string[] {
  const data = getData()
  if (data?.galeriaAnterior && data.galeriaAnterior.length > 0) return data.galeriaAnterior
  return config.social.galeriaCompleta.anterior
}

// Clear cache so next loads get fresh data
export function clearDataCache() {
  cachedData = null
}
