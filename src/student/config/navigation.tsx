import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

const icons: Record<string, (p: IconProps) => ReactNode> = {
  home: (p) => (
    <Icon {...p}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </Icon>
  ),
  calendar: (p) => (
    <Icon {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Icon>
  ),
  car: (p) => (
    <Icon {...p}>
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9l2-4h14l2 4v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
    </Icon>
  ),
  message: (p) => (
    <Icon {...p}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </Icon>
  ),
  menu: (p) => (
    <Icon {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Icon>
  ),
  chart: (p) => (
    <Icon {...p}>
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </Icon>
  ),
  book: (p) => (
    <Icon {...p}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </Icon>
  ),
  quiz: (p) => (
    <Icon {...p}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </Icon>
  ),
  exam: (p) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  trophy: (p) => (
    <Icon {...p}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4H3v2a3 3 0 003 3M19 4h2v2a3 3 0 01-3 3" />
    </Icon>
  ),
  library: (p) => (
    <Icon {...p}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </Icon>
  ),
  stats: (p) => (
    <Icon {...p}>
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </Icon>
  ),
  payment: (p) => (
    <Icon {...p}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </Icon>
  ),
  doc: (p) => (
    <Icon {...p}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </Icon>
  ),
  bell: (p) => (
    <Icon {...p}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </Icon>
  ),
};

export function NavIcon({ name, size = 20 }: { name: string; size?: number }) {
  const render = icons[name] ?? icons.menu;
  return <>{render({ size })}</>;
}

/** Navigation de l'espace élève */
export const STUDENT_NAV = {
  main: [
    { to: '/espace-eleve', label: 'Accueil', icon: 'home' },
    { to: '/espace-eleve/planning', label: 'Planning', icon: 'calendar' },
    { to: '/espace-eleve/conduite', label: 'Conduite', icon: 'car' },
    { to: '/espace-eleve/messages', label: 'Messages', icon: 'message' },
    { to: '/espace-eleve/plus', label: 'Plus', icon: 'menu' },
  ],
  all: [
    { to: '/espace-eleve', label: 'Tableau de bord', icon: 'home', group: 'Principal' },
    { to: '/espace-eleve/progression', label: 'Progression', icon: 'chart', group: 'Formation' },
    { to: '/espace-eleve/planning', label: 'Planning', icon: 'calendar', group: 'Formation' },
    { to: '/espace-eleve/reservations', label: 'Réservations', icon: 'book', group: 'Formation' },
    { to: '/espace-eleve/conduite', label: 'Heures de conduite', icon: 'car', group: 'Formation' },
    { to: '/espace-eleve/quiz-code', label: 'Quiz Code', icon: 'quiz', group: 'Apprentissage' },
    { to: '/espace-eleve/examens-blancs', label: 'Examens blancs', icon: 'exam', group: 'Apprentissage' },
    { to: '/espace-eleve/examens', label: 'Résultats examens', icon: 'trophy', group: 'Apprentissage' },
    { to: '/espace-eleve/ressources', label: 'Centre ressources', icon: 'library', group: 'Apprentissage' },
    { to: '/espace-eleve/statistiques', label: 'Statistiques', icon: 'stats', group: 'Apprentissage' },
    { to: '/espace-eleve/paiements', label: 'Paiements', icon: 'payment', group: 'Administratif' },
    { to: '/espace-eleve/documents', label: 'Documents', icon: 'doc', group: 'Administratif' },
    { to: '/espace-eleve/notifications', label: 'Notifications', icon: 'bell', group: 'Communication' },
    { to: '/espace-eleve/messages', label: 'Messagerie', icon: 'message', group: 'Communication' },
  ],
} as const;
