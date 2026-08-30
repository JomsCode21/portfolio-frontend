import SectionTitle from './SectionTitle';
export default function About({ settings }) {
  return (
    <section id="about" className="section shell about">
      <SectionTitle
        eyebrow="About me"
        title={settings.aboutHeading || 'A practical, curious full-stack developer.'}
      />
      <div className="about-grid">
        <p className="lead">
          {settings.bio ||
            'I focus on building clear, dependable full-stack applications that make complex tasks feel simple. I am continually learning, improving my craft, and looking for meaningful problems to solve.'}
        </p>
        <div className="details">
          <div>
            <span>Focus</span>
            <strong>{settings.focus || 'Full-stack applications'}</strong>
          </div>
          <div>
            <span>Based in</span>
            <strong>{settings.location || 'Location available on request'}</strong>
          </div>
          <div>
            <span>Approach</span>
            <strong>{settings.approach || 'Thoughtful, iterative, user-centred'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
