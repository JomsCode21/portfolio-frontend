import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { settings } from '../services/portfolioService';
import { Loader, MobileMenu } from '../components/Ui';
const links = [
  ['/', 'Home'],
  ['/#about', 'About'],
  ['/#skills', 'Skills'],
  ['/#projects', 'Projects'],
  ['/#contact', 'Contact'],
];
export default function PublicLayout() {
  const { data, loading } = useFetch(settings.get);
  const [open, setOpen] = useState(false);
  const profile = data || {};
  return (
    <>
      <header className="site-header">
        <div className="shell nav">
          <Link className="brand" to="/">
            {profile.name
              ?.split(' ')
              .map((x) => x[0])
              .join('')
              .slice(0, 2) || 'JJ'}
          </Link>
          <MobileMenu open={open} setOpen={setOpen} />
          <nav className={open ? 'open' : ''}>
            {links.map(([to, label]) => (
              <a key={label} href={to} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
              Let’s talk <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
      <main>{loading ? <Loader /> : <Outlet context={{ settings: profile }} />}</main>
      <footer>
        <div className="shell footer-content">
          <span>
            © {new Date().getFullYear()} {profile.name || 'Jhumari Job Galos'}.{' '}
            {profile.footerText || 'Built with care and the MERN stack.'}
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
