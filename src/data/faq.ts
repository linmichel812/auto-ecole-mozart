export const FAQ_CATEGORIES = [
  { id: 'inscription', label: 'Inscription' },
  { id: 'formation', label: 'Formation' },
  { id: 'tarifs', label: 'Tarifs & paiement' },
  { id: 'examen', label: 'Examen' },
  { id: 'agences', label: 'Agences' },
  { id: 'international', label: 'International' },
] as const;

export const FAQ_ITEMS = [
  {
    id: 'inscription',
    category: 'inscription',
    question: 'Quelles sont les conditions d\'inscription ?',
    answer:
      'Vous devez avoir au moins 18 ans, présenter une pièce d\'identité valide et remplir notre formulaire d\'inscription en ligne ou directement en agence. Un certificat médical peut être requis selon la catégorie de permis.',
  },
  {
    id: 'duree',
    category: 'formation',
    question: 'Combien de temps dure la formation Permis B ?',
    answer:
      'En moyenne 1 à 2 mois, selon votre disponibilité. Nous proposons un rythme de 3 cours théoriques et 3 séances pratiques par semaine, adaptable à votre emploi du temps.',
  },
  {
    id: 'paiement',
    category: 'tarifs',
    question: 'Proposez-vous un paiement échelonné ?',
    answer:
      'Oui, nous offrons des facilités de paiement adaptées à votre budget. Un acompte de 15 000 FCFA est demandé à l\'inscription pour le Permis B, le solde étant payable en plusieurs tranches.',
  },
  {
    id: 'echec',
    category: 'examen',
    question: 'Que se passe-t-il si j\'échoue à l\'examen ?',
    answer:
      'Nous proposons un suivi personnalisé et des séances supplémentaires pour vous préparer à la session suivante. Des examens blancs sont inclus pour identifier les points à améliorer.',
  },
  {
    id: 'agences',
    category: 'agences',
    question: 'Où sont situées vos agences à Yaoundé ?',
    answer:
      'Nous sommes présents à Acacias, Ngousso, Ngoa Ekelle, Odza, Biteng et Nkolbisson. Chaque agence propose des créneaux adaptés à son quartier.',
  },
  {
    id: 'international',
    category: 'international',
    question: 'Mon permis est-il valable à l\'étranger ?',
    answer:
      'Le permis camerounais peut être complété par un permis international selon le pays de destination. Nous vous accompagnons dans les démarches et la préparation de votre dossier.',
  },
  {
    id: 'documents',
    category: 'inscription',
    question: 'Quels documents dois-je fournir ?',
    answer:
      'Pour le Permis B : photocopie CNI, certificat médical (< 3 mois), 4 photos format permis et formulaire d\'inscription. Les permis professionnels requièrent des documents supplémentaires.',
  },
  {
    id: 'horaires',
    category: 'formation',
    question: 'Quels sont les horaires de formation ?',
    answer:
      'Nos agences sont ouvertes du lundi au samedi, de 7h30 à 19h selon les sites. Des créneaux le dimanche sont disponibles sur rendez-vous à Odza.',
  },
  {
    id: 'acompte',
    category: 'tarifs',
    question: 'Quel est le montant de l\'acompte ?',
    answer:
      'L\'acompte pour le Permis B est de 15 000 FCFA, payable à l\'inscription en ligne ou en agence. Il réserve votre place et démarre votre dossier administratif.',
  },
  {
    id: 'simulation',
    category: 'examen',
    question: 'Proposez-vous des examens blancs ?',
    answer:
      'Oui, les examens blancs sont inclus dans toutes nos formules Permis B. Nous simulons également l\'épreuve pratique en conditions réelles avant le jour J.',
  },
  {
    id: 'permis-pro',
    category: 'formation',
    question: 'Comment obtenir un permis professionnel (C, D, E) ?',
    answer:
      'Vous devez détenir un permis B valide depuis au minimum 2 ans (21 ans pour le C, 24 ans pour le D). Contactez-nous pour un devis personnalisé et les dates de session.',
  },
  {
    id: 'mobile-money',
    category: 'tarifs',
    question: 'Acceptez-vous Mobile Money ?',
    answer:
      'Oui, nous acceptons Orange Money et MTN Mobile Money pour l\'acompte et les échelonnements. Les coordonnées vous sont communiquées à la validation de votre inscription.',
  },
] as const;
