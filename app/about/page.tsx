'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '60px'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 20px',
        color: '#ffffff',
        lineHeight: '1.8',
        fontFamily: 'Times New Roman, serif',
        textAlign: 'center'
      }}>
        
        {/* Hero Section with Photo */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 30px auto',
            border: '6px solid rgba(160, 160, 160, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
          }}>
            <img 
              src="/image/nima-bw.jpg" 
              alt="Nima Saraeian"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.1)'
              }}
            />
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#ffffff',
            fontFamily: 'Times New Roman, serif'
          }}>
            Nima Saraeian
          </h1>
          
          <div style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #808080, #a0a0a0)',
            margin: '15px auto',
            borderRadius: '2px'
          }}></div>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#b0b0b0',
            fontStyle: 'italic',
            marginBottom: '20px',
            fontFamily: 'Times New Roman, serif'
          }}>
            UX Designer & Researcher<br />
            AI-Powered Behavior Analysis Expert<br />
            +90 536 291 4170 | ✉️ info@nimasaraeian.com
          </p>
          
          <div style={{ marginBottom: '30px' }}>
            <a 
              href="/cv-nima-saraeian.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '25px',
                border: '2px solid #333333',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                fontFamily: 'Times New Roman, serif'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#333333';
                e.target.style.borderColor = '#555555';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#1a1a1a';
                e.target.style.borderColor = '#333333';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              📄 Download CV
            </a>
          </div>
        </section>

        {/* About Me Section */}
        <section style={{ marginBottom: '60px', textAlign: 'left' }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Times New Roman, serif'
          }}>
            About Me
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.7',
            color: '#e0e0e0',
            marginBottom: '25px',
            fontFamily: 'Times New Roman, serif'
          }}>
            Welcome! I'm a <strong style={{ color: '#ffffff' }}>UX Designer & Researcher</strong> with over <strong style={{ color: '#ffffff' }}>12 years of experience</strong> in marketing, consumer psychology, and AI-powered behavior analysis. I specialize in combining psychology, design thinking, and data science to create engaging, intuitive, and impactful digital experiences.
          </p>
          
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#cccccc',
            marginBottom: '25px',
            fontFamily: 'Times New Roman, serif'
          }}>
            My expertise spans <strong style={{ color: '#ffffff' }}>User-Centered Design (UCD)</strong>, <strong style={{ color: '#ffffff' }}>usability testing</strong>, and <strong style={{ color: '#ffffff' }}>AI-driven user analysis</strong>. As the founder of <strong style={{ color: '#ffffff' }}>Selphlyze AI Project</strong>, I've conducted user research with over 500 participants across cultural backgrounds, creating wireframes and prototypes that integrate AI & psychology to personalize user journeys.
          </p>
          
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#cccccc',
            marginBottom: '25px',
            fontFamily: 'Times New Roman, serif'
          }}>
            With a <strong style={{ color: '#b0b0b0' }}>Master's in Electronic Business</strong> and ongoing <strong style={{ color: '#b0b0b0' }}>Data Science certification</strong>, I bring a unique blend of technical skills and human-centered design principles to every project. My work focuses on neuromarketing, behavioral design, and cross-cultural UX research to deliver solutions that truly resonate with users.
          </p>
        </section>

        {/* Projects Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Times New Roman, serif'
          }}>
            Featured Projects
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px',
            marginTop: '30px'
          }}>
            {/* Selphlyze */}
            <div style={{
              padding: '30px 25px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              backgroundColor: '#1a1a1a',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#4f46e5';
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => window.open('https://www.selphlyze.com', '_blank')}
            >
              <div style={{ marginBottom: '15px' }}>
                <img 
                  src="/image/SELPHLYZE_LOGO_HIGH_RES.png" 
                  alt="Selphlyze Logo" 
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#ffffff',
                fontFamily: 'Times New Roman, serif'
              }}>
                Selphlyze
              </h3>
              <p style={{
                fontSize: '0.95rem',
                margin: '0 0 20px 0',
                color: '#c0c0c0',
                lineHeight: '1.5',
                fontFamily: 'Times New Roman, serif'
              }}>
                AI-powered psychometric platform for deep psychological profiling and behavioral analysis
              </p>
              <div style={{
                fontSize: '0.8rem',
                color: '#4f46e5',
                fontWeight: '600',
                fontFamily: 'Times New Roman, serif'
              }}>
                Click to visit →
              </div>
            </div>
            
            {/* Contlyze */}
            <div style={{
              padding: '30px 25px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              backgroundColor: '#1a1a1a',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#f97316';
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => window.open('https://www.contlyze.com', '_blank')}
            >
              <div style={{ marginBottom: '15px' }}>
                <img 
                  src="/image/contlyze.png" 
                  alt="Contlyze Logo" 
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#ffffff',
                fontFamily: 'Times New Roman, serif'
              }}>
                Contlyze
              </h3>
              <p style={{
                fontSize: '0.95rem',
                margin: '0 0 20px 0',
                color: '#c0c0c0',
                lineHeight: '1.5',
                fontFamily: 'Times New Roman, serif'
              }}>
                AI-driven content analysis and optimization platform for data-driven marketing strategies
              </p>
              <div style={{
                fontSize: '0.8rem',
                color: '#f97316',
                fontWeight: '600',
                fontFamily: 'Times New Roman, serif'
              }}>
                Click to visit →
              </div>
            </div>
            
            {/* Nekras Group */}
            <div style={{
              padding: '30px 25px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              backgroundColor: '#1a1a1a',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#10b981';
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => window.open('https://nekrasgroup.com', '_blank')}
            >
              <div style={{ marginBottom: '15px' }}>
                <img 
                  src="/image/nekrasgroup.png" 
                  alt="NEKRAS GROUP Logo" 
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#ffffff',
                fontFamily: 'Times New Roman, serif'
              }}>
                Nekras Group
              </h3>
              <p style={{
                fontSize: '0.95rem',
                margin: '0 0 20px 0',
                color: '#c0c0c0',
                lineHeight: '1.5',
                fontFamily: 'Times New Roman, serif'
              }}>
                Strategic business consulting and digital transformation solutions for modern enterprises
              </p>
              <div style={{
                fontSize: '0.8rem',
                color: '#10b981',
                fontWeight: '600',
                fontFamily: 'Times New Roman, serif'
              }}>
                Click to visit →
              </div>
            </div>
            
            {/* Lotus Business School */}
            <div style={{
              padding: '30px 25px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              backgroundColor: '#1a1a1a',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => window.open('https://lotusbusinessschool.com', '_blank')}
            >
              <div style={{ marginBottom: '15px' }}>
                <img 
                  src="/image/lotuslogo.png" 
                  alt="Lotus Business School Logo" 
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#ffffff',
                fontFamily: 'Times New Roman, serif'
              }}>
                Lotus Business School
              </h3>
              <p style={{
                fontSize: '0.95rem',
                margin: '0 0 20px 0',
                color: '#c0c0c0',
                lineHeight: '1.5',
                fontFamily: 'Times New Roman, serif'
              }}>
                Professional education and training in consumer behavior, digital psychology, and strategic management
              </p>
              <div style={{
                fontSize: '0.8rem',
                color: '#8b5cf6',
                fontWeight: '600',
                fontFamily: 'Times New Roman, serif'
              }}>
                Click to visit →
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#ffffff',
            fontFamily: 'Times New Roman, serif'
          }}>
            Mission & Philosophy
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '25px',
            maxWidth: '800px',
            margin: '0 auto 25px auto',
            fontFamily: 'Times New Roman, serif',
            color: '#e0e0e0'
          }}>
            My mission is to bridge the gap between <strong style={{ color: '#ffffff' }}>human psychology</strong>, <strong style={{ color: '#ffffff' }}>AI technology</strong>, and <strong style={{ color: '#ffffff' }}>user experience design</strong> to create digital products that are not only functional but truly meaningful and engaging for users across all cultures and backgrounds.
          </p>

          <div style={{
            padding: '25px',
            borderRadius: '15px',
            borderLeft: '5px solid #a0a0a0',
            backgroundColor: '#1a1a1a',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '1.4rem',
              fontStyle: 'italic',
              fontWeight: '600',
              margin: '0',
              color: '#ffffff',
              fontFamily: 'Times New Roman, serif'
            }}>
              "Great UX design is not about making things look pretty—it's about understanding human behavior and creating experiences that feel natural, intuitive, and meaningful."
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#ffffff',
            fontFamily: 'Times New Roman, serif'
          }}>
            Let's Connect
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '30px',
            color: '#cccccc',
            fontFamily: 'Times New Roman, serif'
          }}>
            If you're passionate about the future of AI in marketing, consumer analytics, and behavior-driven strategy, you're in the right place.
          </p>

          <a 
            href="/contact" 
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#333333',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Times New Roman, serif',
              transition: 'background-color 0.3s'
            }}
          >
            Get In Touch →
          </a>
        </section>
        
      </div>
    </div>
  );
}