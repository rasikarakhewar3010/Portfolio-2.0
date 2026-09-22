'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import SmoothScroll from '@/components/SmoothScroll';
import EntranceAnimation from '@/components/EntranceAnimation';

export default function Home() {
  return (
    <SmoothScroll>
      {/* Background Layers */}
      <div className="page-background" />
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Page Content - Full Screen Pinned Panel Slider */}
      <main className="panel-container">
        <div className="panel" id="hero">
          <Hero />
        </div>
        <div className="panel" id="skills">
          <Skills />
        </div>
        <div className="panel" id="projects">
          <Projects />
        </div>
        <div className="panel" id="about">
          <About />
        </div>
        <div className="panel" id="contact">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2025 Rasika Rakhewar — Designed & Developed with precision
        </p>
      </footer>

      {/* Entrance Animation Controller */}
      <EntranceAnimation />
    </SmoothScroll>
  );
}
