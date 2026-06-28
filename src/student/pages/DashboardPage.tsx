import { Link } from 'react-router-dom';
import { Badge, Button, Card } from '../../design-system';
import { studentService } from '../api/studentService';
import { LessonItem } from '../components/LessonItem';
import { ProgressRing } from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';
import { StudentPageHeader } from '../components/StudentPageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { useAuth } from '../context/AuthProvider';
import { formatDate } from '../../shared';

function formatFcfa(n: number) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}

export function DashboardPage() {
  const { user } = useAuth();
  const { data, loading } = useAsyncData(() => studentService.getDashboard(), []);

  if (loading || !data) {
    return (
      <>
        <StudentPageHeader title={`Bonjour${user ? `, ${user.firstName}` : ''}`} subtitle="Chargement de votre tableau de bord…" />
        <div className="student-grid"><div className="student-skeleton" /><div className="student-skeleton" /></div>
      </>
    );
  }

  return (
    <>
      <StudentPageHeader
        title={`Bonjour, ${data.user.firstName}`}
        subtitle={`${data.user.permisType} · Monitrice : ${data.user.instructorName}`}
      />

      <div className="student-stats">
        <StatCard label="Progression globale" value={`${data.progress.overallPercent}%`} accent />
        <StatCard label="Heures effectuées" value={`${data.drivingHours.completed}h`} sub={`${data.drivingHours.remaining}h restantes`} />
        <StatCard label="Solde à payer" value={formatFcfa(data.payments.remaining)} sub={data.payments.nextDueDate ? `Échéance ${formatDate(data.payments.nextDueDate)}` : undefined} />
        <StatCard label="Messages" value={data.unreadMessages} sub="non lus" />
      </div>

      <div className="student-grid student-grid--2">
        <Card title="Ma progression">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <ProgressRing percent={data.progress.overallPercent} />
            <div>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: 'var(--moz-neutral-600)' }}>
                Théorie : <strong>{data.progress.theoryPercent}%</strong> · Pratique : <strong>{data.progress.practicePercent}%</strong>
              </p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--moz-neutral-500)' }}>
                Prochain jalon : {data.progress.nextMilestone}
              </p>
              <Button to="/espace-eleve/progression" variant="outline" size="sm" style={{ marginTop: '0.75rem' }}>
                Voir la progression
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Actions rapides">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button to="/espace-eleve/reservations" size="sm" fullWidth>Réserver une séance</Button>
            <Button to="/espace-eleve/quiz-code" variant="outline" size="sm" fullWidth>Quiz Code de la Route</Button>
            <Button to="/espace-eleve/paiements" variant="outline" size="sm" fullWidth>Voir mes paiements</Button>
          </div>
        </Card>
      </div>

      <section className="student-section" style={{ marginTop: '1.5rem' }}>
        <div className="student-section__title">
          Prochains cours
          <Link to="/espace-eleve/planning" className="student-section__link">Tout voir →</Link>
        </div>
        <div className="student-grid">
          {data.upcomingLessons.length === 0 ? (
            <p className="student-empty">Aucun cours planifié.</p>
          ) : (
            data.upcomingLessons.map((l) => <LessonItem key={l.id} lesson={l} />)
          )}
        </div>
      </section>

      <section className="student-section">
        <div className="student-section__title">
          Notifications récentes
          <Link to="/espace-eleve/notifications" className="student-section__link">Tout voir →</Link>
        </div>
        <div className="student-grid">
          {data.recentNotifications.map((n) => (
            <Card key={n.id} interactive={!!n.link} title={n.title}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--moz-neutral-600)' }}>{n.message}</p>
              {!n.read && <Badge variant="primary" style={{ marginTop: '0.5rem' }}>Nouveau</Badge>}
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
