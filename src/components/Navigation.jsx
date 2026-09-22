'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const links = [
    { label: 'Skills', href: '#skills', sectionIndex: 1 },
    { label: 'Projects', href: '#projects', sectionIndex: 2 },
    { label: 'About', href: '#about', sectionIndex: 3 },
    { label: 'Contact', href: '#contact', sectionIndex: 4 },
  ];

  const handleClick = (e, sectionIndex) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.goToSection) {
      window.goToSection(sectionIndex);
    }
  };

  return (
    <nav className="navigation" data-animate="navigation">
      {links.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          className="nav-link"
          data-cursor="link"
          onClick={(e) => handleClick(e, link.sectionIndex)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ position: 'relative', paddingBottom: '4px' }}
        >
          <span style={{ position: 'relative', zIndex: 2 }}>{link.label}</span>
          
          {/* Framer Motion Magical Underline */}
          {hoveredIndex === index && (
            <motion.div
              layoutId="nav-underline"
              className="nav-underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(255,255,255,0.9)',
                zIndex: 1,
              }}
            />
          )}
        </a>
      ))}
    </nav>
  );
}
