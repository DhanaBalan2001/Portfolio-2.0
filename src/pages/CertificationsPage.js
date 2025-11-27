import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Certifications from '../components/Certifications';

const CertificationsPage = () => {
  const pageRef = useRef();

  // Scroll to top immediately when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Page entrance animation
    gsap.fromTo(pageRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh' }}>
      <Certifications />
    </div>
  );
};

export default CertificationsPage;