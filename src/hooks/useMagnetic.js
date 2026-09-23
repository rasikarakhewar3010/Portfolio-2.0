'use client';
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function useMagnetic(ref, { strength = 0.3, radius = 50, ease = 'power3.out' } = {}) {
  const quickX = useRef(null);
  const quickY = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    // Use quickTo for buttery smooth magnetic tracking
    quickX.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease });
    quickY.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease });
  }, [ref, ease]);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || !quickX.current || !quickY.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < radius) {
      quickX.current(deltaX * strength);
      quickY.current(deltaY * strength);
    }
  }, [ref, strength, radius]);

  const handleMouseLeave = useCallback(() => {
    if (!quickX.current || !quickY.current) return;
    quickX.current(0);
    quickY.current(0);
  }, []);

  return { handleMouseMove, handleMouseLeave };
}
