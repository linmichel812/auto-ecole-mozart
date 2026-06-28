import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthProvider';

function AdminLoading() {
  return (
    <div className="admin-loading">
      <div className="admin-loading__spinner" aria-label="Chargement" />
    </div>
  );
}

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();
  if (isLoading) return <AdminLoading />;
  if (!isAuthenticated) {
    return <Navigate to="/espace-admin/connexion" state={{ from: location }} replace />;
  }
  return children;
}

export function AdminGuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  if (isLoading) return <AdminLoading />;
  if (isAuthenticated) return <Navigate to="/espace-admin" replace />;
  return children;
}
