'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CERTIFICATES_DATA = [
  {
    title: 'AI & ML Workshop',
    issuer: 'BITS Pilani Hyderabad',
    category: 'AI & Machine Learning',
    link: 'https://drive.google.com/file/d/1Cu_6QAfhPzwWJOgJcfxHl4NBfLw6j2fj/view?usp=drive_link',
  },
  {
    title: 'Intel Unnati Training Program',
    issuer: 'Intel Corporation',
    category: 'Advanced Tech & AI',
    link: 'https://drive.google.com/file/d/1XOdAgyfHzccyOy3FHRYBQDlB11aP3Oqk/view?usp=drive_link',
  },
  {
    title: 'Generative AI Participation',
    issuer: 'Intel Unnati',
    category: 'GenAI & Deep Learning',
    link: 'https://drive.google.com/file/d/16-_Obb7KU8fW_6a6EnGyavIFbpGrSZP-/view?usp=drive_link',
  },
  {
    title: 'Web Development Certificate',
    issuer: 'Professional Certification',
    category: 'Frontend & Architecture',
    link: 'https://drive.google.com/file/d/1FgUEHKU92_amYADjKo7DcV-32TKScIvj/view?usp=drive_link',
  },
  {
    title: 'UI/UX Design Fundamentals',
    issuer: 'Design Academy',
    category: 'UI/UX Design',
    link: 'https://drive.google.com/file/d/1U1b_WqiroXY4O31jLJR5A1xzE3EAg-Ap/view?usp=sharing',
  },
  {
    title: 'Node.js Certification',
    issuer: 'Backend Development',
    category: 'Backend Engineering',
    link: 'https://drive.google.com/file/d/131INhy13h_Qe7eSqyCu-p4xw-Tl5hjcM/view?usp=drive_link',
  },
  {
    title: 'Python Programming',
    issuer: 'NPTEL (IIT)',
    category: 'Algorithms & Python',
    link: 'https://drive.google.com/file/d/1a3ZF0EPWzD5bQumL2pTU_yIvlZZALfwf/view?usp=drive_link',
  },
  {
    title: 'Frontend Workshop',
    issuer: 'MGM College',
    category: 'Frontend Engineering',
    link: 'https://drive.google.com/file/d/1QMxP_JqlrECaOVs-3KkgMwjUNNd2klL4/view?usp=sharing',
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    category: 'Cloud & Infrastructure',
    link: 'https://drive.google.com/file/d/1lQZN6_CrHFv8X4EYwEJuqh2Gy-ckwHgN/view?usp=sharing',
  },
  {
    title: 'DBMS Certification',
    issuer: 'NPTEL',
    category: 'Databases & SQL',
    link: 'https://drive.google.com/file/d/1egHPpOyZo8ObYBA55LloZx4jBbHc-_YX/view?usp=sharing',
  },
  {
    title: 'Java Programming',
    issuer: 'Infosys Springboard',
    category: 'Core Java & OOP',
    link: 'https://drive.google.com/file/d/1E_WZf9QkE3X6aYlQzL7Y01KCOdv4xKz1/view?usp=sharing',
  },
  {
    title: 'CSS Certificate',
    issuer: 'Responsive Design',
    category: 'Styling & Design Systems',
    link: 'https://drive.google.com/file/d/15_3bYTVOI8A1zZh6wRSKNXCWJUPDcQGL/view?usp=sharing',
  },
];

export default function About() {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <section className="section" id="about">
      <div className="section-label" data-animate="section-label">
        <span>03</span> About
      </div>
      <div className="about-section">
        <div className="about-pull-quote" data-animate="pull-quote">
          I build scalable, user-centric applications that solve real-world problems — bridging the gap between complex algorithms and intuitive interfaces.
        </div>
        <div className="about-body-container">
          <div className="about-body" data-animate="about-body">
            <p>
              I am Rasika Rakhewar, a Full-Stack Developer blending technical precision with creative design. With expertise across the modern MERN stack, Python, and AI integrations, I transform complex engineering problems into refined, high-performance digital experiences.
            </p>
            <p>
              Beyond code, I am an active community leader and mentor. As Head of the IEI Student Chapter, I have mentored over 100+ students, conducting technical workshops and fostering an environment where technology empowers builders.
            </p>
            <p>
              Currently advancing specialized expertise in Artificial Intelligence and Full-Stack Engineering through Intel Unnati and BITS Pilani Hyderabad, constantly exploring the cutting edge of AI-driven web applications.
            </p>
          </div>

          <div className="about-stats" data-animate="stats">
            <div className="stat-item">
              <div className="stat-number" data-animate="stat-number">100+</div>
              <div className="stat-label">Students Mentored</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-animate="stat-number">12+</div>
              <div className="stat-label">Verified Certifications</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-animate="stat-number">6+</div>
              <div className="stat-label">Production Projects</div>
            </div>
          </div>

          <button
            className="certificates-trigger-btn"
            onClick={() => setShowCertModal(true)}
            data-cursor="link"
          >
            <span>Explore 12 Verified Credentials</span>
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>↗</span>
          </button>
        </div>
      </div>

      {/* Luxury Credentials Modal */}
      <AnimatePresence>
        {showCertModal && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCertModal(false)}
          >
            <motion.div
              className="cert-modal-container"
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <div>
                  <h3 className="cert-modal-title">Verified Certifications</h3>
                  <p className="cert-modal-subtitle">
                    Continuous learning in AI, Cloud, MERN, and Engineering Foundations
                  </p>
                </div>
                <button
                  className="cert-modal-close"
                  onClick={() => setShowCertModal(false)}
                  aria-label="Close certifications modal"
                >
                  ✕
                </button>
              </div>

              <div className="cert-modal-body">
                {CERTIFICATES_DATA.map((cert, index) => (
                  <div key={index} className="cert-card">
                    <div>
                      <div className="cert-card-category">{cert.category}</div>
                      <h4 className="cert-card-title">{cert.title}</h4>
                      <p className="cert-card-issuer">{cert.issuer}</p>
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card-link"
                      data-cursor="link"
                    >
                      <span>Verify Credential</span>
                      <span>↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
