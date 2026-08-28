import SectionTitle from './SectionTitle';
import { useFetch } from '../hooks/useFetch';
import { skills } from '../services/portfolioService';
import { EmptyState, ErrorState, Loader } from '../components/Ui';
import type { Skill } from '../types';

const isExternalImage = (value: string) => /^https?:\/\//i.test(value);

export default function Skills() {
  const { data, loading, error } = useFetch(skills.list);
  const grouped = ((data || []) as Skill[]).reduce<Record<string, Skill[]>>(
    (all, skill) => ({ ...all, [skill.category]: [...(all[skill.category] || []), skill] }),
    {},
  );
  return (
    <section id="skills" className="section shell">
      <SectionTitle
        eyebrow="Capabilities"
        title="The tools I build with."
        intro="A focused toolkit for shipping modern web applications."
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : data.length ? (
        <div className="skills-grid">
          {Object.entries(grouped).map(([category, items]) => (
            <div className="skill-group" key={category}>
              <h3>{category}</h3>
              <ul>
                {items.map((skill) => (
                  <li key={skill._id}>
                    {skill.icon &&
                      (isExternalImage(skill.icon) ? (
                        <img
                          className="skill-icon"
                          src={skill.icon}
                          alt=""
                          width="20"
                          height="20"
                          loading="lazy"
                        />
                      ) : (
                        <span className="skill-emoji" aria-hidden="true">
                          {skill.icon}
                        </span>
                      ))}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState label="Skills will appear here when added through the dashboard." />
      )}
    </section>
  );
}
