import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const aboutRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  
  // Mobile detection
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  useEffect(() => {
    // Profile Avatar Animation
    gsap.fromTo(imageRef.current,
      { 
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0
      },
      {
        clipPath: 'circle(100% at 50% 50%)',
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%'
        }
      }
    );

    // About text fade from left
    gsap.fromTo(contentRef.current.children,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%'
        }
      }
    );

    // Floating avatar animation
    gsap.to('.avatar-float', {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, []);

  const sectionStyle = {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)',
    background: 'var(--bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
    gap: 'clamp(2rem, 6vw, 4rem)',
    maxWidth: '1200px',
    width: '100%',
    alignItems: 'center',
    textAlign: window.innerWidth <= 768 ? 'center' : 'left'
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const avatarStyle = {
    width: 'clamp(200px, 40vw, 300px)',
    height: 'clamp(200px, 40vw, 300px)',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(80px, 15vw, 120px)',
    color: 'white',
    boxShadow: '0 clamp(10px, 4vw, 20px) clamp(20px, 8vw, 40px) var(--shadow)',
    border: 'clamp(2px, 1vw, 4px) solid var(--border)',
    margin: window.innerWidth <= 768 ? '0 auto' : '0'
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 3vw, 1.5rem)',
    maxWidth: '100%'
  };

  const titleStyle = {
    fontSize: 'clamp(1.8rem, 6vw, 3rem)',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    fontFamily: 'Fira Code, monospace',
    marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
  };

  const textStyle = {
    fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
    color: 'var(--text-secondary)',
    lineHeight: 'clamp(1.5, 1.6, 1.8)',
    maxWidth: '100%'
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : 'repeat(3, 1fr)',
    gap: 'clamp(0.8rem, 2vw, 1rem)',
    marginTop: 'clamp(1.5rem, 4vw, 2rem)',
    maxWidth: window.innerWidth <= 768 ? '400px' : '100%',
    margin: window.innerWidth <= 768 ? 'clamp(1.5rem, 4vw, 2rem) auto 0' : 'clamp(1.5rem, 4vw, 2rem) 0 0'
  };

  const statItemStyle = {
    textAlign: 'center',
    padding: 'clamp(0.8rem, 3vw, 1.2rem)',
    background: 'rgba(94, 91, 99, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid var(--border)',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    minHeight: 'clamp(80px, 15vw, 100px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  return (
    <section id="about" ref={aboutRef} style={sectionStyle}>
      <div style={containerStyle}>
        <div ref={imageRef} style={imageContainerStyle}>
          <div className="avatar-float" style={avatarStyle}>
            <div style={{
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(40px, 8vw, 60px)',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'Arial, sans-serif'
            }}>
              DB
            </div>
          </div>
        </div>
        
        <div ref={contentRef} style={contentStyle}>
          <h2 style={titleStyle}>About Me</h2>
          
          <p style={textStyle}>
            I'm a passionate full-stack developer with expertise in modern web technologies. 
            I love creating innovative solutions and bringing ideas to life through code.
          </p>
          
          <p style={textStyle}>
            With a strong foundation in both frontend and backend development, I specialize 
            in building scalable applications using React, Node.js, and modern frameworks.
          </p>
          
          <p style={textStyle}>
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or sharing knowledge with the developer community.
          </p>
          
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                1
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Year Experience
              </p>
            </div>
            
            <div style={statItemStyle}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                5+
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Projects Done
              </p>
            </div>
            
            <div style={statItemStyle}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                100%
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;