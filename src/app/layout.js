import { Cormorant_Garamond, Inter, JetBrains_Mono, Syne } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata = {
  title: 'Rasika Rakhewar — Full-Stack MERN Developer & AI Engineer',
  description:
    'Portfolio of Rasika Rakhewar — Full-Stack MERN Developer & AI Engineer specializing in React, Node.js, and AI solutions.',
  keywords: [
    'Rasika Rakhewar',
    'Full-Stack Developer',
    'MERN Stack',
    'AI Engineer',
    'React Developer',
    'Node.js',
    'MongoDB',
    'FastAPI',
    'Three.js',
    'GSAP',
    'Portfolio',
  ],
  openGraph: {
    title: 'Rasika Rakhewar — Full-Stack MERN Developer & AI Engineer',
    description:
      'Building scalable web applications, intuitive interfaces, and AI-powered solutions that solve real-world problems.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} ${syne.variable}`}
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
