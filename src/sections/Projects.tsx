import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { useFetch } from '../hooks/useFetch';
import { projects } from '../services/portfolioService';
import { EmptyState, ErrorState, Loader, ProjectCard } from '../components/Ui';
export default function Projects({ limit }: { limit?: number }) {
  const { data, loading, error } = useFetch(projects.list);
  const visible = limit ? data?.slice(0, limit) : data;
  return (
    <section id="projects" className="section shell">
      <div className="section-row">
        <SectionTitle eyebrow="Selected work" title="A few things I’ve built." />
        <Link className="text-link" to="/projects">
          All projects →
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : visible?.length ? (
        <div className="projects-grid">
          {visible.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      ) : (
        <EmptyState label="Projects will appear here when added through the dashboard." />
      )}
    </section>
  );
}
