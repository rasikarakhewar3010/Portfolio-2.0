'use client';

export default function Contact() {
  const handleBackToTop = () => {
    if (typeof window !== 'undefined' && window.goToSection) {
      window.goToSection(0);
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Warm Gradient Orb */}
      <div className="contact-gradient-orb" />

      <div className="section-label" data-animate="section-label" style={{ justifyContent: 'center' }}>
        <span>04</span> Contact
      </div>

      {/* 3D Flip Heading — animated by EntranceAnimation.jsx */}
      <div className="perspective-container">
        <h2 className="contact-heading" data-animate="contact-heading">
          Let&apos;s Create Something<br />Extraordinary
        </h2>
      </div>

      <p className="contact-subtext" data-animate="contact-subtext">
        Whether you have a project in mind or simply want to explore possibilities,
        <br />I&apos;d love to hear from you.
      </p>

      <a
        href="mailto:rasikarakhewar30102004@gmail.com"
        className="contact-email"
        data-cursor="link"
        data-animate="contact-email"
      >
        rasikarakhewar30102004@gmail.com
      </a>

      <div className="contact-socials" data-animate="contact-socials">
        {[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rasika-rakhewar/' },
          { label: 'GitHub', href: 'https://github.com/rasikarakhewar3010' },
          { label: 'NPM', href: 'https://www.npmjs.com/package/jsvoice' },
          { label: 'Live Archive', href: 'https://rasikarakhewar.vercel.app/' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link social-link-flip"
            data-cursor="link"
          >
            <span className="flip-text">{link.label}</span>
            <span className="flip-text-clone">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Back to Top */}
      <button className="back-to-top" onClick={handleBackToTop}>
        <span className="arrow-up">↑</span>
        <span>Back to top</span>
      </button>
    </section>
  );
}
