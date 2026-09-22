'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const TECH_SNIPPETS = [
  'const { useState } = React;',
  'interface Designer {',
  '  vision: Infinity;',
  '  craft: "pixel-perfect";',
  '}',
  'npm run build',
  'git commit -m "perfection"',
  '<Component style={elegant} />',
  'type Creative = Art & Code;',
  'figma.design.system.v2',
  'const neural = new Network();',
  '@keyframes breathe { }',
  'export default function App()',
  '01001011 01010010 01000001',
  '10110010 01011001 00101110',
  'const [state, setState] =',
  'useEffect(() => { }, []);',
  'border-radius: 50%;',
  'display: grid;',
  'gap: var(--space-lg);',
  'async function fetchData()',
  'return <Fragment>',
  'className={styles.hero}',
  'position: absolute;',
  'transform: translate3d(',
  'const ctx = canvas.getContext',
  'requestAnimationFrame(loop);',
  'import { motion } from',
  'transition: all 0.3s ease;',
  '/// neural_net.weights.adjust',
  'fn render(&self) -> Html {',
  'SELECT * FROM designs',
  'docker compose up -d',
  'kubectl apply -f deploy.yml',
];

export default function BackgroundReveal() {
  const [mounted, setMounted] = useState(false);

  // Framer Motion absolute smooth tracking
  const mouseX = useMotionValue(-1000); // Start far offscreen
  const mouseY = useMotionValue(-1000);
  
  // High-end physics for silky smooth trailing
  const springConfig = { damping: 30, stiffness: 150, mass: 1.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Create the radial gradient string dynamically from the springs
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(circle 280px at ${x}px ${y}px, black 0%, transparent 100%)`
  );

  // Generate static positions for the texts once
  const snippets = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const items = [];
    // Create a dense grid of text
    for (let i = 0; i < 150; i++) {
      items.push({
        id: i,
        text: TECH_SNIPPETS[Math.floor(Math.random() * TECH_SNIPPETS.length)],
        top: Math.random() * 100, // percentage
        left: Math.random() * 100, // percentage
        fontSize: 12 + Math.random() * 14,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        // The hardware accelerated mask effect powered by Framer Motion
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
      }}
    >
      {snippets.map((snippet) => (
        <span
          key={snippet.id}
          style={{
            position: 'absolute',
            top: `${snippet.top}%`,
            left: `${snippet.left}%`,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: `${snippet.fontSize}px`,
            color: `rgba(255, 255, 255, ${snippet.opacity})`,
            whiteSpace: 'nowrap',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {snippet.text}
        </span>
      ))}
    </motion.div>
  );
}
