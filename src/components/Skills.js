import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Skills = () => {
  const containerRef = useRef(null);

  const skills = [
    'HTML','CSS','Bootstrap', 'JavaScript','Reactjs', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Git', 'Github','Postman'
  ];

  const codeSnippets = [
    'const developer = new FullStackDeveloper();',
    'developer.addSkill("React");',
    'developer.addSkill("Node.js");',
    'developer.deploy("production");',
    'console.log("Skills loaded successfully!");'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate terminal windows with slide effect
      const leftTerminal = document.querySelector('.terminal-left');
      const rightTerminal = document.querySelector('.terminal-right');
      
      gsap.fromTo(leftTerminal, 
        { x: -200, opacity: 0, rotationY: -45 },
        { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: 'power3.out' }
      );
      
      gsap.fromTo(rightTerminal, 
        { x: 200, opacity: 0, rotationY: 45 },
        { x: 0, opacity: 1, rotationY: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      // Type out each skill
      skills.forEach((skill, index) => {
        const skillElement = document.querySelector(`.skill-${index}`);
        if (skillElement) {
          skillElement.textContent = '';
          
          // Create typing animation
          const chars = skill.split('');
          chars.forEach((char, charIndex) => {
            gsap.to({}, {
              duration: 0.05,
              delay: 1 + index * 0.3 + charIndex * 0.1,
              onComplete: () => {
                skillElement.textContent += char;
              }
            });
          });
          
          // Add cursor blink
          gsap.to(`.cursor-${index}`, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: 1 + index * 0.3
          });
        }
      });

      // Animate code snippets
      codeSnippets.forEach((snippet, index) => {
        const codeElement = document.querySelector(`.code-${index}`);
        if (codeElement) {
          codeElement.textContent = '';
          
          const chars = snippet.split('');
          chars.forEach((char, charIndex) => {
            gsap.to({}, {
              duration: 0.03,
              delay: 2 + index * 0.8 + charIndex * 0.05,
              onComplete: () => {
                codeElement.textContent += char;
              }
            });
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
        backgroundImage: `
          linear-gradient(var(--primary)40 1px, transparent 1px),
          linear-gradient(90deg, var(--primary)40 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        padding: 'clamp(1rem, 4vw, 2rem)',
        paddingTop: 'clamp(4rem, 10vw, 6rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <h2 className="skills-section" style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: '700',
        color: 'white',
        fontFamily: 'Fira Code, monospace',
        marginBottom: '3rem',
        textAlign: 'center',
        paddingTop: window.innerWidth <= 768 ? '2rem' : '0'
      }}>Technical Skills</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
        gap: 'clamp(1.5rem, 4vw, 2rem)',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {/* Terminal Window - Skills */}
        <div className="terminal-window terminal-left" style={{
          background: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {/* Terminal Header */}
          <div style={{
            background: '#333',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
            <span style={{ color: '#ccc', fontSize: '12px', marginLeft: '1rem' }}>skills.js</span>
          </div>

          {/* Terminal Content */}
          <div style={{
            padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
            fontFamily: 'Fira Code, monospace',
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            lineHeight: '1.4',
            minHeight: 'clamp(250px, 40vw, 350px)'
          }}>
            <div style={{ color: '#6a9955', marginBottom: '1rem' }}>
              // My Technical Skills
            </div>
            
            {skills.map((skill, index) => (
              <div key={skill} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#569cd6' }}>const </span>
                <span style={{ color: '#9cdcfe' }}>
                  <span className={`skill-${index}`}></span>
                  <span className={`cursor-${index}`} style={{ color: '#fff' }}>|</span>
                </span>
                <span style={{ color: '#d4d4d4' }}> = </span>
                <span style={{ color: '#ce9178' }}>"expert";</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Window - Code */}
        <div className="terminal-window terminal-right" style={{
          background: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {/* Terminal Header */}
          <div style={{
            background: '#333',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
            <span style={{ color: '#ccc', fontSize: '12px', marginLeft: '1rem' }}>developer.js</span>
          </div>

          {/* Terminal Content */}
          <div style={{
            padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
            fontFamily: 'Fira Code, monospace',
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            lineHeight: '1.4',
            minHeight: 'clamp(250px, 40vw, 350px)'
          }}>
            <div style={{ color: '#6a9955', marginBottom: '1rem' }}>
              // Building amazing applications
            </div>
            
            {codeSnippets.map((snippet, index) => (
              <div key={index} style={{ marginBottom: '0.5rem', color: '#d4d4d4' }}>
                <span className={`code-${index}`}></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;