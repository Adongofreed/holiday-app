import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import NotificationSection from './components/NotificationSection';
import SimpleAdmin from './components/SimpleAdmin';
import './styles/global.css';
import './styles/animations.css';
import './styles/components.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main App Route */}
        <Route path="/" element={
          <Layout>
            <HeroSection />
            <GallerySection />
            <NotificationSection />
          </Layout>
        } />
        
        {/* Admin Route - Using SimpleAdmin */}
        <Route path="/admin" element={<SimpleAdmin />} />
        
        {/* Redirect all other routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;