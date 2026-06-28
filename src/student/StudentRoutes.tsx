import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoute';
import { StudentLayout } from './components/StudentLayout';

const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const ProgressionPage = lazy(() => import('./pages/ProgressionPage').then((m) => ({ default: m.ProgressionPage })));
const PaymentsPage = lazy(() => import('./pages/PaymentsPage').then((m) => ({ default: m.PaymentsPage })));
const PlanningPage = lazy(() => import('./pages/PlanningPage').then((m) => ({ default: m.PlanningPage })));
const ReservationsPage = lazy(() => import('./pages/ReservationsPage').then((m) => ({ default: m.ReservationsPage })));
const DrivingPage = lazy(() => import('./pages/DrivingPage').then((m) => ({ default: m.DrivingPage })));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage').then((m) => ({ default: m.DocumentsPage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const MessagesPage = lazy(() => import('./pages/MessagesPage').then((m) => ({ default: m.MessagesPage })));
const ExamResultsPage = lazy(() => import('./pages/ExamResultsPage').then((m) => ({ default: m.ExamResultsPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })));
const QuizPage = lazy(() => import('./pages/QuizPage').then((m) => ({ default: m.QuizPage })));
const MockExamsPage = lazy(() => import('./pages/MockExamsPage').then((m) => ({ default: m.MockExamsPage })));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage').then((m) => ({ default: m.StatisticsPage })));
const PlusPage = lazy(() => import('./pages/PlusPage').then((m) => ({ default: m.PlusPage })));

function StudentFallback() {
  return (
    <div className="student-loading">
      <div className="student-loading__spinner" aria-label="Chargement" />
    </div>
  );
}

export function StudentRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={<StudentFallback />}>
        <Routes>
          <Route
            path="/espace-eleve/connexion"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/espace-eleve"
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="progression" element={<ProgressionPage />} />
            <Route path="paiements" element={<PaymentsPage />} />
            <Route path="planning" element={<PlanningPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="conduite" element={<DrivingPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="examens" element={<ExamResultsPage />} />
            <Route path="ressources" element={<ResourcesPage />} />
            <Route path="quiz-code" element={<QuizPage />} />
            <Route path="examens-blancs" element={<MockExamsPage />} />
            <Route path="statistiques" element={<StatisticsPage />} />
            <Route path="plus" element={<PlusPage />} />
          </Route>
          <Route path="/espace-eleve/*" element={<Navigate to="/espace-eleve" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
