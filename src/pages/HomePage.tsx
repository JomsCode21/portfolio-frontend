import { useOutletContext } from 'react-router-dom';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import { Experience, Education, Certifications } from '../sections/Timeline';
import Contact from '../sections/Contact';
import type { Settings } from '../types';
export default function HomePage() {
  const { settings } = useOutletContext<{ settings: Settings }>();
  return (
    <>
      <Hero settings={settings} />
      <About settings={settings} />
      <Skills />
      <Projects limit={3} />
      <Experience />
      <Education />
      <Certifications />
      <Contact settings={settings} />
    </>
  );
}
