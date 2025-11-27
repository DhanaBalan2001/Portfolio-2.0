import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const HuluIntro = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete && onComplete()
    });

    // Split text animation
    const huluText = document.querySelector('#hulu-text');
    const originalsText = document.querySelector('#originals-text');
    
    if (huluText && originalsText) {
      const huluChars = huluText.textContent.split('').map((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        return span;
      });
      
      const originalsChars = originalsText.textContent.split('').map((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        return span;
      });
      
      huluText.innerHTML = '';
      originalsText.innerHTML = '';
      huluChars.forEach(span => huluText.appendChild(span));
      originalsChars.forEach(span => originalsText.appendChild(span));

      tl.from(["#top-gradient", "#bottom-gradient"], { duration: 0.7, ease: "power3.inOut", filter: "blur(0px)", opacity: 0 })
        .from("#green-filter", { duration: 0.8, opacity: 0, scale: 3 }, "-=0.35")
        .to("#green-filter", { duration: 0.25, opacity: 0, scale: 3 })
        .to(["#top-gradient", "#bottom-gradient"], { duration: 0.3, filter: "blur(0px)", opacity: 0 }, "-=0.3")
        .set("#logo", { opacity: 1 })
        .from(huluChars, { duration: 0.2, ease: "back", filter: "blur(0.3em)", opacity: 0, scale: 1.5, stagger: 0.05, delay: 0.5 })
        .from(originalsChars, { duration: 0.2, delay: 0.75, filter: "blur(0.3em)", opacity: 0, scale: 0.5, stagger: 0.05, xPercent: -25 })
        .from("#logo-border", { duration: 0.4, ease: "power3.out", opacity: 0, scale: 0.75 }, "-=0.4")
        .from("#logo-border-inner", { duration: 0.4, ease: "power3.out", scale: 0.75 }, "-=0.4")
        .to("#logo", { duration: 2.5, scale: 1.1 }, "-=0.3")
        .to(["#logo-border", "#logo-border-inner"], { duration: 2.5, ease: "power3.out", scale: 1.1 }, "-=2.5")
        .to("#logo-border", { duration: 1.25, ease: "power4.in", scale: 8 }, "-=0.75")
        .to("#logo-border-inner", { duration: 0.5, ease: "power4.in", scale: 8 }, "-=0.75")
        .to("#logo", { duration: 0.25, opacity: 0, scale: 1.2 }, "-=0.625");
    }
  }, [onComplete]);

  return (
    <div className="hulu-intro">
      <div id="green-filter"></div>
      <div id="top-gradient" className="gradient"></div>
      <div id="bottom-gradient" className="gradient"></div>
      <div id="logo-wrapper">
        <div id="logo">
          <div id="logo-border" className="absolute-centered"></div>
          <div id="logo-border-inner" className="absolute-centered"></div>
          <div id="logo-text">
            <div id="originals-text" className="jakarta-sans-font">npm_run_dev</div>
            <div id="hulu-text" className="zen-dots-font">dhana</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HuluIntro;