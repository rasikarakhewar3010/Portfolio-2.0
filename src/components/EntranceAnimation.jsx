'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// --- Scramble text decode helper ---
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function scrambleTextReveal(element, duration = 1.8) {
  if (!element) return;
  const finalText = element.textContent;
  const chars = finalText.split('');
  const totalFrames = Math.floor(duration * 60); // ~60fps
  let frame = 0;

  function animate() {
    const progress = Math.min(frame / totalFrames, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 2); // ease out quad
    const resolvedCount = Math.floor(easedProgress * chars.length);

    element.textContent = chars
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (i < resolvedCount) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join('');

    frame++;
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = finalText;
    }
  }

  // Start with scrambled text
  element.textContent = chars
    .map((c) => (c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
    .join('');
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
  requestAnimationFrame(animate);
}

export default function EntranceAnimation() {
  const hasRun = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // --- Enhanced section reveal animations ---
    function revealSection(panel) {
      if (prefersReducedMotion) {
        // Simple instant reveal for accessibility
        const allElements = panel.querySelectorAll('[data-animate], .skills-heading, .skills-card, .project-card, .stat-item, .contact-heading, .contact-subtext, .contact-email, .contact-socials');
        allElements.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
        return;
      }

      const id = panel.id;

      // Section label entrance — universal for all sections
      const label = panel.querySelector('[data-animate="section-label"]');
      if (label) {
        const line = label.querySelector('::before') || label;
        gsap.fromTo(label,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' }
        );
      }

      // ========== SKILLS SECTION ==========
      if (id === 'skills') {
        const heading = panel.querySelector('.skills-heading');
        const cards = panel.querySelectorAll('.skills-card');
        const badges = panel.querySelectorAll('.skill-badge');

        // Heading scramble decode effect
        if (heading) {
          setTimeout(() => scrambleTextReveal(heading, 1.8), 100);
        }

        // Card waterfall cascade — column by column
        if (cards.length) {
          // Animate card border draw-on first
          cards.forEach((card, i) => {
            const borderEl = card;
            gsap.fromTo(borderEl,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.8,
                ease: 'expo.out',
                delay: 0.2 + (i % 3) * 0.15,
              }
            );
          });

          // Card content cascade with 3D feel
          gsap.fromTo(cards,
            { opacity: 0, y: 60, rotateX: -8 },
            {
              opacity: 1, y: 0, rotateX: 0,
              stagger: {
                each: 0.08,
                from: 'start',
              },
              duration: 0.7,
              ease: 'expo.out',
              delay: 0.3,
            }
          );
        }

        // Badge pop-in stagger with playful overshoot
        if (badges.length) {
          gsap.fromTo(badges,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1,
              stagger: 0.03,
              duration: 0.4,
              ease: 'back.out(1.7)',
              delay: 1.0,
            }
          );
        }

      // ========== PROJECTS SECTION ==========
      } else if (id === 'projects') {
        const heading = panel.querySelector('.projects-heading');
        const projectCards = panel.querySelectorAll('.project-card');
        const scrollHint = panel.querySelector('.projects-scroll-hint');

        // Heading character reveal
        if (heading) {
          const text = heading.textContent;
          heading.innerHTML = '';
          text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100%)';
            heading.appendChild(span);
          });

          gsap.to(heading.children, {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            duration: 0.6,
            ease: 'expo.out',
            delay: 0.1,
          });
        }

        // Card 3D cascade entrance from left
        if (projectCards.length) {
          gsap.fromTo(projectCards,
            { opacity: 0, x: 80, rotateY: -15 },
            {
              opacity: 1, x: 0, rotateY: 0,
              stagger: 0.12,
              duration: 1,
              ease: 'expo.out',
              delay: 0.3,
            }
          );
        }

        // Scroll hint fade in
        if (scrollHint) {
          gsap.fromTo(scrollHint,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 1.2 }
          );
        }

      // ========== ABOUT SECTION ==========
      } else if (id === 'about') {
        const pullQuote = panel.querySelector('[data-animate="pull-quote"]');
        const bodyParagraphs = panel.querySelectorAll('[data-animate="about-body"] p');
        const statsContainer = panel.querySelector('[data-animate="stats"]');
        const statsItems = panel.querySelectorAll('[data-animate="stats"] .stat-item');
        const statNumbers = panel.querySelectorAll('.stat-number');
        const certBtn = panel.querySelector('.certificates-trigger-btn');

        // Pull quote clip-path line reveal
        if (pullQuote) {
          gsap.fromTo(pullQuote,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0 0% 0)', opacity: 1,
              duration: 1.0,
              ease: 'expo.out',
              delay: 0.1,
            }
          );
        }

        // Body paragraphs with blur-to-focus cascade
        if (bodyParagraphs.length) {
          gsap.fromTo(bodyParagraphs,
            { opacity: 0, y: 25, filter: 'blur(6px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)',
              stagger: 0.15,
              duration: 0.7,
              ease: 'power3.out',
              delay: 0.4,
            }
          );
        }

        // Stats border draw-on from center
        if (statsContainer) {
          const borderLine = statsContainer;
          gsap.fromTo(borderLine,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'expo.out',
              delay: 0.8,
              transformOrigin: 'center',
            }
          );
        }

        // Stats counter roll animation
        if (statNumbers.length) {
          statNumbers.forEach((numEl, i) => {
            const text = numEl.textContent;
            const numMatch = text.match(/(\d+)/);
            const suffix = text.replace(/\d+/, '');

            if (numMatch) {
              const endVal = parseInt(numMatch[1], 10);
              const obj = { val: 0 };
              numEl.textContent = '0' + suffix;

              gsap.to(obj, {
                val: endVal,
                duration: 1.8,
                delay: 1.0 + i * 0.15,
                ease: 'power2.out',
                snap: { val: 1 },
                onUpdate: () => {
                  numEl.textContent = Math.round(obj.val) + suffix;
                },
              });
            }
          });
        }

        // Stats items fade in
        if (statsItems.length) {
          gsap.fromTo(statsItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: 'power3.out',
              delay: 1.0,
            }
          );
        }

        // Credentials button entrance
        if (certBtn) {
          gsap.fromTo(certBtn,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 1.6 }
          );
        }

      // ========== CONTACT SECTION ==========
      } else if (id === 'contact') {
        const heading = panel.querySelector('[data-animate="contact-heading"]');
        const subtext = panel.querySelector('[data-animate="contact-subtext"]');
        const email = panel.querySelector('[data-animate="contact-email"]');
        const socials = panel.querySelectorAll('[data-animate="contact-socials"] a');
        const backToTop = panel.querySelector('.back-to-top');

        // Heading 3D flip reveal — word by word
        if (heading) {
          const text = heading.innerHTML;
          const words = text.split(/(<br\s*\/?>|\s+)/);
          heading.innerHTML = '';

          const perspectiveWrap = heading.closest('.perspective-container') || heading;
          if (perspectiveWrap) perspectiveWrap.style.perspective = '1000px';

          words.forEach((word) => {
            if (word.match(/<br\s*\/?>/)) {
              heading.appendChild(document.createElement('br'));
            } else if (word.trim()) {
              const span = document.createElement('span');
              span.textContent = word;
              span.style.display = 'inline-block';
              span.style.opacity = '0';
              span.style.transform = 'translateY(120%) rotateX(-60deg)';
              span.style.transformOrigin = 'bottom center';
              heading.appendChild(span);
              // Add space after word
              heading.appendChild(document.createTextNode(' '));
            }
          });

          heading.style.opacity = '1';

          gsap.to(heading.querySelectorAll('span'), {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: 'expo.out',
            delay: 0.1,
          });
        }

        // Subtext fade with blur
        if (subtext) {
          gsap.fromTo(subtext,
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', delay: 0.6 }
          );
        }

        // Email scale-in
        if (email) {
          gsap.fromTo(email,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.9 }
          );
        }

        // Social links stagger from below with mask
        if (socials.length) {
          gsap.fromTo(socials,
            { opacity: 0, y: 25 },
            {
              opacity: 1, y: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: 'power3.out',
              delay: 1.2,
            }
          );
        }

        // Back to top button
        if (backToTop) {
          gsap.fromTo(backToTop,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 1.8 }
          );
        }
      }
    }

    // --- Helper: update nav colors based on active section ---
    function updateNavColors(panel) {
      if (panel.id === 'skills') {
        if (document.querySelector('.nav-link')) {
          gsap.to('.nav-link', { color: '#9E0018', duration: 0.6 });
        }
        if (document.querySelector('.nav-underline')) {
          gsap.to('.nav-underline', { backgroundColor: '#9E0018', duration: 0.6 });
        }
        document.querySelector('.navigation')?.classList.add('dark-nav');
      } else {
        if (document.querySelector('.nav-link')) {
          gsap.to('.nav-link', { color: 'rgba(255, 255, 255, 0.85)', duration: 0.6 });
        }
        if (document.querySelector('.nav-underline')) {
          gsap.to('.nav-underline', { backgroundColor: 'rgba(255, 255, 255, 0.9)', duration: 0.6 });
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

      // Subtle parallax rise on panel entry (scrub-linked)
      if (!prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(panel, {
              y: (1 - progress) * 20,
              opacity: 0.85 + progress * 0.15,
            });
          },
        });
      }

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
