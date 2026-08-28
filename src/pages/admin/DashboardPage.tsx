import {
  FolderKanban,
  Mail,
  MessageCircleMore,
  Award,
  BriefcaseBusiness,
  Wrench,
} from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { dashboard } from '../../services/portfolioService';
import { Loader, ErrorState } from '../../components/Ui';
import type { LucideIcon } from 'lucide-react';
type StatKey =
  'projects' | 'skills' | 'experiences' | 'certifications' | 'messages' | 'unreadMessages';
const cards: [StatKey, string, LucideIcon][] = [
  ['projects', 'Projects', FolderKanban],
  ['skills', 'Skills', Wrench],
  ['experiences', 'Experiences', BriefcaseBusiness],
  ['certifications', 'Certifications', Award],
  ['messages', 'Messages', Mail],
  ['unreadMessages', 'Unread messages', MessageCircleMore],
];
export default function DashboardPage() {
  const { data, loading, error } = useFetch(dashboard.stats);
  return (
    <>
      <section className="admin-page-head">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Good to see you.</h1>
          <p>A quick view of your portfolio content.</p>
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="stats-grid">
          {cards.map(([key, label, Icon]) => (
            <article className="stat-card" key={key}>
              <Icon size={20} />
              <strong>{data[key]}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      )}
      <div className="admin-tip">
        <h2>Keep your portfolio current</h2>
        <p>
          Add projects, skills, and other information from the navigation. Public pages update from
          the API as soon as you save.
        </p>
      </div>
    </>
  );
}
