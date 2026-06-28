export interface Agency {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
  services: string[];
  mapEmbed: string;
  directionsUrl: string;
  lat: number;
  lng: number;
  isMain?: boolean;
}

export const AGENCIES: Agency[] = [
  {
    id: 'acacias',
    name: 'Acacias',
    description: 'Agence principale : accueil, inscriptions, cours théoriques et administratif.',
    address: 'Quartier Acacias, Yaoundé, Cameroun',
    phone: '+237 6 76 36 55 43',
    phoneHref: 'tel:+237676365543',
    email: 'contact@autoecolemozart.cm',
    hours: 'Lun – Sam : 7h30 – 18h30',
    services: ['Inscriptions', 'Code', 'Permis B', 'Permis A', 'Administration'],
    mapEmbed:
      'https://maps.google.com/maps?q=Acacias+Yaounde+Cameroun&z=15&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Acacias+Yaounde+Cameroun',
    lat: 3.848,
    lng: 11.502,
    isMain: true,
  },
  {
    id: 'ngousso',
    name: 'Ngousso',
    description: 'Point de formation pratique : permis B et A, horaires étendus.',
    address: 'Quartier Ngousso, Yaoundé, Cameroun',
    phone: '+237 6 96 27 69 50',
    phoneHref: 'tel:+237696276950',
    email: 'ngousso@autoecolemozart.cm',
    hours: 'Lun – Sam : 7h00 – 19h00',
    services: ['Conduite pratique', 'Permis B', 'Permis A'],
    mapEmbed:
      'https://maps.google.com/maps?q=Ngousso+Yaounde+Cameroun&z=15&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Ngousso+Yaounde+Cameroun',
    lat: 3.868,
    lng: 11.535,
  },
  {
    id: 'ngoa-ekelle',
    name: 'Ngoa Ekelle',
    description: 'Proximité campus : horaires adaptés aux étudiants et jeunes actifs.',
    address: 'Ngoa Ekelle, Yaoundé, Cameroun',
    phone: '+237 6 76 36 55 43',
    phoneHref: 'tel:+237676365543',
    email: 'ngoaekelle@autoecolemozart.cm',
    hours: 'Lun – Sam : 8h00 – 18h00',
    services: ['Code', 'Permis B', 'Permis A', 'Examens blancs'],
    mapEmbed:
      'https://maps.google.com/maps?q=Ngoa+Ekelle+Yaounde+Cameroun&z=15&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Ngoa+Ekelle+Yaounde+Cameroun',
    lat: 3.856,
    lng: 11.514,
  },
  {
    id: 'odza',
    name: 'Odza',
    description: 'Formation pratique : moniteurs disponibles 7j/7 sur rendez-vous.',
    address: 'Quartier Odza, Yaoundé, Cameroun',
    phone: '+237 6 96 27 69 50',
    phoneHref: 'tel:+237696276950',
    email: 'odza@autoecolemozart.cm',
    hours: 'Lun – Dim : 7h00 – 19h00 (sur RDV)',
    services: ['Conduite pratique', 'Permis B', 'Simulation examen'],
    mapEmbed:
      'https://maps.google.com/maps?q=Odza+Yaounde+Cameroun&z=15&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Odza+Yaounde+Cameroun',
    lat: 3.822,
    lng: 11.545,
  },
  {
    id: 'biteng',
    name: 'Biteng',
    description: 'Agence de proximité : permis voiture et moto, accueil personnalisé.',
    address: 'Biteng, Yaoundé, Cameroun',
    phone: '+237 6 76 36 55 43',
    phoneHref: 'tel:+237676365543',
    email: 'biteng@autoecolemozart.cm',
    hours: 'Lun – Sam : 7h30 – 18h00',
    services: ['Permis B', 'Permis A', 'Inscriptions'],
    mapEmbed:
      'https://maps.google.com/maps?q=Biteng+Yaounde+Cameroun&z=15&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Biteng+Yaounde+Cameroun',
    lat: 3.805,
    lng: 11.495,
  },
  {
    id: 'nkolbisson',
    name: 'Nkolbisson',
    description: 'Extension nord : cours pratiques, simulations et permis professionnels.',
    address: 'Nkolbisson, Yaoundé, Cameroun',
    phone: '+237 6 96 27 69 50',
    phoneHref: 'tel:+237696276950',
    email: 'nkolbisson@autoecolemozart.cm',
    hours: 'Lun – Sam : 7h30 – 18h30',
    services: ['Permis B', 'Permis C/D/E', 'Conduite pratique'],
    mapEmbed:
      'https://maps.google.com/maps?q=Nkolbisson+Yaounde+Cameroun&z=15&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Nkolbisson+Yaounde+Cameroun',
    lat: 3.895,
    lng: 11.48,
  },
];
