import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  
  // Mobile detection
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    // Hero Content Entrance
    tl.fromTo(titleRef.current.children,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    );

    // Float only 2 times then stop
    gsap.to('.pulse-btn', {
      y: -3,
      duration: 1.5,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 1
    });

    gsap.to('.shake-btn', {
      y: -2,
      duration: 1.8,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 1.2
    });

    // Floating animation
    gsap.to('.hero-float', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Button liquid animation
    gsap.to('.pulse-btn', {
      borderRadius: '50px 10px 50px 10px',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Button electric animation
    gsap.to('.shake-btn', {
      textShadow: '0 0 10px var(--primary)',
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, []);

  const heroStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(0.5rem, 3vw, 2rem)',
    paddingTop: 'clamp(4rem, 12vw, 6rem)',
    position: 'relative',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #a855f7 50%, #7c3aed 75%, #5b21b6 100%), repeating-linear-gradient(90deg, transparent 0px, rgba(255, 255, 255, 0.03) 1px, rgba(255, 255, 255, 0.03) 2px, transparent 3px, transparent 40px)',
    backgroundSize: '100% 100%, clamp(20px, 8vw, 40px) 100%',
    overflow: 'hidden'
  };

  const contentStyle = {
    textAlign: 'center',
    maxWidth: 'clamp(300px, 90vw, 800px)',
    zIndex: 2,
    width: '100%',
    padding: '0 clamp(0.5rem, 2vw, 1rem)'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 8vw, 5rem)',
    fontWeight: '700',
    lineHeight: 'clamp(1.1, 1.2, 1.3)',
    marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
    fontFamily: 'Fira Code, monospace',
    wordBreak: 'break-word'
  };

  const subtitleStyle = {
    fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)',
    color: 'var(--text-secondary)',
    marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)',
    lineHeight: 'clamp(1.4, 1.6, 1.8)',
    padding: '0 clamp(0.25rem, 1vw, 1rem)',
    maxWidth: '100%'
  };

  const ctaStyle = {
    display: 'flex',
    gap: 'clamp(0.5rem, 3vw, 1rem)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0 clamp(0.25rem, 1vw, 1rem)',
    flexDirection: isSmallMobile ? 'column' : 'row',
    alignItems: 'center'
  };

  const buttonStyle = {
    padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    border: 'none',
    fontWeight: '500',
    fontSize: 'clamp(13px, 3.5vw, 16px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(4px, 1.5vw, 8px)',
    transition: 'all 0.3s ease',
    minWidth: 'clamp(140px, 35vw, 180px)',
    minHeight: '44px',
    justifyContent: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'var(--primary)',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'transparent',
    color: 'var(--primary)',
    border: '2px solid var(--primary)'
  };

  return (
    <section id="home" ref={heroRef} style={heroStyle}>
      <div style={contentStyle}>
        <div ref={titleRef} style={titleStyle}>
          <div className="fade-slide-up">Creative</div>
          <div className="fade-slide-up" style={{ color: 'var(--primary)' }}>Developer</div>
          <div className="fade-slide-up">& Designer</div>
        </div>
        
        <p ref={subtitleRef} style={subtitleStyle} className="fade-slide-up">
          Crafting exceptional digital experiences with modern technologies and innovative design solutions
        </p>
        
        <div ref={ctaRef} style={ctaStyle}>
          <button 
            style={primaryButtonStyle} 
            className="magnetic card-3d pulse-btn"
            onMouseEnter={(e) => {
              gsap.to(e.target, { 
                scale: 1.1,
                rotation: 5,
                boxShadow: '0 10px 30px var(--primary)',
                duration: 0.3 
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { 
                scale: 1,
                rotation: 0,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                duration: 0.3 
              });
            }}
          >
            <FiDownload className="btn-icon" />
            Download Resume
          </button>
          <button 
            style={secondaryButtonStyle} 
            className="magnetic card-3d shake-btn"
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '#projects';
              }
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, { 
                scale: 1.1,
                skewX: -5,
                backgroundColor: 'var(--primary-dark)',
                duration: 0.3 
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { 
                scale: 1,
                skewX: 0,
                backgroundColor: 'transparent',
                duration: 0.3 
              });
            }}
          >
            View Projects
            <FiArrowRight className="btn-icon" />
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hero-float" style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '100px',
        height: '100px',
        background: 'var(--primary)',
        borderRadius: '50%',
        opacity: '0.1',
        zIndex: 1
      }}></div>
      
      <div className="hero-float" style={{
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        width: '60px',
        height: '60px',
        background: 'var(--primary)',
        borderRadius: '12px',
        opacity: '0.1',
        zIndex: 1,
        animationDelay: '1s'
      }}></div>
    </section>
  );
};

export default Hero;