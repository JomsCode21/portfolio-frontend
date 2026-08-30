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
      <header className="sticky top-0 z-10 h-16 border-b border-[#26344d] bg-[#0b1120]/95 backdrop-blur md:h-[78px]">
        <div className="mx-auto flex h-full w-[calc(100%-30px)] max-w-[1120px] items-center justify-between md:w-[calc(100%-40px)]">
          <Link
            className="grid size-[38px] place-items-center rounded-[9px] border border-[#38bdf8] font-['DM_Mono'] text-sm font-extrabold text-[#38bdf8]"
            to="/"
          >
            {profile.name
              ?.split(' ')
              .map((x) => x[0])
              .join('')
              .slice(0, 2) || 'JJ'}
          </Link>
          <MobileMenu open={open} setOpen={setOpen} />
          <nav
            className={
              open
                ? 'absolute inset-x-0 top-16 flex flex-col items-stretch gap-1 border-b border-[#26344d] bg-[#111a2d] p-[15px] text-sm text-[#9aa8bd] md:static md:flex md:flex-row md:items-center md:gap-[26px] md:border-0 md:bg-transparent md:p-0'
                : 'hidden text-sm text-[#9aa8bd] md:flex md:items-center md:gap-[26px]'
            }
          >
            {links.map(([to, label]) => (
              <a
                key={label}
                className="p-2.5 transition-colors hover:text-[#38bdf8] md:p-0"
                href={to}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <Link
              className="flex items-center gap-1 rounded-[7px] border border-[#26344d] p-2.5 text-[#e7edf7] transition-colors hover:border-[#38bdf8] hover:text-[#38bdf8] md:px-3 md:py-2"
              to="/contact"
              onClick={() => setOpen(false)}
            >
              Let’s talk <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
      <main>{loading ? <Loader /> : <Outlet context={{ settings: profile }} />}</main>
      <footer className="py-7 text-xs text-[#9aa8bd]">
        <div className="mx-auto flex w-[calc(100%-30px)] max-w-[1120px] flex-col gap-2 md:w-[calc(100%-40px)] md:flex-row md:justify-between">
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
