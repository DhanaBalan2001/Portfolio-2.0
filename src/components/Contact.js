import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import AnimatedButton from './AnimatedButton';

const Contact = () => {
  const contactRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    // Contact icons fade and bounce from below
    gsap.fromTo('.contact-card',
      { 
        y: 80,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.form-card',
      { 
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  const sectionStyle = {
    minHeight: '100vh',
    padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)',
    background:'var(--bg-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '700',
    marginBottom: '3rem',
    color: 'var(--text-primary)',
    fontFamily: 'Fira Code, monospace',
    textAlign: 'center',
    paddingTop: window.innerWidth <= 768 ? '2rem' : '0'
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1.5fr',
    gap: 'clamp(1.5rem, 4vw, 2rem)',
    maxWidth: '900px',
    width: '100%'
  };

  const leftColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const contactCardStyle = {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(20px)',
    border: '1px solid var(--border)',
    borderRadius: 'clamp(10px, 3vw, 15px)',
    padding: 'clamp(1rem, 3vw, 1.5rem)',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const iconStyle = {
    fontSize: '2.5rem',
    color: 'var(--text-primary)',
    marginBottom: '1rem'
  };

  const socialContainerStyle = {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(20px)',
    border: '1px solid var(--border)',
    borderRadius: '15px',
    padding: '1.5rem'
  };

  const socialGridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : '1fr 1fr',
    gap: 'clamp(0.8rem, 2vw, 1rem)',
    marginTop: '1rem'
  };

  const socialItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'var(--primary)',
    border: '1px solid white',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  const formStyle = {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(20px)',
    border: '1px solid var(--border)',
    borderRadius: 'clamp(10px, 3vw, 15px)',
    padding: 'clamp(1.5rem, 4vw, 2rem)'
  };

  const inputStyle = {
    width: '100%',
    padding: 'clamp(0.8rem, 2vw, 1rem)',
    marginBottom: '1rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: 'clamp(8px, 2vw, 10px)',
    color: 'var(--text-primary)',
    fontSize: 'clamp(14px, 3vw, 16px)',
    transition: 'all 0.3s ease',
    minHeight: '44px'
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '1rem 2rem',
    background: 'var(--primary)',
    color: 'white',
    border: '1px solid white',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  };

  return (
    <section id="contact" ref={contactRef} style={sectionStyle}>
      <h2 className="contact-section" style={titleStyle}>Let's Connect</h2>
      
      <div style={containerStyle}>
        {/* Left Column */}
        <div style={leftColumnStyle}>
          {/* Contact Info */}
          <div className="contact-card" style={contactCardStyle}>
            <FiMail style={iconStyle} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Email Me
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              dhanabalank22@gmail.com
            </p>
          </div>



          {/* Social Links */}
          <div className="contact-card" style={socialContainerStyle}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
              Follow Me
            </h3>
            <div style={socialGridStyle}>
              <a 
                href="#" 
                style={{
                  ...socialItemStyle,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={(e) => {
                  e.preventDefault();
                  
                  const overlay = document.createElement('div');
                  overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    opacity: 0;
                  `;
                  
                  const loader = document.createElement('div');
                  loader.innerHTML = `
                    <div style="text-align: center; color: white;">
                      <div style="font-size: 2rem; margin-bottom: 1rem;">🔗</div>
                      <div style="font-size: 1.2rem; margin-bottom: 2rem;">Connecting to GitHub...</div>
                      <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
                        <div class="progress-bar" style="width: 0%; height: 100%; background: #8b5cf6; border-radius: 2px;"></div>
                      </div>
                    </div>
                  `;
                  overlay.appendChild(loader);
                  document.body.appendChild(overlay);
                  
                  gsap.to(overlay, { opacity: 1, duration: 0.3 });
                  
                  gsap.to(loader.querySelector('.progress-bar'), {
                    width: '100%',
                    duration: 2,
                    ease: 'power2.out',
                    onComplete: () => {
                      gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                          overlay.remove();
                          window.open('https://github.com/DhanaBalan2001', '_blank');
                        }
                      });
                    }
                  });
                }}
              >
                <FiGithub style={{ fontSize: '1.5rem', color: 'white' }} />
                <span style={{ color: 'white', fontSize: '0.9rem' }}>GitHub</span>
              </a>
              <a 
                href="#" 
                style={{
                  ...socialItemStyle,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={(e) => {
                  e.preventDefault();
                  
                  const overlay = document.createElement('div');
                  overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    opacity: 0;
                  `;
                  
                  const loader = document.createElement('div');
                  loader.innerHTML = `
                    <div style="text-align: center; color: white;">
                      <div style="font-size: 2rem; margin-bottom: 1rem;">💼</div>
                      <div style="font-size: 1.2rem; margin-bottom: 2rem;">Connecting to LinkedIn...</div>
                      <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
                        <div class="progress-bar" style="width: 0%; height: 100%; background: #0077b5; border-radius: 2px;"></div>
                      </div>
                    </div>
                  `;
                  overlay.appendChild(loader);
                  document.body.appendChild(overlay);
                  
                  gsap.to(overlay, { opacity: 1, duration: 0.3 });
                  
                  gsap.to(loader.querySelector('.progress-bar'), {
                    width: '100%',
                    duration: 2,
                    ease: 'power2.out',
                    onComplete: () => {
                      gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                          overlay.remove();
                          window.open('https://www.linkedin.com/in/dhana-balan-k', '_blank');
                        }
                      });
                    }
                  });
                }}
              >
                <FiLinkedin style={{ fontSize: '1.5rem', color: 'white' }} />
                <span style={{ color: 'white', fontSize: '0.9rem' }}>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="form-card" style={formStyle}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '1.5rem' }}>
            Send Message
          </h3>
          
          <input
            type="text"
            placeholder="Your Name"
            style={inputStyle}
            required
          />
          
          <input
            type="email"
            placeholder="Your Email"
            style={inputStyle}
            required
          />
          
          <input
            type="text"
            placeholder="Subject"
            style={inputStyle}
            required
          />
          
          <textarea
            placeholder="Your Message"
            style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
            required
          ></textarea>
          
          <button 
            type="submit" 
            style={{
              ...submitButtonStyle,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -3,
                scale: 1.02,
                boxShadow: '0 12px 30px rgba(255, 255, 255, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
              });
              gsap.to(e.currentTarget.querySelector('.send-icon'), {
                x: 3,
                rotation: 15,
                duration: 0.3,
                ease: 'back.out(1.7)'
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                scale: 1,
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
              });
              gsap.to(e.currentTarget.querySelector('.send-icon'), {
                x: 0,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
              });
            }}
            onClick={(e) => {
              e.preventDefault();
              const btn = e.currentTarget;
              const icon = btn.querySelector('.send-icon');
              const text = btn.querySelector('.send-text');
              
              // Create particles
              for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                  position: absolute;
                  width: 4px;
                  height: 4px;
                  background: white;
                  border-radius: 50%;
                  left: 50%;
                  top: 50%;
                  pointer-events: none;
                `;
                btn.appendChild(particle);
                
                gsap.to(particle, {
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  onComplete: () => particle.remove()
                });
              }
              
              // Button animation sequence
              gsap.timeline()
                .to(btn, { scale: 0.95, duration: 0.1 })
                .to(icon, { x: 50, opacity: 0, duration: 0.3 }, 0.1)
                .to(text, { opacity: 0, duration: 0.2 }, 0.1)
                .set(text, { innerHTML: 'Sending...' })
                .to(text, { opacity: 1, duration: 0.3 })
                .to(btn, { scale: 1, duration: 0.2 })
                .to({}, { duration: 1.5 })
                .set(text, { innerHTML: 'Sent!' })
                .to(icon, { x: 0, opacity: 1, rotation: 360, duration: 0.5, ease: 'back.out(1.7)' })
                .to({}, { duration: 1 })
                .set(text, { innerHTML: 'Send Message' })
                .to(icon, { rotation: 0, duration: 0.3 });
            }}
          >
            <FiSend className="send-icon" />
            <span className="send-text">Send Message</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;