export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  readTime: string;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'reussir-examen-conduite-yaounde',
    title: 'Réussir son examen de conduite à Yaoundé : 5 astuces anti-stress',
    excerpt:
      'L\'examen du permis au Cameroun peut être stressant. Voici 5 conseils de nos moniteurs pour aborder le jour J en toute sérénité.',
    date: '2025-09-19',
    category: 'Examen',
    readTime: '5 min',
    content: [
      'L\'examen du permis de conduire au Cameroun peut être une source de stress intense. Chez Auto-École Mozart, nous savons que la maîtrise du stress est aussi importante que la maîtrise du volant.',
      '**1. Préparez-vous en conditions réelles** : Demandez à votre moniteur de simuler un test officiel : même parcours, même durée, silence total. Nous proposons des séances de simulation dédiées.',
      '**2. La respiration : votre meilleur allié** : Inspirez lentement par le nez, retenez quelques secondes, expirez par la bouche. Cette technique calme votre rythme cardiaque avant l\'épreuve.',
      '**3. Visualisez votre réussite** : Chaque soir, imaginez-vous réussir votre stationnement et franchir les carrefours sans difficulté. La visualisation positive réduit l\'anxiété.',
      '**4. Concentrez-vous sur l\'instant** : Bannissez les pensées sur la note finale. Concentrez-vous uniquement sur l\'action en cours : clignotant, vitesse, rétroviseurs.',
      '**5. Hygiène de vie** : Dormez 8 heures la veille, mangez léger, hydratez-vous. Évitez café et alcool qui augmentent le stress.',
    ],
  },
  {
    id: '2',
    slug: 'permis-professionnel-cameroun',
    title: 'Permis professionnel au Cameroun : un atout pour votre carrière',
    excerpt:
      'Les permis C, D et E ouvrent des portes vers des métiers stables et bien rémunérés. Découvrez les opportunités.',
    date: '2025-09-19',
    category: 'Permis pro',
    readTime: '6 min',
    content: [
      'Le permis de conduire professionnel, c\'est bien plus qu\'une autorisation de rouler. C\'est un sésame vers des métiers stables au Cameroun.',
      '**Permis C (Poids lourds)** : Indispensable pour les véhicules de plus de 3,5 tonnes. Logistique, BTP, import-export : les chauffeurs routiers sont très recherchés.',
      '**Permis D (Transport de personnes)** : Bus, cars scolaires, transport touristique. Le secteur du tourisme à Yaoundé recrute activement.',
      '**Permis E (Remorques)** : Complément essentiel aux permis B, C et D pour la logistique et l\'agriculture.',
      'Chez Mozart, nos formateurs expérimentés transmettent les techniques de conduite et les bonnes pratiques professionnelles. Contactez-nous pour passer à la vitesse supérieure.',
    ],
  },
  {
    id: '3',
    slug: 'permis-international-cameroun',
    title: 'Permis international au Cameroun : comment l\'obtenir ?',
    excerpt:
      'Vous partez à l\'étranger ? Le permis international est indispensable. Guide complet des démarches.',
    date: '2025-09-19',
    category: 'International',
    readTime: '4 min',
    content: [
      'Le permis international est une traduction officielle de votre permis national. Il doit toujours être présenté avec votre permis camerounais valide.',
      '**Étape 1** : Avoir un permis camerounais valide (non expiré, non suspendu).',
      '**Étape 2** : Rassembler : copie du permis, photos d\'identité, pièce d\'identité, formulaire de demande.',
      '**Étape 3** : Déposer le dossier auprès de l\'autorité compétente et régler les frais.',
      '**Étape 4** : Anticiper plusieurs semaines avant votre départ.',
      'L\'Auto-École Mozart vous accompagne : vérification de votre permis et orientation vers les bons services. Contactez-nous pour toute question.',
    ],
  },
];
