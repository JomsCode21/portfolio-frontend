import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { SocialLinks } from '../components/Ui';
export default function Hero({ settings }) {
  const availableForWork = settings.availableForWork !== false;
  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <span className="eyebrow">
          {availableForWork ? 'Available for thoughtful work' : 'Currently unavailable'}
        </span>
        <h1>
          Hi, I’m <em>{settings.name || 'Jhumari Job Galos'}.</em>
        </h1>
        <h2>{settings.title || 'MERN Stack Developer'}</h2>
        <p>{settings.tagline}</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View projects <ArrowDown size={17} />
          </a>
          <a
            className="button secondary"
            href="/JJGALOS-RESUME.pdf"
            download="Jhumari-Job-Galos-Resume.pdf"
          >
            Resume <Download size={17} />
          </a>
          <a className="text-link" href="/#contact">
            Letâ€™s talk <ArrowUpRight size={17} />
          </a>
        </div>
        <SocialLinks settings={settings} />
      </div>
      <aside className="hero-aside">
        <p>01 — 04</p>
        <div className={`status-dot ${availableForWork ? 'is-available' : 'is-unavailable'}`}>
          <i /> {availableForWork ? 'Open to opportunities' : 'Currently unavailable'}
        </div>
        <span>Building practical digital products from idea to deployment.</span>
      </aside>
    </section>
  );
}
