import { useEffect } from 'react';
import {
  AlertTriangle,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  Menu,
  X,
} from 'lucide-react';
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
export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(onClose, 5000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}>
      {toast.type === 'error' ? <AlertTriangle size={17} /> : <Check size={17} />}
      {toast.text}
      <button onClick={onClose} aria-label="Dismiss notification">
        <X size={16} />
      </button>
    </div>
  );
}
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
              aria-label={`${project.title} frontend GitHub repository`}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="Frontend repository"
            >
              <Github size={18} />
            </a>
          )}
          {project.githubBackendUrl && (
            <a
              aria-label={`${project.title} backend GitHub repository`}
              href={project.githubBackendUrl}
              target="_blank"
              rel="noreferrer"
              title="Backend repository"
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
    <div className="mt-9 flex gap-3">
      <a
        className="inline-flex size-[38px] items-center justify-center rounded-full border border-[#26344d] text-[#9aa8bd] transition-colors hover:border-[#38bdf8] hover:text-[#38bdf8]"
        href={settings.github}
        aria-label="GitHub"
        target="_blank"
        rel="noreferrer"
      >
        <Github />
      </a>
      <a
        className="inline-flex size-[38px] items-center justify-center rounded-full border border-[#26344d] text-[#9aa8bd] transition-colors hover:border-[#38bdf8] hover:text-[#38bdf8]"
        href={settings.linkedin}
        aria-label="LinkedIn"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin />
      </a>
      <a
        className="inline-flex size-[38px] items-center justify-center rounded-full border border-[#26344d] text-[#9aa8bd] transition-colors hover:border-[#38bdf8] hover:text-[#38bdf8]"
        href={`mailto:${settings.email}`}
        aria-label="Email"
      >
        <Mail />
      </a>
    </div>
  );
}
export function MobileMenu({ open, setOpen }) {
  return (
    <button
      className="border-0 bg-transparent p-2 text-[#e7edf7] md:hidden"
      onClick={() => setOpen(!open)}
      aria-label="Toggle navigation"
    >
      {open ? <X /> : <Menu />}
    </button>
  );
}
