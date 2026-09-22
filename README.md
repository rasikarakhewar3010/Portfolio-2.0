# ⚡ Portfolio-2.0 | Rasika Rakhewar

> A cinematic, editorial developer portfolio showcasing full-stack engineering, AI/ML expertise, and modern web craft.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?style=for-the-badge&logo=framer)
![GSAP](https://img.shields.io/badge/GSAP-GreenSock-brightgreen?style=for-the-badge&logo=greensock)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- **Cinematic Editorial Hero**: High-impact editorial layout featuring an interactive cut-out portrait, glowing particle accents, and animated typography.
- **Micro-Interactions & Fluid Animations**: Built with **GSAP** and **Framer Motion** for smooth entrances, pinned panel transitions, and interactive hover states.
- **Lenis Smooth Scroll**: Ultra-smooth inertia scrolling delivering a native, luxury editorial feel.
- **Interactive Project Showcase**: Deep dive into featured projects with dedicated dynamic detail routes (`/projects/[id]`), architecture breakdowns, and tech stacks.
- **Interactive Skills Radar**: Curated tech stack categorizing Full-Stack, AI/ML, Cloud, and Tooling.
- **Verified Credentials**: Interactive credential and certificate viewer with direct verification links.
- **Direct Connect**: Polished contact channels with social integrations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Smooth Scrolling**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Styling**: Vanilla CSS Architecture (Custom variables, glassmorphism, responsive grid system)

---

## 📁 Project Structure

```bash
Portfolio2/
├── public/                 # Static assets, logos & photography
│   ├── portrait.png        # Hero editorial portrait
│   └── Project Img/        # Project thumbnails & branding
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens, typography & animations
│   │   ├── layout.js       # App root layout & SEO metadata
│   │   ├── page.js         # Single-page pinned slider layout
│   │   └── projects/
│   │       └── [id]/page.js # Dynamic case study detail page
│   └── components/
│       ├── Hero.jsx        # Cinematic hero section
│       ├── PortraitEffect.jsx # Interactive 3D portrait effects
│       ├── EntranceAnimation.jsx # GSAP sequence timeline
│       ├── Skills.jsx      # Technical skills categorization
│       ├── Projects.jsx    # Projects showcase
│       ├── About.jsx       # About & certificates showcase
│       ├── Contact.jsx     # Contact & outreach section
│       └── Navigation.jsx  # Floating responsive navbar
├── jsconfig.json
├── next.config.mjs
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.18+ or v20+) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rasikarakhewar3010/Portfolio-2.0.git
   cd Portfolio-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📬 Connect

- **Author**: Rasika Rakhewar
- **GitHub**: [@rasikarakhewar3010](https://github.com/rasikarakhewar3010)

---

Developed with precision and passion. © 2026 Rasika Rakhewar.
