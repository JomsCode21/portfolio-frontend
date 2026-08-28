import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SocialLinks } from '../components/Ui';
export default function Hero({ settings }) {
  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <span className="eyebrow">Available for thoughtful work</span>
        <h1>
          Hi, I’m <em>{settings.name || 'Jhumari Job Galos'}.</em>
        </h1>
        <h2>{settings.title || 'MERN Stack Developer'}</h2>
        <p>{settings.tagline}</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View projects <ArrowDown size={17} />
          </a>
          {settings.resumeUrl && (
            <a
              className="button secondary"
              href={settings.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Resume <Download size={17} />
            </a>
          )}
          <Link className="text-link" to="/contact">
            Contact me <ArrowUpRight size={17} />
          </Link>
        </div>
        <SocialLinks settings={settings} />
      </div>
      <aside className="hero-aside">
        <p>01 — 04</p>
        <div className="status-dot">
          <i /> Open to opportunities
        </div>
        <span>Building practical digital products from idea to deployment.</span>
      </aside>
    </section>
  );
}
