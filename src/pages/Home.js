import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { FiDownload, FiEye } from 'react-icons/fi';
import AnimatedButton from '../components/AnimatedButton';

gsap.registerPlugin(TextPlugin);

const Home = () => {
  const pageRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const descRef = useRef();
  const buttonsRef = useRef();
  const [isReturnVisit, setIsReturnVisit] = useState(false);

  useEffect(() => {
    const returnVisit = sessionStorage.getItem('visitedOtherPage');
    
    if (returnVisit) {
      // Return visit - show everything immediately
      setIsReturnVisit(true);
      descRef.current.textContent = "Crafting exceptional digital experiences with cutting-edge animations and modern web technologies. Welcome to the future of web development.";
      sessionStorage.removeItem('visitedOtherPage');
    } else {
      // First visit - run animations
      const tl = gsap.timeline({ delay: 6 });
      
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      
      title.innerHTML = title.textContent.split('').map(char => 
        `<span style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      subtitle.innerHTML = subtitle.textContent.split('').map(char => 
        `<span style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      gsap.set([titleRef.current, subtitleRef.current, descRef.current], { opacity: 1 });
      
      tl.fromTo(title.children, 
        { y: 100, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)' }
      )
      .fromTo(subtitle.children,
        { y: 50, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.03, ease: 'elastic.out(1, 0.3)' },
        '-=0.3'
      )
      .to(descRef.current, {
        text: "Crafting exceptional digital experiences with cutting-edge animations and modern web technologies. Welcome to the future of web development.",
        duration: 2,
        ease: 'none'
      }, '-=0.2')
      .to(titleRef.current, {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      }, '-=1')
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=1'
      );
    }
  }, []);

  const homeStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    background: `
      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
      var(--bg-secondary)
    `,
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 8rem)',
    fontWeight: '900',
    marginBottom: '1rem',
    color: 'var(--text-primary)',
    fontFamily: 'Fira Code, monospace',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: isReturnVisit ? 1 : 0
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
    fontWeight: '600',
    marginBottom: '2rem',
    color: 'var(--text-primary)',
    fontFamily: 'Fira Code, monospace',
    opacity: isReturnVisit ? 1 : 0
  };

  const descStyle = {
    fontSize: '1.2rem',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    fontFamily: 'monospace',
    border: '1px solid white',
    padding: '1rem',
    borderRadius: '10px',
    background: 'rgba(94, 91, 99, 0.05)',
    opacity: isReturnVisit ? 1 : 0
  };

  const buttonsStyle = {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2rem',
    opacity: isReturnVisit ? 1 : 0
  };

  return (
    <div ref={pageRef} style={homeStyle}>
      <h1 
        ref={titleRef} 
        style={titleStyle}
        onMouseEnter={() => gsap.to(titleRef.current, { scale: 1.05, duration: 0.3 })}
        onMouseLeave={() => gsap.to(titleRef.current, { scale: 1, duration: 0.3 })}
      >
        DHANA BALAN
      </h1>
      <h2 ref={subtitleRef} style={subtitleStyle}>
        MERN Stack Developer
      </h2>
      <p ref={descRef} style={descStyle}></p>
      
      <div ref={buttonsRef} style={buttonsStyle}>
        <AnimatedButton onClick={() => {
          // Create loading overlay
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            overflow: hidden;
          `;
          
          const container = document.createElement('div');
          container.style.cssText = `
            position: relative;
            transform: scale(0.725);
          `;
          
          const divider = document.createElement('div');
          divider.style.cssText = `
            position: absolute;
            z-index: 2;
            top: 65px;
            left: 200px;
            width: 50px;
            height: 15px;
            background: white;
          `;
          
          const loadingText = document.createElement('p');
          loadingText.innerHTML = `
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px; transform-origin: 100% 70%; transform: scale(1, 1.275);">L</span>
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px;">o</span>
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px;">a</span>
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px;">d</span>
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px; transform-origin: 100% 70%;">i</span>
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px;">n</span>
            <span style="display: inline-block; position: relative; color: black; letter-spacing: 8px;">g</span>
          `;
          loadingText.style.cssText = `
            position: relative;
            font-size: 3.75rem;
            font-weight: 300;
            margin: 0;
            white-space: nowrap;
            font-family: Roboto, sans-serif;
          `;
          
          // Add CSS animations
          const style = document.createElement('style');
          style.textContent = `
            .loading-text::before {
              content: '';
              position: absolute;
              z-index: 1;
              top: 40px;
              left: 115px;
              width: 6px;
              height: 6px;
              background: black;
              border-radius: 50%;
              animation: dotMove 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite;
            }
            .loading-text span:nth-child(1)::before {
              content: '';
              position: absolute;
              top: 22px;
              left: 0;
              width: 14px;
              height: 36px;
              background: white;
              transform-origin: 100% 0;
              animation: lineStretch 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite;
            }
            .loading-text span:nth-child(5) {
              animation: letterStretch 1800ms cubic-bezier(0.25,0.23,0.73,0.75) infinite;
            }
            .loading-text span:nth-child(5)::before {
              content: '';
              position: absolute;
              top: 15px;
              left: 2px;
              width: 9px;
              height: 15px;
              background: white;
            }
            @keyframes dotMove {
              0%, 100% { transform: rotate(180deg) translate(-110px, -10px) rotate(-180deg); }
              50% { transform: rotate(0deg) translate(-111px, 10px) rotate(0deg); }
            }
            @keyframes letterStretch {
              0%, 100% { transform: scale(1, 0.35); transform-origin: 100% 75%; }
              8%, 28% { transform: scale(1, 2.125); transform-origin: 100% 67%; }
              37% { transform: scale(1, 0.875); transform-origin: 100% 75%; }
              46% { transform: scale(1, 1.03); transform-origin: 100% 75%; }
              50%, 97% { transform: scale(1); transform-origin: 100% 75%; }
            }
            @keyframes lineStretch {
              0%, 45%, 70%, 100% { transform: scaleY(0.125); }
              49% { transform: scaleY(0.75); }
              50% { transform: scaleY(0.875); }
              53% { transform: scaleY(0.5); }
              60% { transform: scaleY(0); }
              68% { transform: scaleY(0.18); }
            }
          `;
          
          loadingText.className = 'loading-text';
          container.appendChild(divider);
          container.appendChild(loadingText);
          overlay.appendChild(container);
          document.head.appendChild(style);
          document.body.appendChild(overlay);
          
          // Navigate after 3 seconds
          setTimeout(() => {
            sessionStorage.setItem('visitedOtherPage', 'true');
            window.location.href = '/resume';
          }, 3000);
        }}>
          <FiEye size={14} style={{ marginRight: '8px' }} />
          View Resume
        </AnimatedButton>
      </div>
    </div>
  );
};

export default Home;