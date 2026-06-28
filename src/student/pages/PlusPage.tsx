import { Link } from 'react-router-dom';
import { Button } from '../../design-system';
import { STUDENT_NAV, NavIcon } from '../config/navigation';
import { useAuth } from '../context/AuthProvider';
import { StudentPageHeader } from '../components/StudentPageHeader';

export function PlusPage() {
  const { user, logout } = useAuth();

  const items = STUDENT_NAV.all.filter(
    (item) => !STUDENT_NAV.main.some((m) => m.to === item.to),
  );

  return (
    <>
      <StudentPageHeader
        title="Menu"
        subtitle={user ? `${user.firstName} ${user.lastName} · ${user.agencyName}` : undefined}
      />

      <div className="student-plus-grid">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="student-plus-item">
            <NavIcon name={item.icon} size={24} />
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Button to="/" variant="outline" fullWidth>Retour au site</Button>
        <Button variant="ghost" fullWidth onClick={logout}>Déconnexion</Button>
      </div>
    </>
  );
}
