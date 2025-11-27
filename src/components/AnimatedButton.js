import React from 'react';
import { gsap } from 'gsap';

const AnimatedButton = ({ children, onClick, style = {} }) => {
  const defaultStyle = {
    position: 'relative',
    padding: '0 2rem',
    lineHeight: '3rem',
    borderRadius: '25px',
    border: '1px solid white',
    background: 'var(--primary)',
    color: 'white',
    cursor: 'pointer',
    fontFamily: 'Fira Code, monospace',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.7,0,0.3,1)',
    ...style
  };

  const handleMouseEnter = (e) => {
    const btn = e.currentTarget;
    const text = btn.querySelector('.btn-text');
    const hover = btn.querySelector('.btn-hover');
    
    btn.style.backgroundColor = 'white';
    btn.style.borderColor = 'var(--primary)';
    btn.style.color = 'var(--primary)';
    text.style.transform = 'translateY(-100%)';
    hover.style.transform = 'translate(-50%, -50%)';
  };

  const handleMouseLeave = (e) => {
    const btn = e.currentTarget;
    const text = btn.querySelector('.btn-text');
    const hover = btn.querySelector('.btn-hover');
    
    btn.style.backgroundColor = 'var(--primary)';
    btn.style.borderColor = 'white';
    btn.style.color = 'white';
    text.style.transform = 'translateY(0%)';
    hover.style.transform = 'translate(-50%, calc(-50% + 100%))';
  };

  const handleClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height) * 2.5;
    
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: var(--primary);
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease;
      pointer-events: none;
      z-index: 1;
    `;
    
    const textContainer = document.createElement('div');
    const textNodes = Array.from(btn.querySelector('.btn-text').childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent.trim())
      .join(' ');
    
    const textToAnimate = textNodes || btn.querySelector('.btn-text').textContent;
    
    // Split text into individual letters with containers
    const letterElements = textToAnimate.split('').map(char => {
      const letterContainer = document.createElement('div');
      letterContainer.style.cssText = `
        display: inline-block;
        overflow: hidden;
        height: 16px;
      `;
      
      const letterSpan = document.createElement('span');
      letterSpan.textContent = char === ' ' ? '\u00A0' : char;
      letterSpan.style.cssText = `
        display: inline-block;
        transform: translateY(100%);
        opacity: 0;
      `;
      
      letterContainer.appendChild(letterSpan);
      textContainer.appendChild(letterContainer);
      return letterSpan;
    });
    
    textContainer.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: 700;
      font-family: 'Fira Code, monospace';
      text-transform: uppercase;
      letter-spacing: 1px;
      pointer-events: none;
      z-index: 10;
      display: flex;
    `;
    
    btn.appendChild(ripple);
    btn.appendChild(textContainer);
    
    // Hide original text
    btn.querySelector('.btn-text').style.opacity = '0';
    
    // Trigger animations
    setTimeout(() => {
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
    }, 10);
    
    setTimeout(() => {
      gsap.fromTo(letterElements, 
        { y: '100%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: 'power4.out' 
        }
      );
    }, 300);
    
    // Cleanup
    setTimeout(() => {
      btn.querySelector('.btn-text').style.opacity = '1';
      ripple.remove();
      textContainer.remove();
    }, 1500);
    
    if (onClick) onClick(e);
  };

  return (
    <button
      style={defaultStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span className="btn-text" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.25s cubic-bezier(0.7,0,0.3,1)',
        zIndex: 0
      }}>
        {children}
      </span>
      <span className="btn-hover" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, calc(-50% + 100%))',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        transition: 'transform 0.25s cubic-bezier(0.7,0,0.3,1)',
        zIndex: 0
      }}>
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;