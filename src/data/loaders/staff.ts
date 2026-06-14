import { config, type Miembro, type FAQ } from '../config'
import { getData, hasAdminData } from './cache'

export function loadEquipo(): Miembro[] {
  const data = getData()
  if (hasAdminData()) return data?.equipo ?? []
  return config.social.equipo.miembros.filter(m => m.activo)
}

export function loadFaq(): FAQ[] {
  const data = getData()
  if (hasAdminData()) return data?.faq ?? []
  return config.social.infoComunidad.faq
}
