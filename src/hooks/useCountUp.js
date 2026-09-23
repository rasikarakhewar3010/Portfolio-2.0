'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function useCountUp(endValue, { duration = 1.8, delay = 0, trigger = true, suffix = '' } = {}) {
  const [displayValue, setDisplayValue] = useState('0');
  const objRef = useRef({ val: 0 });

  useEffect(() => {
    if (!trigger) return;
    
    const numericEnd = parseInt(endValue, 10);
    if (isNaN(numericEnd)) {
      setDisplayValue(String(endValue));
      return;
    }
    
    objRef.current.val = 0;
    
    const tween = gsap.to(objRef.current, {
      val: numericEnd,
      duration,
      delay,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => {
        setDisplayValue(String(Math.round(objRef.current.val)) + suffix);
      },
      onComplete: () => {
        setDisplayValue(String(numericEnd) + suffix);
      },
    });

    return () => tween.kill();
  }, [endValue, duration, delay, trigger, suffix]);

  return displayValue;
}
