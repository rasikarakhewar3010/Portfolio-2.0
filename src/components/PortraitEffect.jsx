'use client';

import { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function PortraitEffect() {
  const [isHovered, setIsHovered] = useState(false);

  // Physics-based springs for the absolute smoothest feel possible
  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const hoverSpring = useSpring(0, springConfig);

  // When hovered, the spring smoothly goes from 0 to 1
  if (isHovered) {
    hoverSpring.set(1);
  } else {
    hoverSpring.set(0);
  }

  // Transform the spring value into beautiful visual properties
  const glowScale = useTransform(hoverSpring, [0, 1], [0.8, 1.8]);
  const glowOpacity = useTransform(hoverSpring, [0, 1], [0, 1]);
  const glowBlur = useTransform(hoverSpring, [0, 1], ['blur(20px)', 'blur(40px)']);

  const imageScale = useTransform(hoverSpring, [0, 1], [1, 1.02]);
  
  return (
    <div
      className="hero-portrait-wrapper"
      data-animate="portrait"
      data-cursor="portrait"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {/* Intense Radiant Glow passing out through the image on hover */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle closest-side, rgba(255, 255, 255, 0.65) 0%, rgba(255, 120, 120, 0.35) 40%, transparent 100%)',
          x: '-50%',
          y: '-50%',
          scale: glowScale,
          opacity: glowOpacity,
          filter: glowBlur,
          zIndex: 1, // Behind the image
          pointerEvents: 'none',
        }}
      />
      
      <motion.img
        src="/portrait.png"
        alt="Rasika Rakhewar"
        className="hero-portrait"
        style={{
          position: 'relative',
          zIndex: 4,
          scale: imageScale,
          transformOrigin: 'bottom center',
        }}
        crossOrigin="anonymous"
      />
    </div>
  );
}
