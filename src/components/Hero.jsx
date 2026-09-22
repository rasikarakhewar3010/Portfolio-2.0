'use client';

import PortraitEffect from './PortraitEffect';
import BackgroundReveal from './BackgroundReveal';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <BackgroundReveal />
      {/* Background radial glow */}
      <div className="hero-radial-glow"></div>

      <div className="hero-content">
        {/* Left Column: Greeting and Roles */}
        <div className="hero-left-container" data-animate="hero-left">
          <p className="hero-im" data-animate="greeting">
            I'm
          </p>
          <h1 className="hero-name" data-animate="name">
            RASIKA
          </h1>
          <p className="hero-roles" data-animate="roles">
            Full-Stack MERN Developer & AI Engineer
          </p>
          <p className="hero-description" data-animate="roles">
            Building scalable web applications, intuitive interfaces, and AI-powered solutions that solve real-world problems. Blending technical precision with creative design.
          </p>
        </div>

        {/* Right Column: Editorial Metas to balance the layout */}
        <div className="hero-right-container" data-animate="hero-right">
          <div className="editorial-meta-item">
            <span className="meta-label">LOC</span>
            <span className="meta-value">INDIA</span>
          </div>
          <div className="editorial-meta-item">
            <span className="meta-label">EST</span>
            <span className="meta-value">©2026</span>
          </div>
          <div className="editorial-meta-item">
            <span className="meta-label">ACTION</span>
            <span className="meta-value">SCROLL DOWN</span>
          </div>
        </div>
      </div>

      {/* Center Column: Portrait Container (Giant from bottom) */}
      <div className="hero-portrait-container">
        <PortraitEffect />
      </div>
    </section>
  );
}
