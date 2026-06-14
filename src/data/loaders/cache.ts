import { adminStore } from '../adminStore'

let cachedData: ReturnType<typeof adminStore.load> | null = null

export function getData() {
  if (!cachedData) {
    try {
      cachedData = adminStore.load()
    } catch {
      cachedData = null
    }
  }
  return cachedData
}

export function hasAdminData(): boolean {
  try {
    return localStorage.getItem('epikon-admin-data') !== null
  } catch {
    return false
  }
}

export function clearDataCache() {
  cachedData = null
}
