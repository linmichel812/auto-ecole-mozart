/**
 * Configuration SEO : sitemap, SEO local Yaoundé, Google Business Profile.
 * @module data/seo
 */

import { ARTICLES } from './articles';
import { LEGAL_SLUGS } from './legal';

export const SEO_DEFAULTS = {
  ogImage: 'https://autoecolemozart.cm/wp-content/uploads/2025/09/auto-ecole-mozart7.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterSite: '@AutoEcoleMozart',
  geoRegion: 'CM-CE',
  geoPlacename: 'Yaoundé',
  geoPosition: '3.8480;11.5021',
  icbm: '3.8480, 11.5021',
} as const;

/** Fiche Google Business Profile : agence principale Acacias */
export const GOOGLE_BUSINESS = {
  name: 'Auto-École Mozart, Acacias',
  url: 'https://www.google.com/maps/search/Auto+Ecole+Mozart+Acacias+Yaounde',
  mapsEmbed: 'https://maps.google.com/maps?q=Acacias+Yaounde+Cameroun&z=15&output=embed',
  placeId: 'ChIJ_placeholder_acacias',
  rating: 4.8,
  reviewCount: 127,
  priceRange: '$$',
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:30', closes: '18:30' },
  ],
} as const;

/** Routes publiques indexables */
export const SITEMAP_ROUTES: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/a-propos', changefreq: 'monthly', priority: '0.8' },
  { path: '/nos-permis', changefreq: 'monthly', priority: '0.9' },
  { path: '/nos-agences', changefreq: 'monthly', priority: '0.9' },
  { path: '/actualites', changefreq: 'weekly', priority: '0.7' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/inscription', changefreq: 'monthly', priority: '0.9' },
  ...ARTICLES.map((a) => ({ path: `/actualites/${a.slug}`, changefreq: 'yearly', priority: '0.6' })),
  ...LEGAL_SLUGS.map((slug) => ({ path: `/legal/${slug}`, changefreq: 'yearly', priority: '0.3' })),
];

/** Mots-clés SEO local Yaoundé */
export const LOCAL_SEO_KEYWORDS = [
  'auto-école Yaoundé',
  'permis de conduire Yaoundé',
  'permis B Cameroun',
  'code de la route Yaoundé',
  'Auto-École Mozart',
  'formation conducteur Yaoundé',
  'agence permis Acacias',
] as const;
