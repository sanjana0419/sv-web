import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import HeroSection from './components/HeroSection';
import Dashboard from './components/Dashboard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

function App() {
  const [loggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const renderPage = () => {
    if (!loggedIn) return <HeroSection />;
    if (currentPage === 'dashboard') return <Dashboard onNavigate={setCurrentPage} />;
    return <HomePage onNavigate={setCurrentPage} />;
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;
