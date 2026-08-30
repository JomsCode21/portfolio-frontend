import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Toast } from '../../components/Ui';
export default function LoginPage() {
  const { user, login } = useAuth();
  const nav = useNavigate(),
    location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' }),
    [toast, setToast] = useState(null),
    [loading, setLoading] = useState(false);
  if (user) return <Navigate to="/admin/dashboard" replace />;
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      await login(form);
      nav(location.state?.from?.pathname || '/admin/dashboard', {
        replace: true,
      });
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="login-page">
      <form onSubmit={submit} className="login-card">
        <span className="login-icon">
          <LockKeyhole />
        </span>
        <p className="eyebrow">Private area</p>
        <h1>Welcome back.</h1>
        <p>Sign in to manage your portfolio content.</p>
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
          Password
          <input
            required
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button className="button primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </main>
  );
}
