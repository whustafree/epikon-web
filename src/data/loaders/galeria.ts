import { config } from '../config'
import { getData, hasAdminData } from './cache'

export function loadGaleriaActual(): string[] {
  const data = getData()
  if (hasAdminData()) return data?.galeriaActual ?? []
  return config.social.galeriaCompleta.actual
}

export function loadGaleriaAnterior(): string[] {
  const data = getData()
  if (hasAdminData()) return data?.galeriaAnterior ?? []
  return config.social.galeriaCompleta.anterior
}
