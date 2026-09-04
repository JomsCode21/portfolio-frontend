import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { settings } from '../services/portfolioService';
import { Loader, MobileMenu } from '../components/Ui';
import ThemeToggle from '../components/ThemeToggle';
const links = [
  ['/', 'Home'],
  ['/#about', 'About'],
  ['/#skills', 'Skills'],
  ['/#projects', 'Projects'],
];
export default function PublicLayout() {
  const { data, loading } = useFetch(settings.get);
  const [open, setOpen] = useState(false);
  const profile = data || {};
  return (
    <>
      <header className="public-header">
        <div className="public-header-inner">
          <Link className="public-brand" to="/">
            {profile.name
              ?.split(' ')
              .map((x) => x[0])
              .join('')
              .slice(0, 2) || 'JJ'}
          </Link>
          <div className="public-nav-area">
            <nav className={open ? 'public-nav open' : 'public-nav'}>
              {links.map(([to, label]) => (
                <a key={label} className="public-nav-link" href={to} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
              <a className="public-nav-cta" href="/#contact" onClick={() => setOpen(false)}>
                Let’s talk <ArrowUpRight size={15} />
              </a>
            </nav>
            <ThemeToggle />
            <MobileMenu open={open} setOpen={setOpen} />
          </div>
        </div>
      </header>
      <main>{loading ? <Loader /> : <Outlet context={{ settings: profile }} />}</main>
      <footer className="public-footer">
        <div className="public-footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name || 'Jhumari Job Galos'}.{' '}
            {profile.footerText || 'All rights resereved.'}
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
