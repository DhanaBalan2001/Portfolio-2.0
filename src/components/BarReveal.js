import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const BarReveal = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete && onComplete()
    });
    
    // Initial bars animation - show bars first
    tl.fromTo('.reveal-bar', 
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    )
    // Hold bars for a moment
    .to('.reveal-bar', 
      { duration: 0.5 }, 
      '+=0.3'
    )
    // Slowly reveal homepage by scaling bars down
    .to('.reveal-bar', 
      { scaleY: 0, duration: 1.2, stagger: 0.08, ease: 'power2.inOut', transformOrigin: 'top' }, 
      '+=0.2'
    )
    // Fade out the entire overlay
    .to('.bar-reveal', 
      { opacity: 0, duration: 0.5, ease: 'power2.out' }, 
      '-=0.3'
    );

  }, [onComplete]);

  return (
    <div className="bar-reveal">
      <div className="reveal-bars">
        <div className="reveal-bar"></div>
        <div className="reveal-bar"></div>
        <div className="reveal-bar"></div>
        <div className="reveal-bar"></div>
        <div className="reveal-bar"></div>
        <div className="reveal-bar"></div>
        <div className="reveal-bar"></div>
      </div>
    </div>
  );
};

export default BarReveal;