import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthProvider';
import { AdminProtectedRoute, AdminGuestRoute } from './components/AdminProtectedRoute';
import { AdminLayout } from './components/AdminLayout';

const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const AdminStudentsPage = lazy(() => import('./pages/AdminStudentsPage').then((m) => ({ default: m.AdminStudentsPage })));
const AdminAgenciesPage = lazy(() => import('./pages/AdminAgenciesPage').then((m) => ({ default: m.AdminAgenciesPage })));
const AdminFormationsPage = lazy(() => import('./pages/AdminFormationsPage').then((m) => ({ default: m.AdminFormationsPage })));
const AdminContentsPage = lazy(() => import('./pages/AdminContentsPage').then((m) => ({ default: m.AdminContentsPage })));
const AdminTestimonialsPage = lazy(() => import('./pages/AdminTestimonialsPage').then((m) => ({ default: m.AdminTestimonialsPage })));
const AdminInscriptionsPage = lazy(() => import('./pages/AdminInscriptionsPage').then((m) => ({ default: m.AdminInscriptionsPage })));
const AdminPaymentsPage = lazy(() => import('./pages/AdminPaymentsPage').then((m) => ({ default: m.AdminPaymentsPage })));
const AdminStatisticsPage = lazy(() => import('./pages/AdminStatisticsPage').then((m) => ({ default: m.AdminStatisticsPage })));
const AdminActivityLogPage = lazy(() => import('./pages/AdminActivityLogPage').then((m) => ({ default: m.AdminActivityLogPage })));

function AdminFallback() {
  return (
    <div className="admin-loading">
      <div className="admin-loading__spinner" aria-label="Chargement" />
    </div>
  );
}

/** Routes espace administrateur : lazy-loaded */
export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<AdminFallback />}>
        <Routes>
          <Route path="/espace-admin/connexion" element={<AdminGuestRoute><AdminLoginPage /></AdminGuestRoute>} />
          <Route path="/espace-admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="eleves" element={<AdminStudentsPage />} />
            <Route path="inscriptions" element={<AdminInscriptionsPage />} />
            <Route path="paiements" element={<AdminPaymentsPage />} />
            <Route path="agences" element={<AdminAgenciesPage />} />
            <Route path="formations" element={<AdminFormationsPage />} />
            <Route path="contenus" element={<AdminContentsPage />} />
            <Route path="temoignages" element={<AdminTestimonialsPage />} />
            <Route path="statistiques" element={<AdminStatisticsPage />} />
            <Route path="journal" element={<AdminActivityLogPage />} />
          </Route>
          <Route path="/espace-admin/*" element={<Navigate to="/espace-admin" replace />} />
        </Routes>
      </Suspense>
    </AdminAuthProvider>
  );
}
