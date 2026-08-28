import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { contact } from '../services/portfolioService';
import { SocialLinks } from '../components/Ui';
export default function Contact({ settings }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      const r = await contact.send(form);
      setStatus({ type: 'success', text: r.message });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="contact" className="section shell contact">
      <SectionTitle
        eyebrow="Get in touch"
        title="Let’s make something useful."
        intro="Have a role, collaboration, or idea in mind? Send a message and I’ll get back to you."
      />
      <div className="contact-grid">
        <div className="contact-info">
          <a href={`mailto:${settings.email}`}>
            <Mail size={19} />
            {settings.email}
          </a>
          {settings.location && (
            <p>
              <MapPin size={19} />
              {settings.location}
            </p>
          )}
          <SocialLinks settings={settings} />
        </div>
        <form onSubmit={submit} className="contact-form">
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Subject
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </label>
          <label>
            Message
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          {status.text && (
            <p
              className={status.type === 'success' ? 'success-message' : 'error-message'}
              role="status"
            >
              {status.text}
            </p>
          )}
          <button className="button primary" disabled={sending}>
            {sending ? (
              'Sending…'
            ) : (
              <>
                Send message <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
