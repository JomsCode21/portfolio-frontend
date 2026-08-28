import { useEffect, useState } from 'react';
import { MailOpen } from 'lucide-react';
import { contact } from '../../services/portfolioService';
import { AdminTable, ConfirmDialog, Toast } from '../../components/admin/AdminUi';
import { Loader, ErrorState } from '../../components/Ui';
import { dateLabel } from '../../utils/format';
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
            { key: 'createdAt', label: 'Received', render: (r) => dateLabel(r.createdAt) },
          ]}
          onEdit={open}
          onDelete={setDeleting}
          empty="Your inbox is clear."
        />
      )}
      {selected && (
        <div className="modal-backdrop">
          <article className="message-modal">
            <button className="modal-close" onClick={() => setSelected(null)}>
              ×
            </button>
            <MailOpen />
            <p className="eyebrow">{dateLabel(selected.createdAt)}</p>
            <h2>{selected.subject}</h2>
            <p className="message-from">
              From <strong>{selected.name}</strong> ·{' '}
              <a href={`mailto:${selected.email}`}>{selected.email}</a>
            </p>
            <p className="message-body">{selected.message}</p>
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
