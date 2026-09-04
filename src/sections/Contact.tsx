import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { contact } from '../services/portfolioService';
import { SocialLinks, Toast } from '../components/Ui';
export default function Contact({ settings }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setToast(null);
    try {
      const r = await contact.send(form);
      setToast({ type: 'success', text: r.message });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setToast({ type: 'error', text: error.message });
    } finally {
      setSending(false);
    }
  };
  return (
    <section
      id="contact"
      className="mx-auto w-[calc(100%-30px)] max-w-280 py-18.75 md:w-[calc(100%-40px)] md:py-27.5"
    >
      <SectionTitle
        eyebrow="Get in touch"
        title="Let’s make something useful."
        intro="Have a role, collaboration, or idea in mind? Send a message and I’ll get back to you."
      />
      <div className="contact-content">
        <div className="contact-details">
          <a className="contact-detail-link" href={`mailto:${settings.email}`}>
            <Mail size={19} />
            {settings.email}
          </a>
          {settings.phone && (
            <a
              className="contact-detail-link"
              href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
            >
              <Phone size={19} />
              {settings.phone}
            </a>
          )}
          {settings.location && (
            <p className="contact-detail-text">
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
          <button className="button primary contact-submit" disabled={sending}>
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
      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}
