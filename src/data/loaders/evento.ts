import { config, type Evento } from '../config'
import { getData } from './cache'

export function loadEvento(): Evento {
  const data = getData()
  return data?.evento ?? config.evento
}
