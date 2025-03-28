import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from './components/layout/PageTransition'

// Pages
import HomePage from '@/pages/HomePage'
import SchedulePage from '@/pages/SchedulePage'
import VenuesPage from './pages/VenuesPage'
import AboutPage from '@/pages/AboutPage'
import GalleryPage from '@/pages/GalleryPage'

function App() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/Cele-Arrabal" 
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              } 
            />
            <Route 
              path="/Cele-Arrabal/schedule" 
              element={
                <PageTransition>
                  <SchedulePage />
                </PageTransition>
              } 
            />
            <Route 
              path="/Cele-Arrabal/venues" 
              element={
                <PageTransition>
                  <VenuesPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/Cele-Arrabal/gallery" 
              element={
                <PageTransition>
                  <GalleryPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/Cele-Arrabal/about" 
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App