import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="student-loading">
        <div className="student-loading__spinner" aria-label="Chargement" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/espace-eleve/connexion" state={{ from: location }} replace />;
  }

  return children;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="student-loading">
        <div className="student-loading__spinner" aria-label="Chargement" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/espace-eleve" replace />;
  }

  return children;
}
