export interface PermisDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  priceNote?: string;
  duration: string;
  conditions: string[];
  documents: string[];
  advantages: string[];
  featured?: boolean;
}

export const PERMIS_DETAILS: PermisDetail[] = [
  {
    id: 'permis-b',
    title: 'Permis B',
    category: 'Voiture',
    description:
      'Formation complète au permis voiture : code interactif, séances pratiques et examens blancs. Le plus demandé à Yaoundé.',
    price: '50 000 FCFA',
    priceNote: 'Paiement échelonné : acompte 15 000 FCFA',
    duration: '1 à 2 mois',
    conditions: [
      'Avoir au moins 18 ans révolus',
      'Pièce d\'identité nationale valide',
      'Certificat médical d\'aptitude à la conduite',
      '4 photos d\'identité récentes',
    ],
    documents: [
      'Photocopie CNI ou passeport',
      'Certificat médical (< 3 mois)',
      '4 photos format permis',
      'Formulaire d\'inscription signé',
    ],
    advantages: [
      'Code interactif + examens blancs illimités',
      'Véhicules récents et climatisés',
      'Simulation examen en conditions réelles',
      'Suivi individuel par moniteur dédié',
      'Horaires flexibles (étudiants & pros)',
    ],
    featured: true,
  },
  {
    id: 'permis-a',
    title: 'Permis A',
    category: 'Moto',
    description:
      'Maîtrise des deux-roues avec un focus sécurité routière. Adapté à la circulation urbaine camerounaise.',
    price: 'Sur devis',
    priceNote: 'À partir de 35 000 FCFA',
    duration: '3 à 6 semaines',
    conditions: [
      'Avoir au moins 18 ans',
      'Pièce d\'identité valide',
      'Certificat médical',
      'Équipement obligatoire (casque, gants)',
    ],
    documents: [
      'Photocopie CNI',
      'Certificat médical',
      '4 photos d\'identité',
      'Justificatif de domicile',
    ],
    advantages: [
      'Motos de formation récentes',
      'Cours sécurité routière spécifique moto',
      'Pratique en conditions urbaines réelles',
      'Moniteurs spécialisés deux-roues',
    ],
  },
  {
    id: 'permis-c',
    title: 'Permis C',
    category: 'Poids lourds',
    description:
      'Conduite de véhicules de plus de 3,5 tonnes. Porte d\'entrée vers logistique, BTP et transport.',
    price: 'Sur devis',
    duration: '2 à 4 mois',
    conditions: [
      'Permis B valide depuis au moins 2 ans',
      'Avoir au moins 21 ans',
      'Visite médicale approfondie',
      'Casier judiciaire vierge',
    ],
    documents: [
      'Permis B original + photocopie',
      'CNI + photocopie',
      'Certificat médical spécial PL',
      '4 photos d\'identité',
    ],
    advantages: [
      'Formation orientée emploi',
      'Véhicules poids lourds adaptés',
      'Partenariats entreprises transport',
      'Accompagnement placement professionnel',
    ],
  },
  {
    id: 'permis-d',
    title: 'Permis D',
    category: 'Transport de personnes',
    description:
      'Bus, cars scolaires et transport touristique. Compétence recherchée au Cameroun.',
    price: 'Sur devis',
    duration: '2 à 4 mois',
    conditions: [
      'Permis B valide depuis au moins 2 ans',
      'Avoir au moins 24 ans',
      'Visite médicale approfondie',
      'Casier judiciaire vierge',
    ],
    documents: [
      'Permis B original + photocopie',
      'CNI + photocopie',
      'Certificat médical spécial transport',
      '4 photos d\'identité',
    ],
    advantages: [
      'Formation transport de personnes',
      'Moniteurs expérimentés',
      'Opportunités tourisme & transport scolaire',
      'Suivi administratif complet',
    ],
  },
  {
    id: 'permis-e',
    title: 'Permis E',
    category: 'Remorques',
    description:
      'Complément aux permis B, C et D pour le tractage de remorques lourdes.',
    price: 'Sur devis',
    duration: '2 à 4 semaines',
    conditions: [
      'Permis B, C ou D valide',
      'Avoir au moins 21 ans',
      'Certificat médical à jour',
    ],
    documents: [
      'Permis en cours de validité',
      'CNI + photocopie',
      'Certificat médical',
      '4 photos d\'identité',
    ],
    advantages: [
      'Complément rapide à votre permis existant',
      'Valorisation logistique & agriculture',
      'Formation pratique remorquage',
    ],
  },
  {
    id: 'conversion',
    title: 'Conversion',
    category: 'Permis étranger',
    description:
      'Conversion de permis étrangers en permis camerounais avec accompagnement administratif.',
    price: 'Sur devis',
    duration: 'Selon dossier',
    conditions: [
      'Permis étranger valide',
      'Résidence ou projet au Cameroun',
      'Traduction officielle si nécessaire',
    ],
    documents: [
      'Permis étranger original',
      'CNI ou titre de séjour',
      'Certificat médical',
      'Photos d\'identité',
      'Attestation de résidence',
    ],
    advantages: [
      'Vérification complète du dossier',
      'Accompagnement démarches administratives',
      'Conseils personnalisés selon pays d\'origine',
    ],
  },
  {
    id: 'permis-international',
    title: 'Permis international',
    category: 'Mobilité',
    description:
      'Obtenir un permis international pour conduire à l\'étranger. Conseils et orientation.',
    price: 'Sur devis',
    duration: 'Selon dossier',
    conditions: [
      'Permis camerounais valide',
      'Pièce d\'identité en cours de validité',
      'Demande plusieurs semaines avant départ',
    ],
    documents: [
      'Permis national valide',
      'CNI + photocopie',
      'Photos d\'identité',
      'Formulaire de demande',
    ],
    advantages: [
      'Vérification conformité du permis national',
      'Orientation vers les services compétents',
      'Conseils selon destination (Genève/Vienne)',
    ],
  },
];

export const PERMIS_COMPARISON_COLUMNS = [
  { key: 'title', header: 'Formation' },
  { key: 'price', header: 'Prix' },
  { key: 'duration', header: 'Durée' },
  { key: 'conditions', header: 'Conditions' },
  { key: 'documents', header: 'Documents' },
  { key: 'advantages', header: 'Avantages' },
] as const;

/** @deprecated use PERMIS_DETAILS : kept for homepage cards */
export const FORMATIONS = PERMIS_DETAILS.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  description: p.description,
  duration: p.duration,
  price: p.price,
  featured: p.featured ?? false,
  href: `/nos-permis#${p.id}`,
}));
