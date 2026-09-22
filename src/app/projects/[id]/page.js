'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const PROJECTS_DETAILS = {
  jsvoice: {
    title: "JSVoice Library",
    subtitle: "NPM Voice-Controlled UI Automation Library",
    role: "Lead Developer & Designer",
    year: "2026",
    duration: "3 months",
    type: "Open Source Library",
    description: "A powerful JavaScript library designed to make voice-controlled UI automation accessible for developers. Published on NPM with comprehensive documentation and a live demo website.",
    image: "/Project Img/jsvoice.png",
    tags: ["JavaScript", "Web Speech API", "NPM", "Open Source"],
    github: "https://github.com/VoiceUI-js/JSVoice",
    live: "https://js-voice-website-pi.vercel.app/",
    npm: "https://www.npmjs.com/package/jsvoice",
    overview: "JSVoice is designed to bridge the gap between speech recognition and user interface automation. It allows developers to register voice commands that trigger click events, navigation, form inputs, and custom callbacks with just a few lines of code. The library abstracts away the complexities of the Web Speech API, offering a clean, declarative interface that any front-end developer can integrate in minutes.",
    challenges: [
      "Handling different browser implementations of the Web Speech API, specifically in mobile viewports where microphone access behavior varies significantly.",
      "Developing a flexible syntax for word matching that allows semantic variances — for example, matching 'go to contact' and 'open contact' to the same trigger without hard-coding every possible phrase.",
      "Optimizing microphone permission flows and providing real-time UI feedback indicators so users always know the recognition state."
    ],
    solutions: [
      "Wrote a robust normalization layer that detects browser support, manages graceful degradation, and provides fallback speech recognition mechanics for unsupported environments.",
      "Implemented a custom Regex command resolver that handles parameterized commands and synonyms dynamically, allowing developers to define flexible matching patterns.",
      "Designed clean utility wrappers that provide visual access to microphone status, speech confidence levels, and active recognition states through customizable UI components."
    ],
    keyFeatures: [
      "Declarative voice command registration with a simple API",
      "Built-in synonym matching and fuzzy command resolution",
      "Real-time confidence scoring and status indicators",
      "Zero-dependency core with optional UI companion components",
      "Full TypeScript support with exported type definitions"
    ],
    stack: ["JavaScript (ES6+)", "Web Speech API", "NPM Publishing", "Vite", "Vitest"]
  },
  portfolio: {
    title: "Personal Portfolio",
    subtitle: "A Premium Editorial Web Experience",
    role: "Design & Development",
    year: "2026",
    duration: "Ongoing",
    type: "Personal Branding",
    description: "A fully responsive, highly animated, and premium portfolio showcasing projects, interactive skills, and achievements.",
    image: "/Project Img/Portfolio.png",
    tags: ["React", "Framer Motion", "TailwindCSS"],
    github: "https://github.com/rasikarakhewar3010/Portfolio",
    live: "https://rasikarakhewar.vercel.app/",
    overview: "This portfolio was designed from the ground up to reflect a luxurious editorial aesthetic. Rather than following generic modern web layouts, it draws inspiration from high-end fashion magazines and luxury branding — using strong typography, precise layout lines, and cinematic textures like film grain and linen canvas to create an immersive, scroll-driven experience.",
    challenges: [
      "Implementing smooth vertical scroll alongside horizontal panel sections using GSAP and Lenis without causing layout reflows or performance drops.",
      "Optimizing heavy canvas-based noise overlays and texture layers for mobile devices without causing frame drops or battery drain."
    ],
    solutions: [
      "Utilized custom GSAP timeline pinning and snap configurations to create a card-slide curtain wipe scroll effect that feels natural and cinematic.",
      "Implemented CSS-based hardware acceleration on fixed overlays and carefully optimized render loops to maintain 60fps across all devices."
    ],
    keyFeatures: [
      "Full-page curtain slide transitions between sections",
      "Cinematic film grain and linen texture overlays",
      "Interactive skill badges with playful hover animations",
      "Custom cursor with context-aware states",
      "Netflix-style horizontal project carousel"
    ],
    stack: ["React.js", "Next.js", "GSAP", "Framer Motion", "Vanilla CSS"]
  },
  bloomskin: {
    title: "BloomSkin",
    subtitle: "AI-Powered Dermatological Skin Analysis",
    role: "Full Stack Engineer",
    year: "2025",
    duration: "4 months",
    type: "AI/ML Web Application",
    description: "AI-powered skin analysis application utilizing convolutional neural networks, FastAPI, React, and MongoDB for structured data tracking.",
    image: "/Project Img/BLOOM SKIN LOGO.PNG",
    tags: ["React", "FastAPI", "MongoDB", "AI/ML"],
    github: "https://github.com/rasikarakhewar3010/Bloom-Skin",
    live: "https://bloomskin.vercel.app/",
    overview: "BloomSkin offers user-friendly skin analysis by uploading a photo. It uses a trained MobileNetV2 classification model to analyze skin conditions and recommends customized skincare routines. The application bridges the gap between dermatological expertise and everyday skincare, making professional-grade skin analysis accessible to everyone through an intuitive web interface.",
    challenges: [
      "Deploying machine learning models with low latency on standard web server hosting tiers that have limited GPU resources.",
      "Securing sensitive user skin reports and health history in MongoDB while maintaining HIPAA-adjacent data practices.",
      "Building an intuitive upload and analysis flow that non-technical users can navigate comfortably."
    ],
    solutions: [
      "Optimized the FastAPI server to load the TensorFlow model globally in memory once at startup, reducing per-request inference time to sub-second ranges.",
      "Designed secure JWT token authentication flows and structured MongoDB schemas that encrypt personal health data at rest.",
      "Created a step-by-step wizard interface with real-time upload previews and animated progress indicators."
    ],
    keyFeatures: [
      "Real-time skin condition classification using MobileNetV2",
      "Personalized skincare routine recommendations",
      "Secure user profiles with encrypted health data",
      "Photo upload with live preview and analysis progress",
      "Historical tracking of skin health over time"
    ],
    stack: ["Python", "FastAPI", "TensorFlow / Keras", "React.js", "MongoDB", "Render"]
  },
  bloodlink: {
    title: "BloodLink",
    subtitle: "MERN Blood Donation & Management System",
    role: "Full Stack Developer",
    year: "2025",
    duration: "3 months",
    type: "Healthcare Platform",
    description: "A secure, role-based database tracking portal designed to coordinate donors, blood banks, and hospital requests in real time.",
    image: "/Project Img/BloodLink Logo.png",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/rasikarakhewar3010/BloodLink",
    live: "https://bloodlink-qmva.onrender.com/",
    overview: "BloodLink connects blood donors with regional banks and critical hospital requests, streamlining donation logistics during medical emergencies. The platform supports multiple user roles — Hospitals, Donors, Admins, and Blood Banks — each with tailored dashboards, permissions, and workflows that reflect real-world blood donation protocols.",
    challenges: [
      "Developing a complex, multi-role user system with distinct permissions, dashboards, and data access patterns for Hospitals, Donors, Admins, and Blood Banks.",
      "Handling real-time inventory updates on blood group availability across multiple banks without introducing race conditions or stale data."
    ],
    solutions: [
      "Implemented Express middleware with role-based validation chains for protected API routes, ensuring each user type only accesses authorized endpoints.",
      "Wrote transactional MongoDB query hooks using Mongoose middleware to prevent race conditions during concurrent inventory requests from multiple hospitals."
    ],
    keyFeatures: [
      "Multi-role authentication with tailored dashboards",
      "Real-time blood inventory tracking across banks",
      "Emergency request prioritization system",
      "Automated donor matching and notification",
      "Admin analytics and reporting dashboard"
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB (Mongoose)", "TailwindCSS"]
  },
  mgm: {
    title: "MGEM Website",
    subtitle: "Modern Institutional Web Portal",
    role: "Lead Frontend Developer",
    year: "2025",
    duration: "2 months",
    type: "Corporate Website",
    description: "A fast, content-heavy corporate website built with dynamic sections, a custom UI, and an administrative panel for site management.",
    image: "/Project Img/mgm logo.png",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/rasikarakhewar3010/MGMWEBFRONTEND",
    live: "https://mgmwebfrontend-mhu0.onrender.com/",
    overview: "Designed to reflect a modern corporate identity, the MGEM portal offers high-performance content loading, dynamic section management, and a secure back-end control panel. The website serves as the digital face of the institution, handling everything from news updates and event galleries to student resources and faculty directories.",
    challenges: [
      "Optimizing large image assets dynamically for fast load times across varying network conditions and device capabilities.",
      "Designing a clean, easily maintainable administrative portal that non-technical staff could use to update content independently."
    ],
    solutions: [
      "Used lazy loading with intersection observers, progressive image compression, and aggressive client-side caching strategies.",
      "Developed modular, form-based admin interfaces for adding news updates, gallery photos, and institutional events with drag-and-drop media uploads."
    ],
    keyFeatures: [
      "Dynamic content management admin panel",
      "Optimized image delivery with lazy loading",
      "Interactive campus gallery with lightbox",
      "Event calendar and announcement system",
      "Responsive design across all breakpoints"
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS Grid & Flexbox"]
  },
  hackhub: {
    title: "HackHub",
    subtitle: "Full-Featured Hackathon Management Platform",
    role: "Full Stack Developer & UX Designer",
    year: "2025",
    duration: "4 months",
    type: "Event Management Platform",
    description: "A complete platform allowing organizers to create, manage, and judge hackathons. Built using EJS, Node.js, Express, MongoDB, and Three.js.",
    image: "/Project Img/HackHub.png",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "GSAP", "Three.js"],
    github: "https://github.com/rasikarakhewar3010/HackHub",
    live: "https://hackhub-mzj8.onrender.com/hackathon",
    overview: "HackHub simplifies the logistics of hackathons end-to-end, allowing organizers to create events, manage registrations, assign judges, and track submissions. Participants can form teams, submit projects, and view live interactive 3D visualizations of hackathon statistics. The platform turns the chaos of hackathon management into a streamlined, visual experience.",
    challenges: [
      "Creating an interactive 3D landing page with smooth GSAP scroll-driven animations inside server-rendered EJS templates.",
      "Implementing secure file upload pipelines for heavy project archives and media submissions from multiple concurrent teams."
    ],
    solutions: [
      "Integrated Three.js inside EJS templates with custom WebGL render loops, optimized shaders, and GSAP timeline controllers for cinematic scroll effects.",
      "Used Cloudinary API for secure, automated asset storage with on-the-fly transformations, combined with chunked upload support for large files."
    ],
    keyFeatures: [
      "Interactive 3D landing page with WebGL visualizations",
      "Complete event lifecycle management",
      "Team formation and project submission system",
      "Judge assignment and scoring workflows",
      "Real-time leaderboard and analytics"
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "EJS", "GSAP", "Three.js", "Cloudinary"]
  }
};

export default function CaseStudyPage() {
  const params = useParams();
  const id = params.id;
  const project = PROJECTS_DETAILS[id];

  if (!project) {
    return (
      <div className="cs-error-page">
        <div className="cs-error-container">
          <div className="cs-error-code">404</div>
          <h1 className="cs-error-title">Project Not Found</h1>
          <p className="cs-error-desc">The case study you&apos;re looking for doesn&apos;t exist in our records.</p>
          <Link href="/" className="cs-back-btn">
            &larr; Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Get all project IDs for next/prev navigation
  const projectIds = Object.keys(PROJECTS_DETAILS);
  const currentIdx = projectIds.indexOf(id);
  const nextProject = currentIdx < projectIds.length - 1 ? projectIds[currentIdx + 1] : null;
  const prevProject = currentIdx > 0 ? projectIds[currentIdx - 1] : null;

  return (
    <main className="cs-page">
      {/* Background */}
      <div className="page-background" />
      <div className="noise-overlay" style={{ zIndex: 99 }} />

      {/* Fixed top bar */}
      <nav className="cs-topbar">
        <Link href="/" className="cs-topbar-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Portfolio
        </Link>
        <div className="cs-topbar-label">
          Case Study — {project.year}
        </div>
      </nav>

      {/* Hero */}
      <section className="cs-hero">
        <div className="cs-hero-meta">
          <span className="cs-meta-pill">{project.type}</span>
          <span className="cs-meta-pill">{project.role}</span>
          <span className="cs-meta-pill">{project.duration}</span>
        </div>

        <h1 className="cs-hero-title">{project.title}</h1>
        <p className="cs-hero-subtitle">{project.subtitle}</p>

        <div className="cs-hero-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="cs-hero-image"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="cs-hero-image-fallback" style={{ display: 'none' }}>
            <span>{project.title[0]}</span>
          </div>
        </div>

        {/* Quick action links */}
        <div className="cs-hero-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="cs-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="cs-action-btn cs-action-primary">
              Live Demo &rarr;
            </a>
          )}
          {project.npm && (
            <a href={project.npm} target="_blank" rel="noopener noreferrer" className="cs-action-btn">
              NPM Package
            </a>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="cs-divider" />

      {/* Overview */}
      <section className="cs-section">
        <div className="cs-section-header">
          <span className="cs-section-index">01</span>
          <h2 className="cs-section-title">Overview</h2>
        </div>
        <div className="cs-section-body cs-overview-body">
          <p className="cs-paragraph-large">{project.overview}</p>
        </div>
      </section>

      {/* Key Features */}
      {project.keyFeatures && (
        <>
          <div className="cs-divider" />
          <section className="cs-section">
            <div className="cs-section-header">
              <span className="cs-section-index">02</span>
              <h2 className="cs-section-title">Key Features</h2>
            </div>
            <div className="cs-section-body">
              <div className="cs-features-grid">
                {project.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="cs-feature-item">
                    <div className="cs-feature-number">{String(idx + 1).padStart(2, '0')}</div>
                    <p className="cs-feature-text">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Challenge & Solution */}
      <div className="cs-divider" />
      <section className="cs-section">
        <div className="cs-section-header">
          <span className="cs-section-index">03</span>
          <h2 className="cs-section-title">Challenge & Solution</h2>
        </div>
        <div className="cs-section-body">
          <div className="cs-challenge-grid">
            <div className="cs-challenge-col">
              <h3 className="cs-col-title">The Challenge</h3>
              {project.challenges.map((item, idx) => (
                <div key={idx} className="cs-challenge-item">
                  <div className="cs-challenge-icon">✕</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="cs-challenge-col">
              <h3 className="cs-col-title">The Solution</h3>
              {project.solutions.map((item, idx) => (
                <div key={idx} className="cs-challenge-item cs-solution-item">
                  <div className="cs-challenge-icon cs-solution-icon">✓</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <div className="cs-divider" />
      <section className="cs-section">
        <div className="cs-section-header">
          <span className="cs-section-index">04</span>
          <h2 className="cs-section-title">Technology Stack</h2>
        </div>
        <div className="cs-section-body">
          <div className="cs-stack-tags">
            {project.stack.map((tech) => (
              <span key={tech} className="cs-stack-tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to next/prev projects */}
      <div className="cs-divider" />
      <section className="cs-project-nav">
        <div className="cs-project-nav-side">
          {prevProject && (
            <Link href={`/projects/${prevProject}`} className="cs-project-nav-link">
              <span className="cs-nav-direction">&larr; Previous</span>
              <span className="cs-nav-project-name">{PROJECTS_DETAILS[prevProject].title}</span>
            </Link>
          )}
        </div>
        <div className="cs-project-nav-side cs-nav-right">
          {nextProject && (
            <Link href={`/projects/${nextProject}`} className="cs-project-nav-link">
              <span className="cs-nav-direction">Next &rarr;</span>
              <span className="cs-nav-project-name">{PROJECTS_DETAILS[nextProject].title}</span>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="cs-footer">
        <Link href="/" className="cs-back-btn">
          &larr; Back to Portfolio
        </Link>
        <p className="cs-copyright">&copy; 2026 Rasika Rakhewar</p>
      </footer>
    </main>
  );
}
