'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const SKILLS_DATA = [
  {
    category: 'Languages',
    index: '01',
    description: 'Tools for writing core logic & structure',
    items: [
      { name: 'JavaScript (ES6+)', note: 'My native tongue. async/await is my superpower.' },
      { name: 'Python', note: 'Clean, elegant, and writes like poetry.' },
      { name: 'Java', note: "System.out.println('Hello, structure!');" },
      { name: 'C', note: 'Pointers, memory management, and pure speed.' },
    ],
  },
  {
    category: 'Frontend',
    index: '02',
    description: 'Crafting premium interface & interactions',
    items: [
      { name: 'React.js', note: 'Components are my building blocks.' },
      { name: 'Redux', note: 'State management, keeping it predictable.' },
      { name: 'HTML5', note: 'Semantic markup is the skeleton of the web.' },
      { name: 'CSS3', note: 'Making things beautiful since day one.' },
      { name: 'Tailwind CSS', note: 'Rapid styling without leaving the HTML.' },
      { name: 'Bootstrap', note: 'Quick grids and prototyping friend.' },
      { name: 'Three.js', note: 'Bringing 3D math and WebGL to the canvas.' },
    ],
  },
  {
    category: 'Backend & DB',
    index: '03',
    description: 'Server logic, APIs, and database architecture',
    items: [
      { name: 'Node.js', note: 'JavaScript on the server? Yes, please.' },
      { name: 'Express.js', note: 'Minimalist web framework for APIs.' },
      { name: 'MongoDB', note: 'NoSQL documents, keeping data flexible.' },
      { name: 'MySQL', note: 'Relational data, queried with SQL precision.' },
      { name: 'Supabase', note: 'Firebase alternative, love the Auth & DB combo.' },
    ],
  },
  {
    category: 'Tools & Deploy',
    index: '04',
    description: 'Deployment pipelines, versioning, and setup',
    items: [
      { name: 'Git', note: "git commit -m 'fix: final final version 3' (oops)" },
      { name: 'GitHub', note: 'Where my code lives and collaborates.' },
      { name: 'VS Code', note: 'Extensions, themes, and shortcuts galore.' },
      { name: 'Cloudinary', note: 'Optimized media delivery, automated.' },
      { name: 'Vercel', note: 'Push to deploy, CI/CD is lightning fast.' },
      { name: 'Render', note: 'Hosting backends and cron jobs with ease.' },
    ],
  },
  {
    category: 'Concepts',
    index: '05',
    description: 'Computer Science foundations & workflows',
    items: [
      { name: 'OOP', note: 'Classes, inheritance, and clean models.' },
      { name: 'DSA', note: 'Binary trees, sorting, and problem solving.' },
      { name: 'REST APIs', note: 'Clean endpoints, status codes, and JSON payloads.' },
      { name: 'SDLC', note: 'From planning to deployment, the full lifecycle.' },
      { name: 'Debugging', note: 'Finding the needle in the stack trace.' },
      { name: 'Agile', note: 'Sprints, standups, and continuous iteration.' },
    ],
  },
  {
    category: 'Soft Skills',
    index: '06',
    description: 'Collaboration, adaptability, and mindset',
    items: [
      { name: 'Communication', note: 'Translating complex tech into human ideas.' },
      { name: 'Collaboration', note: 'Git merge conflicts? We resolve them together.' },
      { name: 'Adaptability', note: 'Always learning, shifting with the tech stack.' },
      { name: 'Problem Solving', note: "Give me a bug, I'll find a solution." },
      { name: 'Ownership', note: 'Taking responsibility from commit to deploy.' },
      { name: 'Learning', note: 'Always reading documentation and tutorials.' },
    ],
  },
];

export default function Skills() {
  const [hoveredSkills, setHoveredSkills] = useState({});
  const containerRef = useRef(null);

  // Animations are handled by the main panel transition controller in EntranceAnimation.jsx

  return (
    <section className="skills-section" id="skills" ref={containerRef}>
      {/* Warm Textured Overlay */}
      <div className="skills-texture" />

      <div className="section-label" data-animate="section-label">
        <span>01</span> Skills & Craft
      </div>

      <div className="skills-container">
        <h2 className="skills-heading">
          A curated collection of languages, frameworks, and workflows I use to craft polished experiences.
        </h2>

        <div className="skills-grid">
          {SKILLS_DATA.map((cat) => (
            <div key={cat.index} className="skills-card">
              <div className="skills-card-header">
                <span className="skills-card-index">{cat.index}</span>
                <h3 className="skills-card-title">{cat.category}</h3>
              </div>

              <div className="skills-items-container">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="skill-badge"
                    onMouseEnter={() =>
                      setHoveredSkills((prev) => ({ ...prev, [cat.index]: item }))
                    }
                    onMouseLeave={() =>
                      setHoveredSkills((prev) => ({ ...prev, [cat.index]: null }))
                    }
                  >
                    {item.name}
                  </span>
                ))}
              </div>

              <div className="skills-card-footer">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hoveredSkills[cat.index] ? hoveredSkills[cat.index].name : 'default'}
                    initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -5, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className={`skills-commentary ${
                      hoveredSkills[cat.index] ? 'has-hover' : ''
                    }`}
                  >
                    {hoveredSkills[cat.index] ? hoveredSkills[cat.index].note : cat.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Ticker */}
        <div className="skills-marquee-container">
          <div className="skills-marquee-track">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} style={{ display: 'flex' }}>
                {SKILLS_DATA.flatMap((cat) =>
                  cat.items.map((item) => (
                    <span key={`${setIndex}-${item.name}`} className="skills-marquee-item">
                      {item.name} •
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
