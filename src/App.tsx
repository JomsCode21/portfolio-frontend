import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import {
  ProjectsAdmin,
  SkillsAdmin,
  ExperienceAdmin,
  EducationAdmin,
  CertificationsAdmin,
} from './pages/admin/ResourcePages';
import MessagesPage from './pages/admin/MessagesPage';
import SettingsPage from './pages/admin/SettingsPage';
import { Loader } from './components/Ui';
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/admin/login" state={{ from: location }} replace />;
}
function NotFound() {
  return (
    <main className="shell not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <a className="button primary" href="/">
        Return home
      </a>
    </main>
  );
}
export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      </Route>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="projects/new" element={<ProjectsAdmin />} />
        <Route path="projects/:id/edit" element={<ProjectsAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="experience" element={<ExperienceAdmin />} />
        <Route path="education" element={<EducationAdmin />} />
        <Route path="certifications" element={<CertificationsAdmin />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
