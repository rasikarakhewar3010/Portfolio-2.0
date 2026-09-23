'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

export default function useScrambleText(targetText, { duration = 1800, delay = 0, trigger = true } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const scramble = useCallback(() => {
    if (!trigger || !targetText) return;
    
    const chars = targetText.split('');
    const totalChars = chars.length;
    
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad for natural feeling
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const resolvedCount = Math.floor(easedProgress * totalChars);
      
      const result = chars.map((char, i) => {
        if (char === ' ') return ' ';
        if (i < resolvedCount) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      
      setDisplayText(result);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
        setIsComplete(true);
      }
    };
    
    const delayTimeout = setTimeout(() => {
      startTimeRef.current = null;
      frameRef.current = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(delayTimeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [targetText, duration, delay, trigger]);

  useEffect(() => {
    const cleanup = scramble();
    return cleanup;
  }, [scramble]);

  return { displayText, isComplete };
}
