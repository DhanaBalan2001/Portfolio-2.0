import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiSun, FiMoon, FiHome, FiUser, FiCode, FiFolder, FiMail, FiAward } from 'react-icons/fi';

const Navbar = ({ isDark, toggleTheme, isLoading }) => {
  const navRef = useRef();

  useEffect(() => {
    if (!isLoading) {
      // Simple entrance animation only after loading
      gsap.fromTo(navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' }
      );
      
      // Continuous glow animation
      gsap.to(navRef.current, {
        boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
      
      // Continuous icon animations
      const icons = navRef.current.querySelectorAll('.nav-icon');
      icons.forEach((icon, index) => {
        // Continuous pulse for each icon
        gsap.to(icon, {
          scale: 1.05,
          duration: 1.5 + index * 0.2,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });
        
        // Hover animations
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.3,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }
  }, [isLoading]);

  const navStyle = {
    position: 'fixed',
    top: 'clamp(8px, 2vw, 15px)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    padding: 'clamp(4px, 1vw, 8px) clamp(6px, 1.5vw, 12px)',
    borderRadius: 'clamp(20px, 5vw, 40px)',
    backdropFilter: 'blur(clamp(15px, 4vw, 30px))',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    display: isLoading ? 'none' : 'flex',
    alignItems: 'center',
    gap: 'clamp(4px, 1.5vw, 12px)',
    boxShadow: '0 clamp(5px, 2vw, 10px) clamp(10px, 4vw, 20px) rgba(139, 92, 246, 0.15)',
    maxWidth: 'clamp(300px, 90vw, 600px)',
    width: 'auto',
    overflow: 'hidden'
  };

  const iconStyle = {
    color: 'var(--text-primary)',
    fontSize: 'clamp(12px, 3vw, 16px)',
    cursor: 'pointer',
    padding: 'clamp(4px, 1vw, 8px)',
    borderRadius: '50%',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'clamp(32px, 8vw, 40px)',
    minHeight: 'clamp(32px, 8vw, 40px)',
    textDecoration: 'none'
  };

  const themeButtonStyle = {
    background: 'var(--primary)',
    border: 'none',
    borderRadius: '50%',
    width: 'clamp(32px, 8vw, 40px)',
    height: 'clamp(32px, 8vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: '0 clamp(2px, 1vw, 4px) clamp(5px, 2vw, 10px) rgba(139, 92, 246, 0.3)',
    fontSize: 'clamp(12px, 3vw, 16px)'
  };

  const handleNavigation = (path) => {
    if (path !== '/') {
      sessionStorage.setItem('visitedOtherPage', 'true');
    }
  };

  return (
    <nav ref={navRef} style={navStyle} className="glass">
      <Link to="/" style={iconStyle} className="nav-icon" title="Home">
        <FiHome size={16} />
      </Link>
      <Link to="/about" style={iconStyle} className="nav-icon" title="About" onClick={() => handleNavigation('/about')}>
        <FiUser size={16} />
      </Link>
      <Link to="/skills" style={iconStyle} className="nav-icon" title="Skills" onClick={() => handleNavigation('/skills')}>
        <FiCode size={16} />
      </Link>
      <Link to="/projects" style={iconStyle} className="nav-icon" title="Projects" onClick={() => handleNavigation('/projects')}>
        <FiFolder size={16} />
      </Link>
      <Link to="/certifications" style={iconStyle} className="nav-icon" title="Certifications" onClick={() => handleNavigation('/certifications')}>
        <FiAward size={16} />
      </Link>
      <Link to="/contact" style={iconStyle} className="nav-icon" title="Contact" onClick={() => handleNavigation('/contact')}>
        <FiMail size={16} />
      </Link>
      
      <button 
        onClick={toggleTheme} 
        style={themeButtonStyle}
        className="nav-icon"
        title={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>
    </nav>
  );
};

export default Navbar;