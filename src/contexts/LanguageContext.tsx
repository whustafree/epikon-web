import { createContext, useContext, useState, type ReactNode } from 'react'
import { t as translate, type Locale } from '../data/translations'

const STORAGE_KEY = 'epikon-locale'

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') return stored
  } catch {}
  return 'es'
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'es',
  setLocale: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }

  const tFn = (key: string, fallback?: string) => translate(locale, key, fallback)

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: tFn }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
