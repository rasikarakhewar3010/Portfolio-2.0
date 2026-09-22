'use client';

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-label" data-animate="section-label" style={{ justifyContent: 'center' }}>
        <span>04</span> Contact
      </div>
      <h2 className="contact-heading" data-animate="contact-heading">
        Let&apos;s Create Something<br />Extraordinary
      </h2>
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
        <a
          href="https://www.linkedin.com/in/rasika-rakhewar/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-cursor="link"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/rasikarakhewar3010"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-cursor="link"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/jsvoice"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-cursor="link"
        >
          NPM
        </a>
        <a
          href="https://rasikarakhewar.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-cursor="link"
        >
          Live Archive
        </a>
      </div>
    </section>
  );
}
