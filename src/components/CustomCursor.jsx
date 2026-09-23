'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

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

  // Ghost trail springs (slower follow)
  const ghost1Config = { damping: 22, stiffness: 150, mass: 1.2 };
  const ghost1X = useSpring(mouseX, ghost1Config);
  const ghost1Y = useSpring(mouseY, ghost1Config);

  const ghost2Config = { damping: 18, stiffness: 100, mass: 1.6 };
  const ghost2X = useSpring(mouseX, ghost2Config);
  const ghost2Y = useSpring(mouseY, ghost2Config);

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
        // Check if hovering over skill badges
        const badge = e.target.closest('.skill-badge');
        if (badge) {
          setCursorType('skill');
          setCursorLabel('');
        } else {
          setCursorType('default');
          setCursorLabel('');
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Click squeeze effect
    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    // Scroll state detection
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Hide on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) setIsVisible(false);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mouseX, mouseY, isVisible]);

  // Premium variants for different cursor states
  const ringVariants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)',
      scaleX: 1,
      scaleY: 1,
    },
    portrait: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(2px)',
      scaleX: 1,
      scaleY: 1,
    },
    project: {
      width: 90,
      height: 90,
      backgroundColor: 'rgba(201, 169, 110, 0.1)',
      border: '1px solid #C9A96E',
      scaleX: 1,
      scaleY: 1,
    },
    link: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '2px solid #FFFFFF',
      scaleX: 1,
      scaleY: 1,
    },
    skill: {
      width: 30,
      height: 30,
      backgroundColor: 'rgba(158, 0, 24, 0.08)',
      border: '1.5px solid #9E0018',
      scaleX: 1,
      scaleY: 1,
    },
  };

  const dotVariants = {
    default: { width: 6, height: 6, opacity: 1 },
    portrait: { width: 0, height: 0, opacity: 0 },
    project: { width: 0, height: 0, opacity: 0 },
    link: { width: 8, height: 8, opacity: 1 },
    skill: { width: 4, height: 4, opacity: 1 },
  };

  // Apply click squeeze and scroll state modifiers
  const getRingAnimation = () => {
    const base = ringVariants[cursorType] || ringVariants.default;
    if (isPressed) {
      return { ...base, scaleX: 1.3, scaleY: 0.7 };
    }
    if (isScrolling) {
      return { ...base, width: (base.width || 40) * 0.6, height: (base.height || 40) * 0.6 };
    }
    return base;
  };

  const getDotAnimation = () => {
    const base = dotVariants[cursorType] || dotVariants.default;
    if (isScrolling) {
      return { ...base, width: (base.width || 6) * 1.3, height: (base.height || 6) * 1.3 };
    }
    return base;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Ghost Trail Ring 2 (furthest behind) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ghost2X,
          y: ghost2Y,
          transform: 'translate(-50%, -50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Ghost Trail Ring 1 */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ghost1X,
          y: ghost1Y,
          transform: 'translate(-50%, -50%)',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

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
        animate={getRingAnimation()}
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
        animate={getDotAnimation()}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  );
}
