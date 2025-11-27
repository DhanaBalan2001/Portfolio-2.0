import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiAward, FiCalendar, FiHash } from 'react-icons/fi';
import CertificateModal from './CertificateModal';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const containerRef = useRef();
  const timelineRef = useRef();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateClick = (cert) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    if (timelineRef.current) {
      timelineRef.current.resume();
    }
  };

  const certifications = [
    {
      title: 'Full Stack Development',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: 'kmsh63q03196877nx8',
      certificateFile: '/images/full-stack-certificate.pdf',
      skills: [ 'Full Stack(MERN)'],
    },
    {
      title: 'HTML5',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: '88673hqo07b3vGO1H9',
      certificateFile: '/images/html5-certificate.pdf',
      skills: ['HTML'],
    },
    {
      title: 'CSS3',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: 'f77E3l4968hQU8130N',
      certificateFile: '/images/css3-certificate.pdf',
      skills: ['CSS'],
    },
    {
      title: 'Bootstrap',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: '6M10897xK1E3367Fd8',
      certificateFile: '/images/bootstrap-certificate.pdf',
      skills: ['Bootstrap'],
    },
    {
      title: 'JavaScript',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: 'e88A7H26D8137B3k90',
      certificateFile: '/images/javascript-certificate.pdf',
      skills: ['JavaScript'],
    },
    {
      title: 'Reactjs',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: '38Pnf693g0768pH17N',
      certificateFile: '/images/reactjs-certificate.pdf',
      skills: ['Reactjs'],
    },
    {
      title: 'Node.js',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: '1393170M8mQ86z7FWH',
      certificateFile: '/images/nodejs-certificate.pdf',
      skills: ['Node.js'],
    },
    {
      title: 'MongoDB',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: '8938o0j1cL3Dg77z06',
      certificateFile: '/images/mongodb-certificate.pdf',
      skills: ['MongoDB'],
    },
    {
      title: 'MySQL',
      organization: 'GUVI Geek Networks',
      dateIssued: 'Nov 2024',
      certificateId: '9378276h3kQ0Ka9C18',
      certificateFile: '/images/mysql-certificate.pdf',
      skills: ['MySQL'],
    }
  ];

  useEffect(() => {
    const horizontalCards = gsap.utils.toArray('.horizontal-card');
    const verticalCards = gsap.utils.toArray('.vertical-card');
    const bottomCards = gsap.utils.toArray('.bottom-card');
    const horizontalLines = gsap.utils.toArray('.horizontal-line');
    const verticalLine = document.querySelector('.vertical-line');
    const secondVerticalLine = document.querySelector('.second-vertical-line');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
    
    timelineRef.current = tl;

    // Animate first 4 cards horizontally
    horizontalCards.forEach((card, index) => {
      if (index === 0) {
        tl.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
        );
      } else {
        // Add horizontal line first
        tl.fromTo(horizontalLines[index - 1],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '+=0.1'
        );
        // Then add card
        tl.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
          '+=0.1'
        );
        
        // Auto scroll after 4th certificate (desktop only)
        if (index === 3 && window.innerWidth > 768) {
          tl.call(() => {
            window.scrollTo({
              top: window.scrollY + 300,
              behavior: 'smooth'
            });
          });
        }
      }
    });

    // Add vertical line from 4th card
    if (verticalLine) {
      tl.fromTo(verticalLine,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5, ease: 'power2.out' },
        '+=0.2'
      );
    }

    // Animate remaining cards horizontally (right to left)
    const bottomLines = gsap.utils.toArray('.bottom-horizontal-line');
    verticalCards.forEach((card, index) => {
      // Add card first
      tl.fromTo(card,
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
        '+=0.1'
      );
      
      // Auto scroll after 8th certificate (index 3 in this array = 8th overall) (desktop only)
      if (index === 3 && window.innerWidth > 768) {
        tl.call(() => {
          window.scrollTo({
            top: window.scrollY + 300,
            behavior: 'smooth'
          });
        });
      }
      
      // Then add line if not last card
      if (bottomLines[index]) {
        tl.fromTo(bottomLines[index],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '+=0.1'
        );
      }
    });

    // Add second vertical line from 8th card
    if (secondVerticalLine) {
      tl.fromTo(secondVerticalLine,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5, ease: 'power2.out' },
        '+=0.2'
      );
    }

    // Animate bottom row cards (left to right)
    const thirdRowLines = gsap.utils.toArray('.third-row-line');
    bottomCards.forEach((card, index) => {
      // Add card first
      tl.fromTo(card,
        { opacity: 0, x: -50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
        '+=0.1'
      );
      
      // Final scroll after last certificate (desktop only)
      if (index === bottomCards.length - 1 && window.innerWidth > 768) {
        tl.call(() => {
          window.scrollTo({
            top: window.scrollY + 400,
            behavior: 'smooth'
          });
        });
      }
      
      // Then add line if not last card
      if (thirdRowLines[index]) {
        tl.fromTo(thirdRowLines[index],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '+=0.1'
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem) clamp(2rem, 6vw, 4rem)',
      background: 'var(--bg-secondary)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="certifications-section" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'white',
          fontFamily: 'Fira Code, monospace',
          marginBottom: '1rem',
          paddingTop: window.innerWidth <= 768 ? '2rem' : '0'
        }}>Certifications</h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>Professional certifications and achievements in web development</p>
      </div>

      <div ref={containerRef} style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Mobile Grid Layout */}
        <div className="mobile-cert-grid" style={{
          display: 'none'
        }}>
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="mobile-cert-card"
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                flexDirection: 'column',
                animation: `flipIn 0.7s ease-out ${index * 0.1}s both`
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.8rem'
              }}>
                <FiAward size={16} color="var(--primary)" />
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#333',
                  margin: 0,
                  lineHeight: '1.2'
                }}>{cert.title}</h3>
              </div>

              <p style={{
                fontSize: '0.8rem',
                color: 'var(--primary)',
                fontWeight: '600',
                marginBottom: '0.4rem'
              }}>{cert.organization}</p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginBottom: '0.8rem'
              }}>
                <FiCalendar size={10} color="#666" />
                <span style={{
                  fontSize: '0.7rem',
                  color: '#666'
                }}>{cert.dateIssued}</span>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.3rem',
                marginBottom: '1rem'
              }}>
                {cert.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} style={{
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: 'var(--primary)',
                    borderRadius: '8px',
                    fontSize: '0.6rem',
                    fontWeight: '500'
                  }}>{skill}</span>
                ))}
              </div>

              <button
                onClick={() => handleCertificateClick(cert)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.5rem 0.8rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  marginTop: 'auto',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <FiExternalLink size={12} />
                View Certificate
              </button>
            </div>
          ))}
        </div>
        {/* Desktop Timeline Layout */}
        <div className="desktop-cert-layout">
        {/* Horizontal Timeline - First 4 cards */}
        <div className="certificate-timeline" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 3vw, 2rem)',
          marginBottom: 'clamp(1rem, 4vw, 2rem)',
          flexWrap: 'wrap',
          padding: '0 clamp(0.5rem, 2vw, 1rem)'
        }}>
          {certifications.slice(0, 4).map((cert, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Certificate Card */}
              <div
                className="horizontal-card certificate-card"
                style={{
                  width: 'clamp(150px, 25vw, 190px)',
                  height: 'clamp(200px, 35vw, 270px)',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    duration: 0.3
                  });
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <FiAward size={18} color="var(--primary)" />
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#333',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>{cert.title}</h3>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>{cert.organization}</p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginBottom: '0.5rem'
                }}>
                  <FiCalendar size={12} color="#666" />
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>{cert.dateIssued}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '1rem'
                }}>
                  {cert.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={{
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--primary)',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>{skill}</span>
                  ))}
                </div>

                <button
                  onClick={() => handleCertificateClick(cert)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginTop: 'auto',
                    cursor: 'pointer'
                  }}
                >
                  <FiExternalLink size={14} />
                  View Certificate
                </button>
              </div>

              {/* Horizontal Connecting Line */}
              {index < 3 && (
                <div
                  className="horizontal-line"
                  style={{
                    width: '80px',
                    height: '4px',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                    transformOrigin: 'left center',
                    margin: '0 1rem',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Vertical Line from 4th card */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '110px',
          marginBottom: '2rem'
        }}>
          <div
            className="vertical-line"
            style={{
              width: '4px',
              height: '60px',
              background: 'var(--primary)',
              borderRadius: '2px',
              transformOrigin: 'top center',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
            }}
          />
        </div>

        {/* Horizontal Timeline - Remaining cards (right to left) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '2rem',
          paddingRight: '110px',
          flexDirection: 'row-reverse'
        }}>
          {certifications.slice(4, 8).map((cert, index) => (
            <div key={index + 4} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
              {/* Certificate Card */}
              <div
                className="vertical-card certificate-card"
                style={{
                  width: 'clamp(150px, 25vw, 190px)',
                  height: 'clamp(200px, 35vw, 270px)',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    duration: 0.3
                  });
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <FiAward size={18} color="var(--primary)" />
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#333',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>{cert.title}</h3>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>{cert.organization}</p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginBottom: '0.5rem'
                }}>
                  <FiCalendar size={12} color="#666" />
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>{cert.dateIssued}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '1rem'
                }}>
                  {cert.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={{
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--primary)',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>{skill}</span>
                  ))}
                </div>

                <button
                  onClick={() => handleCertificateClick(cert)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginTop: 'auto',
                    cursor: 'pointer'
                  }}
                >
                  <FiExternalLink size={14} />
                  View Certificate
                </button>
              </div>

              {/* Horizontal Connecting Line */}
              {index < 3 && (
                <div
                  className="bottom-horizontal-line"
                  style={{
                    width: '80px',
                    height: '4px',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                    transformOrigin: 'right center',
                    margin: '0 1rem',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Second Vertical Line from 8th card */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          paddingLeft: '110px',
          marginBottom: '2rem',
          marginTop: '2rem'
        }}>
          <div
            className="second-vertical-line"
            style={{
              width: '4px',
              height: '60px',
              background: 'var(--primary)',
              borderRadius: '2px',
              transformOrigin: 'top center',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
            }}
          />
        </div>

        {/* Third Row - Bottom cards (left to right) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '2rem',
          paddingLeft: '110px'
        }}>
          {certifications.slice(8).map((cert, index) => (
            <div key={index + 8} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Certificate Card */}
              <div
                className="bottom-card certificate-card"
                style={{
                  width: 'clamp(150px, 25vw, 190px)',
                  height: 'clamp(200px, 35vw, 270px)',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    duration: 0.3
                  });
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <FiAward size={18} color="var(--primary)" />
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#333',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>{cert.title}</h3>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>{cert.organization}</p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginBottom: '0.5rem'
                }}>
                  <FiCalendar size={12} color="#666" />
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>{cert.dateIssued}</span>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '1rem',
                  justifyContent: 'center'
                }}>
                  {cert.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={{
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--primary)',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>{skill}</span>
                  ))}
                </div>

                <button
                  onClick={() => handleCertificateClick(cert)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginTop: 'auto',
                    cursor: 'pointer'
                  }}
                >
                  <FiExternalLink size={14} />
                  View Certificate
                </button>
              </div>

              {/* Horizontal Connecting Line */}
              {index < certifications.slice(8).length - 1 && (
                <div
                  className="third-row-line"
                  style={{
                    width: '80px',
                    height: '4px',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                    transformOrigin: 'left center',
                    margin: '0 1rem',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                  }}
                />
              )}
            </div>
          ))}
        </div>
        </div>
      </div>

      <CertificateModal 
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-cert-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            padding: 1rem;
          }
          
          .desktop-cert-layout {
            display: none !important;
          }
          
          @keyframes flipIn {
            from {
              opacity: 0;
              transform: rotateX(-90deg) translateY(50px);
            }
            to {
              opacity: 1;
              transform: rotateX(0deg) translateY(0px);
            }
          }
        }
        
        @media (min-width: 769px) {
          .mobile-cert-grid {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Certifications;