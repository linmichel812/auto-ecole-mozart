import { useEffect } from 'react';
import { SITE } from '../../data/site';
import { SEO_DEFAULTS } from '../../data/seo';
import { buildJsonLdGraph } from './jsonLd';

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  /** Image Open Graph (URL absolue) */
  ogImage?: string;
  /** noindex pour espaces privés */
  noIndex?: boolean;
  /** Schémas JSON-LD additionnels */
  extraSchema?: Record<string, unknown>[];
}

export function SeoHead({
  title = `${SITE.name} | Permis de conduire à Yaoundé | ${SITE.tagline}`,
  description = `Auto-École Mozart à Yaoundé : permis B, A, C, D, E, conversion et permis international. Moniteurs pédagogues, véhicules modernes, 6 agences. Inscrivez-vous dès 50 000 FCFA.`,
  path = '/',
  ogImage = SEO_DEFAULTS.ogImage,
  noIndex = false,
  extraSchema,
}: SeoHeadProps) {
  const canonicalUrl = `${SITE.url}${path === '/' ? '' : path}`.replace(/\/$/, '') || SITE.url;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE.url}${ogImage}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('geo.region', SEO_DEFAULTS.geoRegion);
    setMeta('geo.placename', SEO_DEFAULTS.geoPlacename);
    setMeta('geo.position', SEO_DEFAULTS.geoPosition);
    setMeta('ICBM', SEO_DEFAULTS.icbm);

    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:locale', SITE.locale, true);
    setMeta('og:site_name', SITE.name, true);
    setMeta('og:image', imageUrl, true);
    setMeta('og:image:width', String(SEO_DEFAULTS.ogImageWidth), true);
    setMeta('og:image:height', String(SEO_DEFAULTS.ogImageHeight), true);
    setMeta('og:image:alt', `${SITE.name}, Auto-école à Yaoundé`, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', SEO_DEFAULTS.twitterSite);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, path, noIndex, canonicalUrl, imageUrl]);

  const jsonLd = buildJsonLdGraph(extraSchema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
