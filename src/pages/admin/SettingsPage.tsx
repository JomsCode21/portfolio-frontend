import { useEffect, useRef, useState } from 'react';
import { Bell, BellOff, FileText, Image, Save, Upload } from 'lucide-react';
import { settings, uploads } from '../../services/portfolioService';
import { Loader, ErrorState } from '../../components/Ui';
import { Toast } from '../../components/admin/AdminUi';
import {
  disablePushNotifications,
  enablePushNotifications,
  pushNotificationStatus,
} from '../../services/pushNotifications';
const fields = [
  ['name', 'Full name'],
  ['title', 'Developer title'],
  ['tagline', 'Short introduction', 'textarea'],
  ['aboutHeading', 'About heading'],
  ['bio', 'About me', 'textarea'],
  ['focus', 'Primary focus'],
  ['approach', 'Work approach'],
  ['email', 'Email', 'email'],
  ['phone', 'Phone'],
  ['location', 'Location'],
  ['github', 'GitHub URL', 'url'],
  ['linkedin', 'LinkedIn URL', 'url'],
  ['profileImage', 'Profile image URL', 'url'],
  ['footerText', 'Footer text'],
];
export default function SettingsPage() {
  const [form, setForm] = useState(null),
    [error, setError] = useState(''),
    [saving, setSaving] = useState(false),
    [pushStatus, setPushStatus] = useState({
      supported: false,
      enabled: false,
      permission: 'default',
    }),
    [updatingPush, setUpdatingPush] = useState(false),
    [toast, setToast] = useState(null),
    [uploadingResume, setUploadingResume] = useState(false),
    [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    settings
      .get()
      .then((r) => setForm(r.data))
      .catch((e) => setError(e.message));
    pushNotificationStatus().then(setPushStatus);
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
  const updatePush = async () => {
    setUpdatingPush(true);
    try {
      const status = pushStatus.enabled
        ? await disablePushNotifications()
        : await enablePushNotifications();
      setPushStatus(status);
      setToast({
        type: 'success',
        text: status.enabled ? 'Browser notifications enabled.' : 'Browser notifications disabled.',
      });
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setUpdatingPush(false);
    }
  };
  const uploadResume = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
      setToast({ type: 'error', text: 'Please select a PDF resume.' });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setToast({ type: 'error', text: 'Resume files must be 10 MB or smaller.' });
      return;
    }
    setUploadingResume(true);
    try {
      const response = await uploads.resume(file);
      setForm(response.data);
      setToast({ type: 'success', text: 'Resume uploaded and published.' });
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setUploadingResume(false);
    }
  };
  const uploadHeroImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setToast({ type: 'error', text: 'Please select a JPEG, PNG, or WebP image.' });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setToast({ type: 'error', text: 'Hero image uploads must be 20 MB or smaller.' });
      return;
    }
    setUploadingHeroImage(true);
    try {
      const response = await uploads.heroImage(file);
      setForm(response.data);
      setToast({ type: 'success', text: 'Hero image uploaded and published.' });
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setUploadingHeroImage(false);
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
          <section className="resume-uploader full" aria-labelledby="resume-uploader-title">
            <div className="resume-uploader-copy">
              <FileText size={22} aria-hidden="true" />
              <div>
                <strong id="resume-uploader-title">Resume PDF</strong>
                <p>
                  {form.resumeUrl
                    ? 'A resume is live. Uploading another PDF will replace it.'
                    : 'Upload the PDF that visitors can download from your portfolio.'}
                </p>
              </div>
            </div>
            <div className="resume-uploader-actions">
              {form.resumeUrl && (
                <a
                  href={form.resumeUrl}
                  className="button secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download current
                </a>
              )}
              <button
                className="button secondary"
                type="button"
                disabled={uploadingResume}
                onClick={() => resumeInputRef.current?.click()}
              >
                <Upload size={17} /> {uploadingResume ? 'Uploading…' : 'Upload PDF'}
              </button>
              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={uploadResume}
                hidden
              />
            </div>
          </section>
          <section className="resume-uploader full" aria-labelledby="hero-image-uploader-title">
            <div className="resume-uploader-copy">
              <Image size={22} aria-hidden="true" />
              <div>
                <strong id="hero-image-uploader-title">Hero image</strong>
                <p>
                  {form.heroImageUrl
                    ? 'This image is live in the hero section. Uploading another image will replace it.'
                    : 'Upload a portrait or professional image for the hero section.'}
                </p>
              </div>
            </div>
            <div className="resume-uploader-actions">
              {form.heroImageUrl && (
                <a
                  href={form.heroImageUrl}
                  className="button secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  View current
                </a>
              )}
              <button
                className="button secondary"
                type="button"
                disabled={uploadingHeroImage}
                onClick={() => heroImageInputRef.current?.click()}
              >
                <Upload size={17} /> {uploadingHeroImage ? 'Uploadingâ€¦' : 'Upload image'}
              </button>
              <input
                ref={heroImageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                onChange={uploadHeroImage}
                hidden
              />
            </div>
          </section>
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
      <section className="notification-settings">
        <div>
          <p className="eyebrow">Contact alerts</p>
          <h2>Browser notifications</h2>
          <p>
            Get an alert on this device whenever a visitor sends a contact message. Email alerts are
            delivered separately through your configured mailbox.
          </p>
          {!pushStatus.supported && (
            <small>This browser does not support push notifications.</small>
          )}
          {pushStatus.permission === 'denied' && (
            <small>Notifications are blocked in your browser settings for this site.</small>
          )}
        </div>
        <button
          className={pushStatus.enabled ? 'button secondary' : 'button primary'}
          type="button"
          disabled={updatingPush || !pushStatus.supported || pushStatus.permission === 'denied'}
          onClick={updatePush}
        >
          {pushStatus.enabled ? <BellOff size={17} /> : <Bell size={17} />}
          {updatingPush
            ? 'Updating…'
            : pushStatus.enabled
              ? 'Disable browser alerts'
              : 'Enable browser alerts'}
        </button>
      </section>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
