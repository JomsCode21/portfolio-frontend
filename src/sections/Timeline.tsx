import SectionTitle from './SectionTitle';
import { useFetch } from '../hooks/useFetch';
import { experience, education, certifications } from '../services/portfolioService';
import { dateLabel, monthYear } from '../utils/format';
import { EmptyState, Loader } from '../components/Ui';
export function Experience() {
  const { data, loading } = useFetch(experience.list);
  return (
    <section id="experience" className="section shell">
      <SectionTitle eyebrow="Experience" title="Where I’ve contributed." />
      {loading ? (
        <Loader />
      ) : data?.length ? (
        <div className="timeline">
          {data.map((x) => (
            <article key={x._id}>
              <div className="timeline-date">
                {monthYear(x.startDate)} — {monthYear(x.endDate)}
              </div>
              <div>
                <h3>
                  {x.jobTitle} <span>at {x.company}</span>
                </h3>
                <small>{x.employmentType}</small>
                <p>{x.description}</p>
                {x.responsibilities?.length > 0 && (
                  <ul>
                    {x.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState label="Experience details will be available soon." />
      )}
    </section>
  );
}
export function Education() {
  const { data, loading } = useFetch(education.list);
  return (
    <section id="education" className="section shell">
      <SectionTitle eyebrow="Education" title="Learning and foundation." />
      {loading ? (
        <Loader />
      ) : data?.length ? (
        <div className="timeline">
          {data.map((x) => (
            <article key={x._id}>
              <div className="timeline-date">
                {x.startYear} — {x.endYear || 'Present'}
              </div>
              <div>
                <h3>{x.degree}</h3>
                <strong>{x.school}</strong>
                {x.program && <p>{x.program}</p>}
                {x.description && <p>{x.description}</p>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState label="Education details will be available soon." />
      )}
    </section>
  );
}
export function Certifications() {
  const { data, loading } = useFetch(certifications.list);
  return (
    <section id="certifications" className="section shell">
      <SectionTitle eyebrow="Certifications" title="Continued learning." />
      {loading ? (
        <Loader />
      ) : data?.length ? (
        <div className="cert-grid">
          {data.map((x) => (
            <article className="cert-card" key={x._id}>
              {x.image && <img src={x.image} alt={`${x.title} certificate`} loading="lazy" />}
              <p>{dateLabel(x.date)}</p>
              <h3>{x.title}</h3>
              <span>{x.organization}</span>
              {x.credentialUrl && (
                <a href={x.credentialUrl} target="_blank" rel="noreferrer">
                  View credential →
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <EmptyState label="Certifications will be added here." />
      )}
    </section>
  );
}
