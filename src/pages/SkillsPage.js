import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Skills from '../components/Skills';

const SkillsPage = () => {
  const pageRef = useRef();

  useEffect(() => {
    // Page is ready
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh' }}>
      <Skills />
    </div>
  );
};

export default SkillsPage;