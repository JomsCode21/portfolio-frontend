import { useOutletContext } from 'react-router-dom';
import Contact from '../sections/Contact';
import type { Settings } from '../types';
export default function ContactPage() {
  const { settings } = useOutletContext<{ settings: Settings }>();
  return (
    <div className="page-top">
      <Contact settings={settings} />
    </div>
  );
}
