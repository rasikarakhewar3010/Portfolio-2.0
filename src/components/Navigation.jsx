'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isFrosted, setIsFrosted] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef([]);

  const links = [
    { label: 'Skills', href: '#skills', sectionIndex: 1 },
    { label: 'Projects', href: '#projects', sectionIndex: 2 },
    { label: 'About', href: '#about', sectionIndex: 3 },
    { label: 'Contact', href: '#contact', sectionIndex: 4 },
  ];

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const panels = document.querySelectorAll('.panel');
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(panels).indexOf(entry.target);
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  // Frosted backdrop on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsFrosted(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic effect on nav links
  useEffect(() => {
    const cleanups = linkRefs.current.map((linkEl) => {
      if (!linkEl) return null;
      const quickX = gsap.quickTo(linkEl, 'x', { duration: 0.4, ease: 'power3.out' });
      const quickY = gsap.quickTo(linkEl, 'y', { duration: 0.4, ease: 'power3.out' });

      const onMove = (e) => {
        const rect = linkEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance < 40) {
          quickX(deltaX * 0.25);
          quickY(deltaY * 0.25);
        }
      };

      const onLeave = () => {
        quickX(0);
        quickY(0);
      };

      linkEl.addEventListener('mousemove', onMove);
      linkEl.addEventListener('mouseleave', onLeave);
      return () => {
        linkEl.removeEventListener('mousemove', onMove);
        linkEl.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => cleanups.forEach((c) => c && c());
  }, []);

  const handleClick = (e, sectionIndex) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.goToSection) {
      window.goToSection(sectionIndex);
    }
  };

  // Split text into individual characters for wave effect
  const renderChars = (text) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="nav-char"
        style={{ animationDelay: `${i * 25}ms` }}
      >
        {char}
      </span>
    ));
  };

  return (
    <nav
      ref={navRef}
      className={`navigation ${isFrosted ? 'nav-frosted' : ''}`}
      data-animate="navigation"
    >
      {links.map((link, index) => {
        const isActive = activeSection === link.sectionIndex;
        return (
          <a
            key={link.label}
            ref={(el) => (linkRefs.current[index] = el)}
            href={link.href}
            className="nav-link"
            data-cursor="link"
            onClick={(e) => handleClick(e, link.sectionIndex)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              paddingBottom: '4px',
              opacity: isActive ? 1 : undefined,
              transition: 'opacity 0.4s ease',
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              {renderChars(link.label)}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="nav-active-dot"
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'currentColor',
                  opacity: 0.6,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Hover underline */}
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
        );
      })}
    </nav>
  );
}
