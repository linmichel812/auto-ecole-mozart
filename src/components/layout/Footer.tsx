import { Link } from 'react-router-dom';
import { CONTACT, FOOTER_FORMATION_LINKS, LEGAL_LINKS, NAV_LINKS, SITE } from '../../data';
import { ASSETS } from '../../data';
import { CookieSettingsButton } from '../legal/CookieBanner';
import './Footer.css';

const year = new Date().getFullYear();

const FOOTER_LEGAL_LINKS = LEGAL_LINKS.filter((link) => !link.href.endsWith('/politique-cookies'));

function legalLinkClass(href: string): string {
  if (href.endsWith('/mentions-legales') || href.endsWith('/politique-de-confidentialite')) {
    return 'moz-footer__legal-item moz-footer__legal-item--mobile-hide';
  }
  return 'moz-footer__legal-item';
}

export function Footer() {
  return (
    <footer className="moz-footer" role="contentinfo">
      <div className="moz-container">
        <div className="moz-footer__grid">
          <div className="moz-footer__brand">
            <Link to="/" aria-label={`${SITE.name}, Accueil`}>
              <img src={ASSETS.logo} alt="" width={160} height={68} loading="lazy" decoding="async" />
            </Link>
            <p className="moz-footer__tagline">{SITE.tagline}</p>
            <p className="moz-footer__desc">
              Référence incontournable à Yaoundé pour former des conducteurs responsables,
              disciplinés et confiants depuis plus de 15 ans.
            </p>
            <div className="moz-footer__social">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Auto-École Mozart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`${CONTACT.whatsappHref}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Auto-École Mozart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="moz-footer__col moz-footer__col--formations">
            <h2 className="moz-footer__title">Formations</h2>
            <ul className="moz-footer__links">
              {FOOTER_FORMATION_LINKS.map((f) => (
                <li key={f.href}>
                  <Link to={f.href}>{f.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="moz-footer__col moz-footer__col--navigation">
            <h2 className="moz-footer__title">Navigation</h2>
            <ul className="moz-footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/inscription">S&apos;inscrire</Link>
              </li>
            </ul>
          </div>

          <div className="moz-footer__col moz-footer__col--legal">
            <h2 className="moz-footer__title">Informations légales</h2>
            <ul className="moz-footer__links">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href} className={legalLinkClass(link.href)}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
              <li className="moz-footer__cookies-combo">
                <Link to="/legal/politique-cookies">Politique cookies</Link>
                <span className="moz-footer__cookies-sep" aria-hidden="true">
                  ·
                </span>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>

          <div>
            <h2 className="moz-footer__title">Contact</h2>
            <div className="moz-footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div>
                <a href={CONTACT.phone1Href}>{CONTACT.phone1}</a>
                <br />
                <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
              </div>
            </div>
            <div className="moz-footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <div className="moz-footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Yaoundé, 6 agences</span>
            </div>
          </div>
        </div>

        <div className="moz-footer__bottom">
          <div className="moz-container moz-footer__bottom-inner">
            <p>
              © {year} {SITE.name}, {SITE.city}, {SITE.country}. Tous droits réservés.
            </p>
            <div className="moz-footer__bottom-links">
              <Link to="/legal/mentions-legales">Mentions légales</Link>
              <Link to="/legal/politique-de-confidentialite">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
