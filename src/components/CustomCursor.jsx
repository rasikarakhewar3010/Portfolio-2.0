'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-smooth spring physics for the trailing ring
  const springConfig = { damping: 28, stiffness: 300, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Fast spring for the center dot (almost 1:1 tracking but perfectly smooth)
  const dotSpringConfig = { damping: 20, stiffness: 400, mass: 0.2 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        const type = el.getAttribute('data-cursor');
        setCursorType(type);
        if (type === 'portrait') setCursorLabel('VIEW VISION');
        else if (type === 'project') setCursorLabel('EXPLORE');
        else setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseLeave);

    // Hide on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) setIsVisible(false);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Premium variants for different cursor states
  const ringVariants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)',
    },
    portrait: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(2px)',
    },
    project: {
      width: 90,
      height: 90,
      backgroundColor: 'rgba(201, 169, 110, 0.1)', // Gold tint
      border: '1px solid #C9A96E', // Gold border
    },
    link: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '2px solid #FFFFFF',
    },
  };

  const dotVariants = {
    default: { width: 6, height: 6, opacity: 1 },
    portrait: { width: 0, height: 0, opacity: 0 },
    project: { width: 0, height: 0, opacity: 0 },
    link: { width: 8, height: 8, opacity: 1 },
  };

  if (!isVisible) return null;

  return (
    <>
      {/* The Trailing Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorLabel ? 1 : 0 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}
        >
          {cursorLabel}
        </motion.span>
      </motion.div>

      {/* The Center Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
        }}
        variants={dotVariants}
        animate={cursorType}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  );
}
