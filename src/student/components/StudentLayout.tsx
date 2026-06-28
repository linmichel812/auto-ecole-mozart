import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../../design-system';
import { ASSETS } from '../../data';
import { useAuth } from '../context/AuthProvider';
import { STUDENT_NAV, NavIcon } from '../config/navigation';
import { studentService } from '../api/studentService';
import '../styles/student.css';

const PAGE_TITLES: Record<string, string> = {
  '/espace-eleve': 'Tableau de bord',
  '/espace-eleve/progression': 'Progression',
  '/espace-eleve/planning': 'Planning',
  '/espace-eleve/reservations': 'Réservations',
  '/espace-eleve/conduite': 'Heures de conduite',
  '/espace-eleve/quiz-code': 'Quiz Code',
  '/espace-eleve/examens-blancs': 'Examens blancs',
  '/espace-eleve/examens': 'Résultats examens',
  '/espace-eleve/ressources': 'Centre ressources',
  '/espace-eleve/statistiques': 'Statistiques',
  '/espace-eleve/paiements': 'Paiements',
  '/espace-eleve/documents': 'Documents',
  '/espace-eleve/notifications': 'Notifications',
  '/espace-eleve/messages': 'Messagerie',
  '/espace-eleve/plus': 'Menu',
};

export function StudentLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadNotif, setUnreadNotif] = useState(0);
  const [unreadMsg, setUnreadMsg] = useState(0);

  useEffect(() => {
    studentService.getDashboard().then((d) => {
      setUnreadNotif(d.unreadNotifications);
      setUnreadMsg(d.unreadMessages);
    }).catch(() => {});
  }, [location.pathname]);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Espace élève';

  type NavItem = (typeof STUDENT_NAV.all)[number];
  const navGroups: Record<string, NavItem[]> = {};
  for (const item of STUDENT_NAV.all) {
    if (!navGroups[item.group]) navGroups[item.group] = [];
    navGroups[item.group].push(item);
  }

  return (
    <div className="student-app">
      <div className="student-layout">
        <aside className="student-sidebar" aria-label="Navigation élève">
          <div className="student-sidebar__brand">
            <Link to="/">
              <img src={ASSETS.logo} alt="Auto-École Mozart" />
            </Link>
          </div>
          {user && (
            <div className="student-sidebar__user">
              <div className="student-sidebar__user-name">{user.firstName} {user.lastName}</div>
              <div className="student-sidebar__user-meta">{user.permisType} · {user.agencyName}</div>
            </div>
          )}
          <nav className="student-sidebar__nav">
            {Object.entries(navGroups).map(([group, items]) => (
              <div key={group}>
                <div className="student-sidebar__group">{group}</div>
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/espace-eleve'}
                    className={({ isActive }) =>
                      `student-sidebar__link${isActive ? ' student-sidebar__link--active' : ''}`
                    }
                  >
                    <NavIcon name={item.icon} size={18} />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
          <div className="student-sidebar__footer">
            <Button variant="ghost" size="sm" fullWidth onClick={() => { logout(); navigate('/espace-eleve/connexion'); }}>
              Déconnexion
            </Button>
          </div>
        </aside>

        <div className="student-main">
          <header className="student-topbar">
            <h1 className="student-topbar__title">{pageTitle}</h1>
            <div className="student-topbar__actions">
              <Link to="/espace-eleve/notifications" className="student-icon-btn" aria-label="Notifications">
                <NavIcon name="bell" size={20} />
                {unreadNotif > 0 && <span className="student-icon-btn__badge">{unreadNotif}</span>}
              </Link>
              <Link to="/espace-eleve/messages" className="student-icon-btn" aria-label="Messages">
                <NavIcon name="message" size={20} />
                {unreadMsg > 0 && <span className="student-icon-btn__badge">{unreadMsg}</span>}
              </Link>
            </div>
          </header>

          <main className="student-content">
            <Outlet />
          </main>
        </div>
      </div>

      <nav className="student-bottom-nav" aria-label="Navigation mobile">
        {STUDENT_NAV.main.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/espace-eleve'}
            className={({ isActive }) =>
              `student-bottom-nav__link${isActive ? ' student-bottom-nav__link--active' : ''}`
            }
          >
            <NavIcon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
