'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function EntranceAnimation() {
  const hasRun = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const panels = Array.from(document.querySelectorAll('.panel'));
    if (panels.length === 0) return;

    // --- Intro animation for Hero ---
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (document.querySelector('[data-animate="portrait"]')) {
      introTl.to('[data-animate="portrait"]', {
        opacity: 1, y: 0, scale: 1, duration: 2.2, ease: 'expo.out',
      }, '-=0.4');
    }

    if (document.querySelector('[data-animate="circular-text"]')) {
      introTl.to('[data-animate="circular-text"]', {
        opacity: 1, duration: 1.8, ease: 'expo.out',
      }, '-=1.6');
    }

    if (document.querySelector('[data-animate="hero-left"]')) {
      introTl.to('[data-animate="hero-left"]', {
        opacity: 1, y: 0, duration: 1.6, ease: 'expo.out',
      }, '-=1.4');
    }

    if (document.querySelector('[data-animate="hero-right"]')) {
      introTl.to('[data-animate="hero-right"]', {
        opacity: 1, y: 0, duration: 1.6, ease: 'expo.out',
      }, '-=1.4');
    }

    if (document.querySelector('.navigation')) {
      introTl.to('.navigation', {
        opacity: 1, duration: 0.8, ease: 'power3.out',
      }, '-=1.0');
    }

    if (document.querySelector('.nav-link')) {
      introTl.from('.nav-link', {
        opacity: 0, y: -15, stagger: 0.12, duration: 0.8, ease: 'power3.out',
      }, '-=0.6');
    }

    // --- Helper: animate section inner elements on entry ---
    function revealSection(panel) {
      const id = panel.id;
      const label = panel.querySelector('[data-animate="section-label"]');
      if (label) {
        gsap.fromTo(label, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' });
      }

      if (id === 'skills') {
        const heading = panel.querySelector('.skills-heading');
        const cards = panel.querySelectorAll('.skills-card');
        if (heading) gsap.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
        if (cards.length) gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.15 });
      } else if (id === 'projects') {
        const projectCards = panel.querySelectorAll('.project-card');
        if (projectCards.length) gsap.fromTo(projectCards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      } else if (id === 'about') {
        const pullQuote = panel.querySelector('[data-animate="pull-quote"]');
        const bodyParagraphs = panel.querySelectorAll('[data-animate="about-body"] p');
        const statsItems = panel.querySelectorAll('[data-animate="stats"] .stat-item');
        if (pullQuote) gsap.fromTo(pullQuote, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
        if (bodyParagraphs.length) gsap.fromTo(bodyParagraphs, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.2 });
        if (statsItems.length) gsap.fromTo(statsItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.3 });
      } else if (id === 'contact') {
        const heading = panel.querySelector('[data-animate="contact-heading"]');
        const subtext = panel.querySelector('[data-animate="contact-subtext"]');
        const email = panel.querySelector('[data-animate="contact-email"]');
        const socials = panel.querySelectorAll('[data-animate="contact-socials"] a');
        if (heading) gsap.fromTo(heading, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 });
        if (subtext) gsap.fromTo(subtext, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2 });
        if (email) gsap.fromTo(email, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 });
        if (socials.length) gsap.fromTo(socials, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.4 });
      }
    }

    // --- Helper: update nav colors based on active section ---
    function updateNavColors(panel) {
      if (panel.id === 'skills') {
        if (document.querySelector('.nav-link')) {
          gsap.to('.nav-link', { color: '#9E0018', duration: 0.4 });
        }
        if (document.querySelector('.nav-underline')) {
          gsap.to('.nav-underline', { backgroundColor: '#9E0018', duration: 0.4 });
        }
        document.querySelector('.navigation')?.classList.add('dark-nav');
      } else {
        if (document.querySelector('.nav-link')) {
          gsap.to('.nav-link', { color: 'rgba(255, 255, 255, 0.85)', duration: 0.4 });
        }
        if (document.querySelector('.nav-underline')) {
          gsap.to('.nav-underline', { backgroundColor: 'rgba(255, 255, 255, 0.9)', duration: 0.4 });
        }
        document.querySelector('.navigation')?.classList.remove('dark-nav');
      }
    }

    // --- Core: Create ScrollTriggers for section reveal and nav coloring ---
    panels.forEach((panel) => {
      // Reveal animations
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 80%',
        onEnter: () => revealSection(panel),
        once: true,
      });

      // Navigation colors
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) {
            updateNavColors(panel);
          }
        },
      });
    });

    // --- Go to section by index (smooth scroll to panel) ---
    function goToSection(targetIndex) {
      const targetPanel = panels[targetIndex];
      if (targetPanel) {
        targetPanel.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Expose globally for Navigation component
    window.goToSection = goToSection;
    
    // Expose current index getter based on scroll position
    window.getCurrentSectionIndex = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      const index = panels.findIndex((panel) => {
        const rect = panel.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        return scrollY >= top && scrollY <= bottom;
      });
      return index !== -1 ? index : 0;
    };

    // --- Cleanup ---
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      delete window.goToSection;
      delete window.getCurrentSectionIndex;
    };
  }, []);

  return null;
}
