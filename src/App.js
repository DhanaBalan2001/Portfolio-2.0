import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './responsive.css';
import './mobile-enhancements.css';
import HuluIntro from './components/HuluIntro';
import MobileLoader from './components/MobileLoader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ResumePage from './pages/ResumePage';
import CertificationsPage from './pages/CertificationsPage';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    // Only show intro on home page and first visit
    return location.pathname === '/' && !sessionStorage.getItem('visitedOtherPage');
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only set loading if on home page and not a return visit
    if (location.pathname === '/' && !sessionStorage.getItem('visitedOtherPage')) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  const handleRevealComplete = () => {
    setIsLoading(false);
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!isLoading) {
      // Ensure continuous animations after loading
      ScrollTrigger.refresh();
      
      // Add global continuous animations only if elements exist
      const fadeElements = document.querySelectorAll('.fade-slide-up');
      if (fadeElements.length > 0) {
        gsap.to('.fade-slide-up', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        });
      }
    }
  }, [isLoading]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`app ${isDark ? 'dark' : 'light'} ${isLoading ? 'loading' : ''}`}>
      {isLoading && !isMobile && <HuluIntro onComplete={handleRevealComplete} />}
      {isLoading && isMobile && <MobileLoader onComplete={handleRevealComplete} />}
      
      <Navbar isDark={isDark} toggleTheme={toggleTheme} isLoading={isLoading} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;