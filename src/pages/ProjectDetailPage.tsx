import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import api, { unwrap } from '../services/api';
import { ErrorState, Loader } from '../components/Ui';
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(
    () => unwrap(api.get(`/projects/slug/${slug}`)),
    [slug],
  );
  if (loading) return <Loader />;
  if (error)
    return (
      <main className="shell page-top">
        <ErrorState message={error} />
        <Link to="/projects">← Back to projects</Link>
      </main>
    );
  return (
    <main className="shell detail page-top">
      <Link className="text-link" to="/projects">
        ← All projects
      </Link>
      <span className="eyebrow">Project case study</span>
      <h1>{data.title}</h1>
      <p className="lead">{data.longDescription || data.shortDescription}</p>
      {data.image && (
        <img className="detail-image" src={data.image} alt={`${data.title} screenshot`} />
      )}
      <div className="detail-grid">
        <div>
          <h2>Overview</h2>
          <p>{data.shortDescription}</p>
          {data.features?.length > 0 && (
            <>
              <h2>Key features</h2>
              <ul>
                {data.features.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside>
          <h3>Technologies</h3>
          <div className="badges">
            {data.technologies?.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="detail-links">
            {data.githubUrl && (
              <a href={data.githubUrl} target="_blank" rel="noreferrer">
                <Github size={17} /> Frontend repository
              </a>
            )}
            {data.githubBackendUrl && (
              <a href={data.githubBackendUrl} target="_blank" rel="noreferrer">
                <Github size={17} /> Backend repository
              </a>
            )}
            {data.liveUrl && (
              <a href={data.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> Live site
              </a>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
