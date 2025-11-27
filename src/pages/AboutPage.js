import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import About from '../components/About';

const AboutPage = () => {
  const pageRef = useRef();

  useEffect(() => {
    // Page is ready
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh' }}>
      <About />
    </div>
  );
};

export default AboutPage;