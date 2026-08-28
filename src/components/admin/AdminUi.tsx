import { AlertTriangle, Check, X } from 'lucide-react';
export const Toast = ({ toast, onClose }) =>
  toast ? (
    <div className={`toast ${toast.type}`} role="status">
      {toast.type === 'error' ? <AlertTriangle size={17} /> : <Check size={17} />} {toast.text}
      <button onClick={onClose} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  ) : null;
export function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="confirm-dialog" role="alertdialog" aria-modal="true">
        <h2>Confirm deletion</h2>
        <p>{message}</p>
        <div>
          <button className="button secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="button danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export function AdminTable({ columns, rows, onEdit, onDelete, empty }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.label}>{c.label}</th>
            ))}
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row._id}>
                {columns.map((c) => (
                  <td key={c.label}>{c.render ? c.render(row) : row[c.key] || '—'}</td>
                ))}
                <td className="actions">
                  <button onClick={() => onEdit(row)}>Edit</button>
                  <button className="delete" onClick={() => onDelete(row)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="empty-state">{empty}</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
