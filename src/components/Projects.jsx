'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const PROJECTS_DATA = [
  {
    "id": "jsvoice",
    "title": "JSVoice Library",
    "description": "A powerful JavaScript library for voice-controlled UI automation. Published on NPM with comprehensive documentation and demo website.",
    "image": "/Project Img/jsvoice.png",
    "tags": ["JavaScript", "Web Speech API", "NPM", "Open Source"],
    "liveLink": "https://js-voice-website-pi.vercel.app/",
    "githubLink": "https://github.com/VoiceUI-js/JSVoice",
    "npmLink": "https://www.npmjs.com/package/jsvoice"
  },
  {
    "id": "portfolio",
    "title": "Personal Portfolio",
    "description": "A fully responsive and animated portfolio built using React, showcasing projects, skills, and achievements.",
    "image": "/Project Img/Portfolio.png",
    "tags": ["React", "Framer Motion", "TailwindCSS"],
    "liveLink": "https://rasikarakhewar.vercel.app/",
    "githubLink": "https://github.com/rasikarakhewar3010/Portfolio"
  },
  {
    "id": "bloomskin",
    "title": "BloomSkin",
    "description": "AI-powered skin analysis using MobileNetV2, FastAPI, React, and MongoDB.",
    "image": "/Project Img/BLOOM SKIN LOGO.PNG",
    "tags": ["React", "FastAPI", "MongoDB", "AI/ML"],
    "liveLink": "https://bloomskin.vercel.app/",
    "githubLink": "https://github.com/rasikarakhewar3010/Bloom-Skin"
  },
  {
    "id": "bloodlink",
    "title": "BloodLink",
    "description": "Role-based MERN blood donation management platform.",
    "image": "/Project Img/BloodLink Logo.png",
    "tags": ["MongoDB", "Express", "React", "Node.js"],
    "liveLink": "https://bloodlink-qmva.onrender.com/",
    "githubLink": "https://github.com/rasikarakhewar3010/BloodLink"
  },
  {
    "id": "mgm",
    "title": "MGEM Website",
    "description": "A website developed for MGEM with modern UI/UX, interactive sections, and optimized performance.",
    "image": "/Project Img/mgm logo.png",
    "tags": ["MongoDB", "Express", "React", "Node.js"],
    "liveLink": "https://mgmwebfrontend-mhu0.onrender.com/",
    "githubLink": "https://github.com/rasikarakhewar3010/MGMWEBFRONTEND"
  },
  {
    "id": "hackhub",
    "title": "HackHub",
    "description": "A complete hackathon management system allowing users to organize and participate. Built using EJS, Node.js, Express, MongoDB, Cloudinary, GSAP, and Three.js.",
    "image": "/Project Img/HackHub.png",
    "tags": ["Node.js", "Express", "MongoDB", "EJS", "GSAP", "Three.js"],
    "liveLink": "https://hackhub-mzj8.onrender.com/hackathon",
    "githubLink": "https://github.com/rasikarakhewar3010/HackHub"
  }
];

export default function Projects() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="projects-section-new" id="projects">
      {/* Section Header */}
      <div className="projects-header">
        <div className="section-label" data-animate="section-label">
          <span>02</span> Selected Work
        </div>
        <h2 className="projects-heading">
          Featured Projects
        </h2>
      </div>

      {/* Carousel */}
      <div className="projects-carousel-container">
        {/* Left gradient fade edge */}
        <div className={`carousel-fade-edge fade-left ${canScrollLeft ? 'visible' : ''}`} />

        {/* Left Arrow */}
        <button 
          className={`carousel-arrow prev ${canScrollLeft ? '' : 'hidden-arrow'}`}
          onClick={() => scroll('left')}
          aria-label="Previous Projects"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="projects-scroll-viewport" ref={scrollRef}>
          <div className="projects-horizontal-scroll">
            {PROJECTS_DATA.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="project-card"
                data-animate="project-card"
                data-cursor="link"
              >
                {/* Image */}
                <div className="project-card-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="project-card-fallback-gradient shimmer-effect" style={{ display: 'none' }}>
                    <span>{project.title[0]}</span>
                  </div>

                  {/* Overlay on hover */}
                  <div className="project-card-overlay">
                    <span className="project-card-view">View Case Study</span>
                  </div>
                </div>

                {/* Content */}
                <div className="project-card-content">
                  <div>
                    <div className="project-card-number">{String(index + 1).padStart(2, '0')}</div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">{project.description}</p>
                    
                    <div className="project-card-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="project-card-tag">{tag}</span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-card-tag">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="project-card-footer-links">
                    <span className="learn-more-btn">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          className={`carousel-arrow next ${canScrollRight ? '' : 'hidden-arrow'}`}
          onClick={() => scroll('right')}
          aria-label="Next Projects"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Right gradient fade edge */}
        <div className={`carousel-fade-edge fade-right ${canScrollRight ? 'visible' : ''}`} />
      </div>

      {/* Scroll progress bar + hint */}
      <div className="projects-scroll-hint">
        <span>Scroll to explore</span>
        <div className="scroll-progress-container">
          <div
            className="scroll-progress-fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
