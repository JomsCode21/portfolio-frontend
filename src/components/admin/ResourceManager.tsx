import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { AdminTable, ConfirmDialog, Toast } from './AdminUi';
import { Loader, ErrorState } from '../Ui';
const initialFor = (fields) =>
  Object.fromEntries(
    fields.map((f) => [f.name, f.type === 'checkbox' ? false : (f.default ?? '')]),
  );
export default function ResourceManager({ title, description, service, fields, columns, empty }) {
  const [rows, setRows] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [editing, setEditing] = useState(null),
    [form, setForm] = useState(initialFor(fields)),
    [deleteRow, setDeleteRow] = useState(null),
    [saving, setSaving] = useState(false),
    [toast, setToast] = useState(null);
  const load = () => {
    setLoading(true);
    service
      .list()
      .then((r) => setRows(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  const openNew = () => {
    setEditing('new');
    setForm(initialFor(fields));
  };
  const openEdit = (row) => {
    setEditing(row);
    setForm(
      Object.fromEntries(
        fields.map((f) => [
          f.name,
          f.type === 'array'
            ? (row[f.name] || []).join('\n')
            : f.type === 'date' && row[f.name]
              ? row[f.name].slice(0, 10)
              : (row[f.name] ?? (f.type === 'checkbox' ? false : '')),
        ]),
      ),
    );
  };
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = Object.fromEntries(
      fields.map((f) => [
        f.name,
        f.type === 'array'
          ? form[f.name]
              .split('\n')
              .map((x) => x.trim())
              .filter(Boolean)
          : f.type === 'number' && form[f.name] !== ''
            ? Number(form[f.name])
            : form[f.name],
      ]),
    );
    try {
      if (editing === 'new') await service.create(payload);
      else await service.update(editing._id, payload);
      setEditing(null);
      setToast({ type: 'success', text: 'Saved successfully.' });
      load();
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };
  const remove = async () => {
    try {
      await service.remove(deleteRow._id);
      setDeleteRow(null);
      setToast({ type: 'success', text: 'Record deleted.' });
      load();
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    }
  };
  return (
    <>
      <section className="admin-page-head">
        <div>
          <p className="eyebrow">Content manager</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="button primary" onClick={openNew}>
          <Plus size={17} /> Add {title.slice(0, -1)}
        </button>
      </section>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <AdminTable
          columns={columns}
          rows={rows}
          onEdit={openEdit}
          onDelete={setDeleteRow}
          empty={empty}
        />
      )}{' '}
      {editing && (
        <div className="modal-backdrop">
          <form className="resource-modal" onSubmit={save}>
            <div className="modal-head">
              <h2>
                {editing === 'new' ? `Add ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
              </h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close">
                <X />
              </button>
            </div>
            <div className="form-grid">
              {fields.map((field) => (
                <label key={field.name} className={field.full ? 'full' : ''}>
                  {field.label}
                  {field.options ? (
                    <select
                      required={field.required}
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    >
                      {!field.required && <option value="">Select an option</option>}
                      {field.options.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      rows={4}
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                  ) : field.type === 'array' ? (
                    <textarea
                      rows={4}
                      placeholder="One item per line"
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                  ) : field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })}
                    />
                  ) : (
                    <input
                      required={field.required}
                      type={field.type || 'text'}
                      min={field.min ? Number(field.min) : undefined}
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button type="button" className="button secondary" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button className="button primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      )}
      {deleteRow && (
        <ConfirmDialog
          message={`Delete “${deleteRow.title || deleteRow.name || deleteRow.jobTitle || deleteRow.degree}”? This cannot be undone.`}
          onCancel={() => setDeleteRow(null)}
          onConfirm={remove}
        />
      )}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
