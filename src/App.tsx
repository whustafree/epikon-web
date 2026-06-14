import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import CommunityPage from './pages/CommunityPage'
import GalleryPage from './pages/GalleryPage'
import PostulacionPage from './pages/PostulacionPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comunidad" element={<CommunityPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/postulacion" element={<PostulacionPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  )
}
