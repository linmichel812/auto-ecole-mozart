/**
 * Informations légales de l'éditeur : utilisées dans toutes les pages legal & SEO.
 * @module data/legal-meta
 */

export const LEGAL_ENTITY = {
  companyName: 'Auto-École Mozart',
  legalForm: 'Établissement de formation à la conduite',
  address: 'Quartier Acacias, Yaoundé, Région du Centre, Cameroun',
  email: 'contact@autoecolemozart.cm',
  phone: '+237 6 76 36 55 43',
  director: 'Direction Auto-École Mozart',
  registration: 'Immatriculation en cours de mise à jour auprès des autorités camerounaises compétentes',
  host: {
    name: 'Hébergeur à confirmer lors du déploiement production',
    address: 'Cameroun / Union Européenne selon contrat d\'hébergement',
  },
  dpo: 'contact@autoecolemozart.cm',
  lastUpdated: '2026-06-23',
} as const;

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  metaDescription: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/** Registre des documents légaux : source unique */
export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: 'mentions-legales',
    title: 'Mentions légales',
    metaDescription: 'Mentions légales de l\'Auto-École Mozart à Yaoundé : éditeur, hébergement, propriété intellectuelle et contact.',
    lastUpdated: LEGAL_ENTITY.lastUpdated,
    sections: [
      {
        id: 'editeur',
        title: '1. Éditeur du site',
        paragraphs: [
          `Le site ${LEGAL_ENTITY.companyName} (https://autoecolemozart.cm) est édité par ${LEGAL_ENTITY.companyName}, ${LEGAL_ENTITY.legalForm}, dont le siège est situé ${LEGAL_ENTITY.address}.`,
          `Directeur de la publication : ${LEGAL_ENTITY.director}.`,
          `Contact : ${LEGAL_ENTITY.email}, ${LEGAL_ENTITY.phone}.`,
        ],
      },
      {
        id: 'hebergement',
        title: '2. Hébergement',
        paragraphs: [
          `Le site est hébergé par ${LEGAL_ENTITY.host.name}.`,
          `Adresse de l'hébergeur : ${LEGAL_ENTITY.host.address}.`,
        ],
      },
      {
        id: 'propriete',
        title: '3. Propriété intellectuelle',
        paragraphs: [
          'L\'ensemble des contenus (textes, images, logos, vidéos, charte graphique) est protégé par le droit d\'auteur et les lois camerounaises et internationales applicables.',
          'Toute reproduction, représentation ou exploitation non autorisée est interdite sans accord écrit préalable de l\'Auto-École Mozart.',
        ],
      },
      {
        id: 'responsabilite',
        title: '4. Limitation de responsabilité',
        paragraphs: [
          'L\'Auto-École Mozart s\'efforce d\'assurer l\'exactitude des informations publiées. Toutefois, elle ne saurait garantir l\'absence d\'erreurs ou d\'omissions.',
          'Les liens hypertextes vers des sites tiers n\'engagent pas la responsabilité de l\'éditeur quant à leur contenu.',
        ],
      },
      {
        id: 'droit',
        title: '5. Droit applicable',
        paragraphs: [
          'Les présentes mentions sont régies par le droit camerounais. En cas de litige, les tribunaux compétents de Yaoundé seront seuls compétents, sauf disposition légale impérative contraire.',
        ],
      },
    ],
  },
  {
    slug: 'politique-de-confidentialite',
    title: 'Politique de confidentialité',
    metaDescription: 'Politique de confidentialité RGPD de l\'Auto-École Mozart : collecte, traitement et protection de vos données personnelles.',
    lastUpdated: LEGAL_ENTITY.lastUpdated,
    sections: [
      {
        id: 'intro',
        title: '1. Introduction',
        paragraphs: [
          `${LEGAL_ENTITY.companyName} accorde une importance primordiale à la protection de vos données personnelles, conformément aux principes inspirés du RGPD et à la réglementation camerounaise en vigueur (notamment la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité).`,
          'La présente politique décrit les données collectées, leurs finalités, leur durée de conservation et vos droits.',
        ],
      },
      {
        id: 'donnees',
        title: '2. Données collectées',
        list: [
          'Identité : nom, prénom, date de naissance',
          'Coordonnées : email, téléphone, adresse',
          'Données de formation : permis visé, agence, progression',
          'Données de paiement : références transaction (sans stockage de données bancaires sensibles)',
          'Données de navigation : cookies (voir Politique des cookies)',
        ],
        paragraphs: [],
      },
      {
        id: 'finalites',
        title: '3. Finalités du traitement',
        list: [
          'Gestion des inscriptions et du parcours de formation',
          'Facturation et suivi des paiements',
          'Communication pédagogique et administrative',
          'Amélioration de nos services et sécurité du site',
          'Respect des obligations légales',
        ],
        paragraphs: [],
      },
      {
        id: 'base',
        title: '4. Base légale',
        paragraphs: [
          'Le traitement repose sur l\'exécution du contrat de formation, votre consentement (newsletter, cookies non essentiels), et le respect d\'obligations légales.',
        ],
      },
      {
        id: 'duree',
        title: '5. Durée de conservation',
        paragraphs: [
          'Les données liées à la formation sont conservées pendant la durée de la relation contractuelle, puis archivées conformément aux obligations légales (généralement 5 à 10 ans selon la nature des documents).',
          'Les données de connexion et logs techniques : 12 mois maximum.',
        ],
      },
      {
        id: 'droits',
        title: '6. Vos droits',
        list: [
          'Droit d\'accès, de rectification et d\'effacement',
          'Droit à la limitation et à la portabilité',
          'Droit d\'opposition pour motifs légitimes',
          'Retrait du consentement à tout moment',
        ],
        paragraphs: [
          `Pour exercer vos droits : ${LEGAL_ENTITY.dpo}. Réponse sous 30 jours.`,
        ],
      },
      {
        id: 'securite',
        title: '7. Sécurité',
        paragraphs: [
          'Nous mettons en œuvre des mesures techniques et organisationnelles : chiffrement HTTPS, authentification sécurisée, accès restreint aux données, sauvegardes régulières.',
        ],
      },
    ],
  },
  {
    slug: 'conditions-generales-utilisation',
    title: 'Conditions générales d\'utilisation',
    metaDescription: 'CGU du site Auto-École Mozart : règles d\'utilisation du site web, espaces élève et admin.',
    lastUpdated: LEGAL_ENTITY.lastUpdated,
    sections: [
      {
        id: 'objet',
        title: '1. Objet',
        paragraphs: [
          'Les présentes CGU régissent l\'accès et l\'utilisation du site internet et des espaces numériques (espace élève, outils pédagogiques) mis à disposition par l\'Auto-École Mozart.',
        ],
      },
      {
        id: 'acces',
        title: '2. Accès au service',
        paragraphs: [
          'Le site est accessible 24h/24 sous réserve des opérations de maintenance. L\'accès à l\'espace élève nécessite des identifiants personnels et confidentiels.',
          'L\'utilisateur s\'engage à ne pas partager ses identifiants et à signaler toute utilisation frauduleuse.',
        ],
      },
      {
        id: 'usage',
        title: '3. Usage autorisé',
        list: [
          'Consultation des informations sur nos formations',
          'Inscription en ligne et suivi pédagogique',
          'Paiement des frais de formation via les moyens proposés',
          'Utilisation des ressources pédagogiques dans un cadre personnel',
        ],
        paragraphs: [],
      },
      {
        id: 'interdit',
        title: '4. Comportements interdits',
        list: [
          'Tentative d\'intrusion ou d\'altération du système',
          'Extraction automatisée de données (scraping) sans autorisation',
          'Publication de contenus illicites, diffamatoires ou contraires à l\'ordre public',
          'Usurpation d\'identité',
        ],
        paragraphs: [],
      },
      {
        id: 'suspension',
        title: '5. Suspension',
        paragraphs: [
          'L\'Auto-École Mozart se réserve le droit de suspendre l\'accès en cas de violation des CGU, sans préjudice de recours judiciaires.',
        ],
      },
    ],
  },
  {
    slug: 'conditions-generales-vente',
    title: 'Conditions générales de vente',
    metaDescription: 'CGV Auto-École Mozart : tarifs, modalités de paiement, formation permis de conduire à Yaoundé.',
    lastUpdated: LEGAL_ENTITY.lastUpdated,
    sections: [
      {
        id: 'champ',
        title: '1. Champ d\'application',
        paragraphs: [
          'Les présentes CGV s\'appliquent à toute inscription à une formation proposée par l\'Auto-École Mozart (permis B, A, C, D, E, conversion, permis international).',
        ],
      },
      {
        id: 'tarifs',
        title: '2. Tarifs et devis',
        paragraphs: [
          'Les tarifs sont indiqués en francs CFA (FCFA) TTC sur le site et en agence. Ils peuvent être révisés ; le tarif applicable est celui en vigueur à la date de signature du contrat de formation.',
          'Un devis personnalisé peut être établi pour les formations sur mesure (permis C, D, international).',
        ],
      },
      {
        id: 'paiement',
        title: '3. Modalités de paiement',
        list: [
          'Paiement comptant avec remise éventuelle',
          'Acompte à l\'inscription + solde échelonné',
          'Orange Money, MTN Mobile Money, espèces en agence, virement bancaire',
        ],
        paragraphs: [
          'L\'inscription n\'est définitive qu\'après versement de l\'acompte et validation du dossier administratif.',
        ],
      },
      {
        id: 'formation',
        title: '4. Exécution de la formation',
        paragraphs: [
          'La formation comprend les modules indiqués dans le contrat (code, conduite, examens blancs selon la formule). Les heures de conduite non utilisées dans le délai contractuel peuvent être soumises à conditions particulières.',
        ],
      },
      {
        id: 'annulation',
        title: '5. Annulation par l\'élève',
        paragraphs: [
          'Toute demande d\'annulation doit être formulée par écrit. Les sommes versées restent acquises à hauteur des prestations déjà réalisées et des frais administratifs, conformément à la politique de remboursement.',
        ],
      },
      {
        id: 'litiges',
        title: '6. Litiges',
        paragraphs: [
          'En cas de différend, une solution amiable sera recherchée prioritairement. À défaut, les tribunaux de Yaoundé seront compétents.',
        ],
      },
    ],
  },
  {
    slug: 'politique-cookies',
    title: 'Politique des cookies',
    metaDescription: 'Politique cookies Auto-École Mozart : types de cookies, finalités et gestion de vos préférences.',
    lastUpdated: LEGAL_ENTITY.lastUpdated,
    sections: [
      {
        id: 'definition',
        title: '1. Qu\'est-ce qu\'un cookie ?',
        paragraphs: [
          'Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d\'un site. Il permet de mémoriser des informations pour améliorer votre expérience.',
        ],
      },
      {
        id: 'types',
        title: '2. Cookies utilisés',
        paragraphs: [],
        list: [
          'Essentiels : session, authentification espace élève, consentement cookies (obligatoires)',
          'Fonctionnels : préférences d\'affichage, tunnel d\'inscription (localStorage)',
          'Analytiques : mesure d\'audience anonymisée (avec votre consentement)',
          'Marketing : non utilisés actuellement',
        ],
      },
      {
        id: 'duree',
        title: '3. Durée de conservation',
        paragraphs: [
          'Cookies de session : supprimés à la fermeture du navigateur.',
          'Consentement cookies : 13 mois.',
          'Authentification « rester connecté » : 30 jours maximum.',
        ],
      },
      {
        id: 'gestion',
        title: '4. Gérer vos préférences',
        paragraphs: [
          'Vous pouvez accepter, refuser ou personnaliser les cookies via la bannière affichée lors de votre première visite.',
          'Vous pouvez également configurer votre navigateur pour bloquer les cookies (certaines fonctionnalités pourraient être limitées).',
        ],
      },
    ],
  },
  {
    slug: 'politique-remboursement',
    title: 'Politique de remboursement',
    metaDescription: 'Politique de remboursement Auto-École Mozart : conditions, délais et procédure.',
    lastUpdated: LEGAL_ENTITY.lastUpdated,
    sections: [
      {
        id: 'principe',
        title: '1. Principe général',
        paragraphs: [
          'Les formations proposées sont des prestations de service. Conformément aux usages du secteur au Cameroun, les frais engagés couvrent des coûts immédiats (dossier, réservation moniteur, accès plateforme).',
        ],
      },
      {
        id: 'acompte',
        title: '2. Acompte d\'inscription',
        paragraphs: [
          'L\'acompte versé à l\'inscription est en principe non remboursable une fois le dossier validé et les ressources pédagogiques activées.',
          'En cas de refus du dossier par l\'administration (documents non conformes), l\'acompte peut être remboursé intégralement sous 15 jours ouvrés.',
        ],
      },
      {
        id: 'annulation',
        title: '3. Annulation avant début de formation',
        paragraphs: [
          'Annulation plus de 14 jours avant le début : remboursement possible à hauteur de 70 % de l\'acompte, déduction faite des frais de dossier (5 000 FCFA).',
          'Annulation moins de 14 jours avant : acompte non remboursable.',
        ],
      },
      {
        id: 'cours',
        title: '4. Cours non consommés',
        paragraphs: [
          'Les heures de conduite ou de code non utilisées ne donnent pas lieu à remboursement automatique, sauf cas de force majeure dûment justifié (certificat médical, mutation professionnelle) examiné au cas par cas.',
        ],
      },
      {
        id: 'procedure',
        title: '5. Procédure de demande',
        paragraphs: [
          `Adressez votre demande écrite à ${LEGAL_ENTITY.email} avec : nom, numéro de dossier, motif, RIB Mobile Money ou coordonnées bancaires.`,
          'Délai de traitement : 30 jours ouvrés. Remboursement effectué par le même moyen de paiement lorsque possible.',
        ],
      },
    ],
  },
];

export const LEGAL_SLUGS = LEGAL_DOCUMENTS.map((d) => d.slug);

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((d) => d.slug === slug);
}

/** Liens footer vers documents légaux */
export const LEGAL_LINKS = LEGAL_DOCUMENTS.map((d) => ({
  href: `/legal/${d.slug}`,
  label: d.title,
}));
