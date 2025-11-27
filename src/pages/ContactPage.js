import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Contact from '../components/Contact';

const ContactPage = () => {
  const pageRef = useRef();

  useEffect(() => {
    // Page is ready
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh' }}>
      <Contact />
    </div>
  );
};

export default ContactPage;