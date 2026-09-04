import { useState } from 'react';
import {
  BarChart3,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  LogOut,
  Mail,
  Menu,
  Settings,
  ShieldCheck,
  Award,
  Wrench,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import type { LucideIcon } from 'lucide-react';
const items: [string, LucideIcon, string][] = [
  ['dashboard', BarChart3, 'Overview'],
  ['projects', FolderKanban, 'Projects'],
  ['skills', Wrench, 'Skills'],
  ['experience', BriefcaseBusiness, 'Experience'],
  ['education', GraduationCap, 'Education'],
  ['certifications', Award, 'Certifications'],
  ['messages', Mail, 'Messages'],
  ['settings', Settings, 'Settings'],
];
export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-shell">
      <aside className={open ? 'admin-sidebar open' : 'admin-sidebar'}>
        <div className="admin-logo">
          <ShieldCheck /> Portfolio CMS
        </div>
        <nav>
          {items.map(([to, Icon, label]) => (
            <NavLink key={to} to={`/admin/${to}`} onClick={() => setOpen(false)}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="logout" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <button
            className="admin-menu"
            onClick={() => setOpen(!open)}
            aria-label="Toggle dashboard navigation"
          >
            <Menu />
          </button>
          <ThemeToggle />
          <div className="admin-user">
            <strong>{user?.name || 'Administrator'}</strong>
            <span>{user?.email}</span>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
