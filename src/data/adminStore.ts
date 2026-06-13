import { config, type Miembro, type FAQ, type Evento } from './config'

const STORAGE_KEY = 'epikon-admin-data'

interface AdminData {
  evento: Evento
  equipo: Miembro[]
  faq: FAQ[]
  galeriaActual: string[]
  galeriaAnterior: string[]
}

function loadData(): AdminData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  // Default from config
  return {
    evento: { ...config.evento },
    equipo: config.social.equipo.miembros.filter(m => m.activo),
    faq: [...config.social.infoComunidad.faq],
    galeriaActual: [...config.social.galeriaCompleta.actual],
    galeriaAnterior: [...config.social.galeriaCompleta.anterior],
  }
}

function saveData(data: AdminData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const adminStore = {
  load: loadData,
  save: saveData,
  clear: () => localStorage.removeItem(STORAGE_KEY),
}
