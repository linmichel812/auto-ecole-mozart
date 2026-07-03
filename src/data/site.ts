import collageInstructor from '../assets/image.png';
import collageStudents from '../assets/image2.png';
import collageTraining from '../assets/auto-ecole-mozart2-rbxk76c6fuz9d0ju0jeie029kmhtgxpr5npjf3rfyg.jpg';

export const SITE = {
  name: 'Auto-École Mozart',
  tagline: 'Le génie du volant',
  url: 'https://autoecolemozart.cm',
  locale: 'fr_CM',
  city: 'Yaoundé',
  country: 'Cameroun',
  founded: 2010,
} as const;

export const CONTACT = {
  phone1: '+237 6 76 36 55 43',
  phone1Href: 'tel:+237676365543',
  phone2: '+237 6 96 27 69 50',
  phone2Href: 'tel:+237696276950',
  whatsapp: '237696276950',
  whatsappHref: 'https://wa.me/237696276950',
  whatsappMessage:
    'Bonjour Auto-École Mozart, je souhaite m\'inscrire à une formation permis. Merci de me recontacter.',
  email: 'contact@autoecolemozart.cm',
  facebook: 'https://web.facebook.com/AutoEcoleMozart',
} as const;

export const ASSETS = {
  logo: '/logo.png',
  heroBg: 'https://autoecolemozart.cm/wp-content/uploads/2025/09/auto-ecole-mozart7.jpg',
  aboutImage: 'https://autoecolemozart.cm/wp-content/uploads/2025/09/auto-ecole-mozart7.jpg',
  collage: {
    vehicles: 'https://autoecolemozart.cm/wp-content/uploads/2025/09/auto-ecole-mozart7.jpg',
    instructor: collageInstructor,
    students: collageStudents,
    training: collageTraining,
  },
} as const;

export const STATS = [
  { value: '2 500+', label: 'Élèves formés', numericValue: 2500 },
  { value: '95 %', label: 'Taux de réussite', numericValue: 95 },
  { value: '6', label: 'Agences à Yaoundé', numericValue: 6 },
  { value: '15+', label: "Années d'expérience", numericValue: 15 },
] as const;
