import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import CommunityPage from './pages/CommunityPage'
import GalleryPage from './pages/GalleryPage'
import PostulacionPage from './pages/PostulacionPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comunidad" element={<CommunityPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/postulacion" element={<PostulacionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
