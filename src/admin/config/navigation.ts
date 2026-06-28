export const ADMIN_NAV = [
  { to: '/espace-admin', label: 'Tableau de bord', end: true },
  { to: '/espace-admin/eleves', label: 'Élèves' },
  { to: '/espace-admin/inscriptions', label: 'Inscriptions' },
  { to: '/espace-admin/paiements', label: 'Paiements' },
  { to: '/espace-admin/agences', label: 'Agences' },
  { to: '/espace-admin/formations', label: 'Formations' },
  { to: '/espace-admin/contenus', label: 'Contenus' },
  { to: '/espace-admin/temoignages', label: 'Témoignages' },
  { to: '/espace-admin/statistiques', label: 'Statistiques' },
  { to: '/espace-admin/journal', label: 'Journal d\'activité' },
] as const;
