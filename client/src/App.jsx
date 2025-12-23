import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import SimpleAdmin from './components/SimpleAdmin';
import NotificationSection from './components/NotificationSection';
import Footer from './components/Footer';
import './styles/sparkles-theme.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <NotificationSection />
          </Layout>
        } />

        {/* Dedicated admin portal */}
        <Route path="/admin" element={<SimpleAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;