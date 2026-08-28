import { ExternalLink, Github, LoaderCircle, Mail, Menu, X } from 'lucide-react';
export const Loader = () => (
  <div className="loader" role="status">
    <LoaderCircle size={24} /> Loading…
  </div>
);
export const ErrorState = ({ message }) => (
  <p className="error-message" role="alert">
    {message}
  </p>
);
export const EmptyState = ({ label = 'Nothing here yet.' }) => (
  <div className="empty-state">{label}</div>
);
export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
        ) : (
          <span>{project.title.slice(0, 1)}</span>
        )}
      </div>
      <div className="project-content">
        <div>
          <h3>{project.title}</h3>
          <p>{project.shortDescription}</p>
        </div>
        <div className="badges">
          {project.technologies?.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={`/projects/${project.slug}`}>
            Case study <ExternalLink size={15} />
          </a>
          {project.githubUrl && (
            <a
              aria-label={`${project.title} GitHub repository`}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              aria-label={`${project.title} live demo`}
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
export function SocialLinks({ settings }) {
  return (
    <div className="social-links">
      <a href={settings.github} aria-label="GitHub" target="_blank" rel="noreferrer">
        <Github size={20} />
      </a>
      <a href={settings.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
        in
      </a>
      <a href={`mailto:${settings.email}`} aria-label="Email">
        <Mail size={20} />
      </a>
    </div>
  );
}
export function MobileMenu({ open, setOpen }) {
  return (
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
      {open ? <X /> : <Menu />}
    </button>
  );
}
