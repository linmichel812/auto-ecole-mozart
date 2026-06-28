/**
 * Génération JSON-LD Schema.org : SEO local Yaoundé + Google Business Profile.
 * @module components/seo/jsonLd
 */

import { AGENCIES } from '../../data/agencies';
import { FAQ_ITEMS } from '../../data/faq';
import { CONTACT, SITE } from '../../data/site';
import { GOOGLE_BUSINESS, SEO_DEFAULTS } from '../../data/seo';

const MAIN_AGENCY = AGENCIES.find((a) => a.isMain) ?? AGENCIES[0];

export function buildOrganizationSchema() {
  return {
    '@type': 'DrivingSchool',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: 'Auto Ecole Mozart Yaoundé',
    slogan: SITE.tagline,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    image: SEO_DEFAULTS.ogImage,
    telephone: CONTACT.phone1,
    email: CONTACT.email,
    foundingDate: String(SITE.founded),
    priceRange: GOOGLE_BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: MAIN_AGENCY.address,
      addressLocality: SITE.city,
      addressRegion: 'Centre',
      addressCountry: 'CM',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: MAIN_AGENCY.lat,
      longitude: MAIN_AGENCY.lng,
    },
    openingHoursSpecification: GOOGLE_BUSINESS.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_BUSINESS.rating,
      reviewCount: GOOGLE_BUSINESS.reviewCount,
      bestRating: 5,
    },
    areaServed: {
      '@type': 'City',
      name: SITE.city,
      containedInPlace: { '@type': 'Country', name: SITE.country },
    },
    sameAs: [CONTACT.facebook, GOOGLE_BUSINESS.url],
    hasMap: GOOGLE_BUSINESS.mapsEmbed,
  };
}

export function buildLocalBusinessList() {
  return {
    '@type': 'ItemList',
    name: `Agences ${SITE.name} à Yaoundé`,
    itemListElement: AGENCIES.map((agency, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LocalBusiness',
        '@id': `${SITE.url}/nos-agences#${agency.id}`,
        name: `${SITE.name}, ${agency.name}`,
        description: agency.description,
        url: `${SITE.url}/nos-agences#${agency.id}`,
        telephone: agency.phone,
        email: agency.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: agency.address,
          addressLocality: SITE.city,
          addressCountry: 'CM',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: agency.lat,
          longitude: agency.lng,
        },
        openingHours: agency.hours,
      },
    })),
  };
}

export function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: `Auto-école à Yaoundé : permis B, A, C, D, E. ${SITE.tagline}`,
    inLanguage: 'fr-CM',
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/faq?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildFaqSchema() {
  return {
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.slice(0, 8).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildJsonLdGraph(extra?: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      buildLocalBusinessList(),
      buildFaqSchema(),
      ...(extra ?? []),
    ],
  };
}
