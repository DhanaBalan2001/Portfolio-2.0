import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  const pageRef = useRef();

  useEffect(() => {
    // Page is ready
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh' }}>
      <Projects />
    </div>
  );
};

export default ProjectsPage;