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
    <section
      id="contact"
      className="mx-auto w-[calc(100%-30px)] max-w-[1120px] py-[75px] md:w-[calc(100%-40px)] md:py-[110px]"
    >
      <SectionTitle
        eyebrow="Get in touch"
        title="Let’s make something useful."
        intro="Have a role, collaboration, or idea in mind? Send a message and I’ll get back to you."
      />
      <div className="grid gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-[75px]">
        <div className="flex flex-col gap-[15px] text-[0.9rem] text-[#9aa8bd]">
          <a
            className="flex items-center gap-[9px] break-all transition-colors hover:text-[#38bdf8]"
            href={`mailto:${settings.email}`}
          >
            <Mail size={19} />
            {settings.email}
          </a>
          {settings.location && (
            <p className="flex items-center gap-[9px] break-words">
              <MapPin size={19} />
              {settings.location}
            </p>
          )}
          <SocialLinks settings={settings} />
        </div>
        <form onSubmit={submit} className="grid gap-[17px]">
          <label className="grid gap-[7px] text-[0.8rem] font-bold text-[#e7edf7]">
            Name
            <input
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="grid gap-[7px] text-[0.8rem] font-bold text-[#e7edf7]">
            Email
            <input
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="grid gap-[7px] text-[0.8rem] font-bold text-[#e7edf7]">
            Subject
            <input
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </label>
          <label className="grid gap-[7px] text-[0.8rem] font-bold text-[#e7edf7]">
            Message
            <textarea
              className="w-full resize-y rounded-md border border-[#26344d] bg-[#10192b] p-2.5 text-[#e7edf7] outline-none transition focus:border-[#38bdf8] focus:ring-3 focus:ring-[#38bdf8]/15"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          {status.text && (
            <p
              className={
                status.type === 'success'
                  ? 'm-0 text-[0.86rem] text-[#6ee7b7]'
                  : 'm-0 text-[0.86rem] text-[#fca5a5]'
              }
              role="status"
            >
              {status.text}
            </p>
          )}
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-[7px] border border-transparent bg-[#38bdf8] px-[15px] py-[11px] text-[0.85rem] font-bold text-[#07111e] transition hover:bg-[#7dd3fc] disabled:cursor-not-allowed disabled:opacity-65"
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
    </section>
  );
}
