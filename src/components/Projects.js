import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';

const Projects = () => {
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  
  // Mobile detection
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  const projects = [
    { 
      title: 'E-Commerce Website', 
      tech: 'MERN Stack, RazorPay', 
      color: '#8B5CF6',
      image: '/images/E commerce.png',
      description: 'Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.',
      demoUrl: 'https://crackershop.netlify.app',
      codeUrl: 'https://github.com/DhanaBalan2001/E-Commerce'
    },
    { 
      title: 'Restaurant Management', 
      tech: 'React, Node.js, MongoDB', 
      color: '#10B981',
      image: '/images/restarant.png',
      description: 'Restaurant management system with order tracking and inventory management.',
      demoUrl: 'https://restaurant-management-dhanabalan.netlify.app',
      codeUrl: 'https://github.com/DhanaBalan2001/Restaurant-management'
    },
    { 
      title: 'Blog App', 
      tech: 'React, API Integration', 
      color: '#F59E0B',
      image: '/images/BLOG.png',
      description: 'Modern blogging platform with rich text editor and user authentication.',
      demoUrl: 'https://blog-app-dhanabalank.netlify.app',
      codeUrl: 'https://github.com/DhanaBalan2001/Blog-Application'
    },
    { 
      title: 'Hotel Booking', 
      tech: 'React Native, Node.js', 
      color: '#EF4444',
      image: '/images/hotel.png',
      description: 'Hotel booking application with real-time availability and payment integration.',
      demoUrl: 'https://hotel-booking-dhanabalan.netlify.app',
      codeUrl: 'https://github.com/DhanaBalan2001/Hotel-Booking'
    },
    { 
      title: 'Expense Tracker', 
      tech: 'MERN Stack', 
      color: '#8B5CF6',
      image: '/images/Expense Tracker.jpg',
      description: 'Personal expense tracking app with budget management and analytics.',
      demoUrl: 'https://expense-tracker-dhanabalan.netlify.app',
      codeUrl: 'https://github.com/DhanaBalan2001/Expense-tracker'
    },
    { 
      title: 'AI Chat Bot', 
      tech: 'React, AI Integration', 
      color: '#F97316',
      image: '/images/ChatBot.png',
      description: 'AI-powered chatbot with natural language processing and smart responses.',
      demoUrl: 'https://ai-chatbot-dhanabalan.netlify.app',
      codeUrl: 'https://github.com/DhanaBalan2001/AIChatBot'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      setTimeout(() => {
        const carousel = document.querySelector('.carousel-container');
        gsap.fromTo(carousel, 
          { opacity: 0, scale: 0.9 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            ease: 'power2.out'
          }
        );
      }, 200);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Start new interval if autoplay is enabled and not loading
    if (isAutoPlay && !isLoading) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 3000);
    }
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlay, isLoading, projects.length]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  if (isLoading) {
    return (
      <section style={{
        minHeight: '100vh',
        padding: '6rem 2rem 4rem',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div className="boxLoading"></div>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'white',
            fontFamily: 'Fira Code, monospace',
            margin: 0,
            marginTop: '6rem'
          }}>Loading Projects...</h2>
        </div>
        <style>{`
          .boxLoading {
            width: 50px;
            height: 50px;
            margin: auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
          .boxLoading:before {
            content: '';
            width: 50px;
            height: 5px;
            background: #000;
            opacity: 0.1;
            position: absolute;
            top: 59px;
            left: 0;
            border-radius: 50%;
            animation: shadow .5s linear infinite;
          }
          .boxLoading:after {
            content: '';
            width: 50px;
            height: 50px;
            background: white;
            animation: animate .5s linear infinite;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 3px;
          }
          @keyframes animate {
            17% {
              border-bottom-right-radius: 3px;
            }
            25% {
              transform: translateY(9px) rotate(22.5deg);
            }
            50% {
              transform: translateY(18px) scale(1, .9) rotate(45deg);
              border-bottom-right-radius: 40px;
            }
            75% {
              transform: translateY(9px) rotate(67.5deg);
            }
            100% {
              transform: translateY(0) rotate(90deg);
            }
          }
          @keyframes shadow {
            0%, 100% {
              transform: scale(1, 1);
            }
            50% {
              transform: scale(1.2, 1);
            }
          }
        `}</style>
      </section>
    );
  }

  const fadeInStyle = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  return (
    <section style={{
      minHeight: '100vh',
      padding: '6rem 2rem 4rem',
      background: 'var(--bg-secondary)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="projects-section" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'white',
          fontFamily: 'Fira Code, monospace',
          marginBottom: '1rem',
          paddingTop: window.innerWidth <= 768 ? '2rem' : '0'
        }}>Featured Projects</h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>Swipe through my latest work</p>
      </div>
      
      <div ref={containerRef} className="carousel-container" style={{
        maxWidth: 'clamp(300px, 90vw, 800px)',
        margin: '0 auto',
        position: 'relative',
        padding: isSmallMobile ? '0 30px' : isMobile ? '0 50px' : '0 80px'
      }}>
        {/* Main Carousel */}
        <div 
          style={{
            position: 'relative',
            height: 'clamp(300px, 60vw, 400px)',
            borderRadius: 'clamp(12px, 4vw, 20px)',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            touchAction: 'pan-y pinch-zoom'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Image */}
          <div 
            key={`image-${currentIndex}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              animation: 'fadeIn 1.2s ease-in-out 0.3s forwards'
            }}>
            <img 
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, rgba(0,0,0,0.8), ${projects[currentIndex].color}40)`
            }} />
          </div>

          {/* Content Overlay */}
          <div 
            key={`content-${currentIndex}`}
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: 'clamp(1rem, 4vw, 2rem)',
              opacity: 0,
              animation: 'fadeIn 1.2s ease-in-out 0.5s forwards'
            }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '6px',
                  height: '40px',
                  background: projects[currentIndex].color,
                  borderRadius: '3px'
                }} />
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 5vw, 2rem)',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                  fontFamily: 'Fira Code, monospace',
                  lineHeight: '1.2'
                }}>{projects[currentIndex].title}</h3>
              </div>
              
              <p style={{
                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                color: projects[currentIndex].color,
                fontWeight: '600',
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
              }}>{projects[currentIndex].tech}</p>

              <p style={{
                fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 'clamp(1.4, 1.5, 1.6)',
                marginBottom: 'clamp(1rem, 4vw, 2rem)',
                maxWidth: isMobile ? '100%' : '450px'
              }}>{projects[currentIndex].description}</p>

              <div style={{
                display: 'flex',
                gap: 'clamp(0.8rem, 3vw, 1.5rem)',
                flexDirection: isSmallMobile ? 'column' : 'row',
                alignItems: isSmallMobile ? 'stretch' : 'center'
              }}>
                <a
                  href={projects[currentIndex].demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: isMobile ? '4px 8px' : 'clamp(10px, 3vw, 12px) clamp(16px, 4vw, 24px)',
                    borderRadius: isMobile ? '4px' : 'clamp(8px, 2vw, 12px)',
                    background: projects[currentIndex].color,
                    color: 'white',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: isMobile ? '9px' : 'clamp(12px, 3vw, 14px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '2px' : 'clamp(4px, 2vw, 8px)',
                    transition: 'all 0.3s ease',
                    minHeight: isMobile ? '24px' : '44px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      boxShadow: `0 15px 40px ${projects[currentIndex].color}50`,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      boxShadow: 'none',
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                >
                  <FiExternalLink size={isMobile ? 12 : 20} />
                  Live Demo
                </a>
                <a
                  href={projects[currentIndex].codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: isMobile ? '4px 8px' : 'clamp(10px, 3vw, 12px) clamp(16px, 4vw, 24px)',
                    borderRadius: isMobile ? '4px' : 'clamp(8px, 2vw, 12px)',
                    border: `${isMobile ? '1px' : '2px'} solid ${projects[currentIndex].color}`,
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: isMobile ? '9px' : 'clamp(12px, 3vw, 14px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isMobile ? '2px' : 'clamp(4px, 2vw, 8px)',
                    transition: 'all 0.3s ease',
                    minHeight: isMobile ? '24px' : '44px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      background: projects[currentIndex].color,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      background: 'rgba(255,255,255,0.1)',
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                >
                  <FiGithub size={isMobile ? 12 : 20} />
                  View Code
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Arrows - Outside the card */}
        <button
          onClick={prevProject}
          style={{
            position: 'absolute',
            left: isSmallMobile ? '-25px' : isMobile ? '-40px' : '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(40px, 10vw, 50px)',
            height: 'clamp(40px, 10vw, 50px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 3,
            minHeight: '44px',
            minWidth: '44px'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              background: 'rgba(255,255,255,0.3)',
              scale: 1.1,
              duration: 0.2,
              ease: 'power2.out'
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              background: 'rgba(255,255,255,0.2)',
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          }}
        >
          <FiChevronLeft size={24} color="white" />
        </button>

        <button
          onClick={nextProject}
          style={{
            position: 'absolute',
            right: isSmallMobile ? '-25px' : isMobile ? '-40px' : '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(40px, 10vw, 50px)',
            height: 'clamp(40px, 10vw, 50px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 3,
            minHeight: '44px',
            minWidth: '44px'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              background: 'rgba(255,255,255,0.3)',
              scale: 1.1,
              duration: 0.2,
              ease: 'power2.out'
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              background: 'rgba(255,255,255,0.2)',
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          }}
        >
          <FiChevronRight size={24} color="white" />
        </button>

        {/* Dots Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '0.5rem' : '1rem',
          marginTop: '2rem'
        }}>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: currentIndex === index ? (isMobile ? '16px' : '40px') : (isMobile ? '8px' : '12px'),
                height: isMobile ? '8px' : '12px',
                borderRadius: isMobile ? '4px' : '6px',
                border: 'none',
                background: currentIndex === index ? projects[currentIndex].color : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
          
          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            style={{
              marginLeft: '0.5rem',
              background: isAutoPlay ? projects[currentIndex].color : 'rgba(255,255,255,0.15)',
              border: `1px solid ${isAutoPlay ? projects[currentIndex].color : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '8px',
              width: isMobile ? '32px' : '40px',
              height: isMobile ? '20px' : '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: 'white',
              padding: 0,
              backdropFilter: 'blur(10px)',
              boxShadow: isAutoPlay ? `0 2px 8px ${projects[currentIndex].color}40` : 'none'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                background: isAutoPlay ? projects[currentIndex].color : 'rgba(255,255,255,0.25)',
                duration: 0.2
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                background: isAutoPlay ? projects[currentIndex].color : 'rgba(255,255,255,0.15)',
                duration: 0.2
              });
            }}
          >
            {isAutoPlay ? <FiPause size={isMobile ? 8 : 10} /> : <FiPlay size={isMobile ? 8 : 10} />}
          </button>
        </div>
      </div>
      <style>{`
        ${fadeInStyle}
        .auto-play-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default Projects;