import { useEffect, useState } from 'react';
import { CalendarDays, Clock3, Mail, X } from 'lucide-react';
import { contact } from '../../services/portfolioService';
import { AdminTable, ConfirmDialog, Toast } from '../../components/admin/AdminUi';
import { Loader, ErrorState } from '../../components/Ui';
import { arrivalDate, arrivalTime } from '../../utils/format';

export default function MessagesPage() {
  const [rows, setRows] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [selected, setSelected] = useState(null),
    [deleting, setDeleting] = useState(null),
    [toast, setToast] = useState(null);
  const load = () => {
    setLoading(true);
    contact
      .list()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const open = async (row) => {
    try {
      const r = await contact.get(row._id);
      setSelected(r.data);
      load();
    } catch (e) {
      setToast({ type: 'error', text: e.message });
    }
  };
  const remove = async () => {
    try {
      await contact.remove(deleting._id);
      setDeleting(null);
      setSelected(null);
      setToast({ type: 'success', text: 'Message deleted.' });
      load();
    } catch (e) {
      setToast({ type: 'error', text: e.message });
    }
  };

  return (
    <>
      <section className="admin-page-head">
        <div>
          <p className="eyebrow">Inbox</p>
          <h1>Messages</h1>
          <p>Messages submitted through your public contact form.</p>
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <AdminTable
          rows={rows}
          columns={[
            {
              key: 'name',
              label: 'From',
              render: (r) => (
                <span className={r.isRead ? '' : 'unread'}>
                  {r.name}
                  <small>{r.email}</small>
                </span>
              ),
            },
            { key: 'subject', label: 'Subject' },
            {
              key: 'createdAt',
              label: 'Received',
              render: (r) => (
                <span className="received-at">
                  <strong>{arrivalDate(r.createdAt)}</strong>
                  <small>{arrivalTime(r.createdAt)}</small>
                </span>
              ),
            },
          ]}
          onEdit={open}
          onDelete={setDeleting}
          empty="Your inbox is clear."
        />
      )}
      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <article
            className="message-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-subject"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close message"
            >
              <X size={18} />
            </button>
            <div className="message-modal-head">
              <span className="message-icon">
                <Mail size={21} />
              </span>
              <div>
                <p className="eyebrow">New message</p>
                <h2 id="message-subject">{selected.subject}</h2>
              </div>
            </div>
            <div className="message-sender">
              <span className="sender-avatar" aria-hidden="true">
                {selected.name?.slice(0, 1).toUpperCase() || '?'}
              </span>
              <div>
                <span>From</span>
                <strong>{selected.name}</strong>
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
              </div>
            </div>
            <div className="message-arrival">
              <CalendarDays size={17} />
              <div>
                <span>Arrived on</span>
                <time dateTime={selected.createdAt}>{arrivalDate(selected.createdAt)}</time>
              </div>
              <Clock3 size={17} />
              <div>
                <span>Time of arrival</span>
                <time dateTime={selected.createdAt}>{arrivalTime(selected.createdAt)}</time>
              </div>
            </div>
            <div className="message-content">
              <span>Message</span>
              <p className="message-body">{selected.message}</p>
            </div>
          </article>
        </div>
      )}
      {deleting && (
        <ConfirmDialog
          message={`Delete the message from ${deleting.name}?`}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
