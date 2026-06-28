import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../design-system';
import { ASSETS } from '../../data';
import { ADMIN_NAV } from '../config/navigation';
import { useAdminAuth } from '../context/AdminAuthProvider';
import '../styles/admin.css';

const PAGE_TITLES: Record<string, string> = {
  '/espace-admin': 'Tableau de bord',
  '/espace-admin/eleves': 'Gestion des élèves',
  '/espace-admin/inscriptions': 'Inscriptions',
  '/espace-admin/paiements': 'Paiements',
  '/espace-admin/agences': 'Agences',
  '/espace-admin/formations': 'Formations',
  '/espace-admin/contenus': 'Contenus',
  '/espace-admin/temoignages': 'Témoignages',
  '/espace-admin/statistiques': 'Statistiques',
  '/espace-admin/journal': 'Journal d\'activité',
};

export function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const title = PAGE_TITLES[location.pathname] ?? 'Administration';

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link to="/">
            <img src={ASSETS.logo} alt="Mozart" />
          </Link>
          <span className="admin-sidebar__badge">Admin</span>
        </div>
        {user && (
          <div className="admin-sidebar__user">
            <strong>{user.firstName} {user.lastName}</strong>
            <span>{user.role.replace('_', ' ')}</span>
          </div>
        )}
        <nav className="admin-sidebar__nav">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <Button variant="ghost" size="sm" fullWidth onClick={() => { logout(); navigate('/espace-admin/connexion'); }}>
            Déconnexion
          </Button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h1>{title}</h1>
          <Link to="/" className="admin-topbar__link">← Site public</Link>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
