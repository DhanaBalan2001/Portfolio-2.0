import React, { useEffect } from 'react';
import { FiX, FiDownload, FiExternalLink, FiAward, FiCalendar, FiHash } from 'react-icons/fi';

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 10000,
        paddingTop: '8rem',
        padding: '0 1rem 2rem',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '95%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        marginTop: '6rem'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10001
          }}
        >
          <FiX size={20} />
        </button>

        {/* Certificate Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary), #9333ea)',
          color: 'white',
          padding: '1.5rem 1rem 1rem',
          borderRadius: '12px 12px 0 0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.8rem'
          }}>
            <FiAward size={20} />
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              margin: 0
            }}>{certificate.title}</h2>
          </div>
          
          <p style={{
            fontSize: '0.9rem',
            opacity: 0.9,
            margin: 0
          }}>{certificate.organization}</p>
        </div>

        {/* Certificate Preview */}
        <div style={{ padding: '0.8rem', backgroundColor: '#f8fafc' }}>
          <iframe
            src={certificate.certificateFile}
            style={{
              width: '100%',
              height: '200px',
              border: 'none',
              borderRadius: '6px'
            }}
            title="Certificate Preview"
          />
        </div>

        {/* Certificate Body */}
        <div style={{ padding: '1rem' }}>
        
        {/* Skills */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.8rem'
            }}>Skills Covered</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {certificate.skills.map((skill, index) => (
                <span key={index} style={{
                  padding: '0.4rem 0.8rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: 'var(--primary)',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.8rem',
            flexDirection: 'column'
          }}>
            <a
              href={certificate.certificateFile}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.2rem',
                background: 'var(--primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <FiExternalLink size={18} />
              View Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;