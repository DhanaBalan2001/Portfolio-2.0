import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { FiDownload, FiEye } from 'react-icons/fi';

gsap.registerPlugin(TextPlugin);

const ResumePage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isResumeLoaded, setIsResumeLoaded] = useState(false);
  const headingRef = useRef();
  const cardRef = useRef();
  const buttonRef = useRef();
  const buttonTextRef = useRef();
  const resumeRef = useRef();

  useEffect(() => {
    const heading = headingRef.current;
    const card = cardRef.current;
    const button = buttonRef.current;
    const buttonText = buttonTextRef.current;
    
    // Split "Resume" into letters with blur effect
    heading.innerHTML = 'Resume'.split('').map(char => 
      `<span style="display: inline-block; opacity: 0; transform: translateY(50px); filter: blur(10px);">${char}</span>`
    ).join('');
    
    const tl = gsap.timeline();
    
    // Animate letters with blur to focus
    tl.to(heading.children, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    })
    // Underline animation
    .to(heading, {
      borderBottom: '3px solid var(--primary)',
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    // Card floating entrance
    .fromTo(card, 
      { opacity: 0, scale: 0.8, y: 50, rotation: -5 },
      { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
      '-=0.4'
    )
    // Start floating animation
    .to(card, {
      y: '+=10',
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true
    })
    // Button slide up with spring - no delay
    .fromTo(button,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.8'
    )
    // Typewriter effect for button text
    .to(buttonText, {
      text: 'Download Resume',
      duration: 0.8,
      ease: 'none'
    }, '-=0.3');

    // Card border draw effect
    gsap.fromTo(card, 
      { 
        background: 'linear-gradient(45deg, transparent, transparent)',
        borderImage: 'linear-gradient(45deg, transparent, transparent) 1'
      },
      { 
        background: 'white',
        borderImage: 'linear-gradient(45deg, var(--primary), var(--primary-light)) 1',
        duration: 2,
        delay: 1
      }
    );
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    const button = buttonRef.current;
    
    if (!button) return;
    
    const originalText = button.innerHTML;
    
    // Create loader circle
    const loader = document.createElement('div');
    loader.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      opacity: 0;
    `;
    
    // Create checkmark
    const checkmark = document.createElement('div');
    checkmark.innerHTML = '✓';
    checkmark.style.cssText = `
      font-size: 20px;
      font-weight: bold;
      opacity: 0;
      transform: scale(0);
    `;
    
    gsap.timeline()
      // Button squash effect
      .to(button, {
        scaleY: 0.9,
        duration: 0.1,
        ease: 'power2.out'
      })
      .to(button, {
        scaleY: 1,
        duration: 0.2,
        ease: 'back.out(1.7)'
      })
      // Fade out text
      .to(button.children, {
        opacity: 0,
        duration: 0.3
      })
      // Show loader
      .set(button, {
        innerHTML: ''
      })
      .call(() => button.appendChild(loader))
      .to(loader, {
        opacity: 1,
        duration: 0.2
      })
      // Rotate loader
      .to(loader, {
        rotation: 360,
        duration: 1.5,
        ease: 'none',
        repeat: 2
      })
      // Hide loader, show checkmark
      .to(loader, {
        opacity: 0,
        duration: 0.2
      })
      .set(button, {
        innerHTML: '',
        backgroundColor: 'white'
      })
      .call(() => {
        checkmark.style.color = 'var(--bg-secondary)';
        button.appendChild(checkmark);
      })
      .to(checkmark, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // Download resume when checkmark appears
          const link = document.createElement('a');
          link.href = '/Resume.pdf';
          link.download = 'Dhana_Balan_Resume.pdf';
          link.click();
        }
      })
      // Change text to Downloaded!
      .set(button, {
        innerHTML: 'Downloaded!',
        color: 'var(--bg-secondary)'
      })
      // Reset after delay
      .to({}, {
        duration: 2,
        onComplete: () => {
          button.innerHTML = originalText;
          gsap.set(button, {
            backgroundColor: 'var(--primary)',
            color: 'white'
          });
          setIsDownloading(false);
        }
      });
  };



  const pageStyle = {
    minHeight: '100vh',
    background: `
      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      var(--bg-secondary)
    `,
    padding: '6rem 2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  };

  const headingStyle = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'Fira Code, monospace',
    marginTop: '0',
    marginBottom: '1rem',
    textAlign: 'center',
    paddingBottom: '0.5rem',
    position: 'relative',
    zIndex: 1
  };

  const cardStyle = {
    width: '400px',
    height: '520px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'hidden',
    border: '3px solid transparent',
    backgroundClip: 'padding-box'
  };

  const downloadButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    background: 'var(--primary)',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    opacity: isDownloading ? 0.7 : 1,
    pointerEvents: isDownloading ? 'none' : 'auto'
  };

  const resumeContainerStyle = {
    width: '100%',
    maxWidth: '900px',
    padding: '0',
    marginTop: '1.5rem',
    marginBottom: '1rem'
  };

  return (
    <div style={pageStyle}>
      <h1 ref={headingRef} style={headingStyle}></h1>
      <div ref={resumeRef} style={resumeContainerStyle} className="resume-container">
        {!isResumeLoaded && (
          <div style={{
            width: '100%',
            height: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            border: '2px dashed rgba(139, 92, 246, 0.3)'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(139, 92, 246, 0.3)',
                borderTop: '3px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              <p>Loading Resume...</p>
            </div>
          </div>
        )}
        <iframe
          src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-fit"
          width="100%"
          height="1200px"
          className="resume-iframe"
          style={{ 
            border: 'none', 
            outline: 'none',
            boxShadow: 'none',
            display: isResumeLoaded ? 'block' : 'none',
            background: 'transparent',
            overflow: 'hidden'
          }}
          scrolling="no"
          title="Resume Full View"
          onLoad={() => setIsResumeLoaded(true)}
        />
      </div>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        justifyContent: 'center'
      }}>
        <button
          ref={buttonRef}
          onClick={handleDownload}
          style={{
            ...downloadButtonStyle,
            maxWidth: '200px',
            justifyContent: 'center'
          }}
        >
          <FiDownload />
          Download
        </button>
      </div>
    </div>
  );
};

export default ResumePage;