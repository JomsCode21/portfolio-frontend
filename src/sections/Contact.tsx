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
      <div className="grid gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-18.75">
        <div className="flex flex-col gap-3.75 text-[0.9rem] text-[#9aa8bd]">
          <a
            className="flex items-center gap-2.25 break-all transition-colors hover:text-[#38bdf8]"
            href={`mailto:${settings.email}`}
          >
            <Mail size={19} />
            {settings.email}
          </a>
          {settings.phone && (
            <a
              className="flex items-center gap-2.25 break-all transition-colors hover:text-[#38bdf8]"
              href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
            >
              <Phone size={19} />
              {settings.phone}
            </a>
          )}
          {settings.location && (
            <p className="flex items-center gap-2.25 wrap-break-word">
              <MapPin size={19} />
              {settings.location}
            </p>
          )}
          <SocialLinks settings={settings} />
        </div>
        <form onSubmit={submit} className="grid gap-4.25">
          <label className="grid gap-1.75 text-[0.8rem] font-bold text-[#e7edf7]">
            Name
            <input
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="grid gap-1.75 text-[0.8rem] font-bold text-[#e7edf7]">
            Email
            <input
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="grid gap-1.75 text-[0.8rem] font-bold text-[#e7edf7]">
            Subject
            <input
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </label>
          <label className="grid gap-1.75 text-[0.8rem] font-bold text-[#e7edf7]">
            Message
            <textarea
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-[7px] border border-transparent bg-[#38bdf8] px-3.75 py-2.75 text-[0.85rem] font-bold text-[#07111e] transition hover:bg-[#7dd3fc] disabled:cursor-not-allowed disabled:opacity-65"
            disabled={sending}
          >
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
