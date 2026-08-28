import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { settings } from '../../services/portfolioService';
import { Loader, ErrorState } from '../../components/Ui';
import { Toast } from '../../components/admin/AdminUi';
const fields = [
  ['name', 'Full name'],
  ['title', 'Developer title'],
  ['tagline', 'Short introduction', 'textarea'],
  ['bio', 'About me', 'textarea'],
  ['email', 'Email', 'email'],
  ['phone', 'Phone'],
  ['location', 'Location'],
  ['github', 'GitHub URL', 'url'],
  ['linkedin', 'LinkedIn URL', 'url'],
  ['resumeUrl', 'Resume URL', 'url'],
  ['profileImage', 'Profile image URL', 'url'],
  ['footerText', 'Footer text'],
];
export default function SettingsPage() {
  const [form, setForm] = useState(null),
    [error, setError] = useState(''),
    [saving, setSaving] = useState(false),
    [toast, setToast] = useState(null);
  useEffect(() => {
    settings
      .get()
      .then((r) => setForm(r.data))
      .catch((e) => setError(e.message));
  }, []);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settings.update(form);
      setToast({ type: 'success', text: 'Portfolio settings updated.' });
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };
  if (error) return <ErrorState message={error} />;
  if (!form) return <Loader />;
  return (
    <>
      <section className="admin-page-head">
        <div>
          <p className="eyebrow">Global content</p>
          <h1>Settings</h1>
          <p>Update the information shown throughout your public portfolio.</p>
        </div>
      </section>
      <form className="settings-form" onSubmit={save}>
        <div className="form-grid">
          {fields.map(([name, label, type]) => (
            <label key={name} className={type === 'textarea' ? 'full' : ''}>
              {label}
              {type === 'textarea' ? (
                <textarea
                  rows={5}
                  value={form[name] || ''}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                />
              ) : (
                <input
                  type={type || 'text'}
                  value={form[name] || ''}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                />
              )}
            </label>
          ))}
          <label className="availability">
            <input
              type="checkbox"
              checked={form.availableForWork}
              onChange={(e) => setForm({ ...form, availableForWork: e.target.checked })}
            />{' '}
            Available for work
          </label>
        </div>
        <button className="button primary" disabled={saving}>
          {saving ? (
            'Saving…'
          ) : (
            <>
              <Save size={17} /> Save settings
            </>
          )}
        </button>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
