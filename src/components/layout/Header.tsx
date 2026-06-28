import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../../design-system';
import { ASSETS, CONTACT, NAV_LINKS, SITE } from '../../data';
import { OptimizedImage } from '../ui/OptimizedImage';
import './Header.css';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const whatsappUrl = `${CONTACT.whatsappHref}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <header className={`moz-header ${scrolled ? 'moz-header--scrolled' : ''}`}>
      <div className="moz-header__main">
        <div className="moz-container moz-header__inner">
          <Link to="/" className="moz-header__logo" aria-label={`${SITE.name}, Accueil`}>
            <OptimizedImage
              src={ASSETS.logo}
              alt={SITE.name}
              width={160}
              height={68}
              priority
            />
          </Link>

          <nav className="moz-header__nav" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => (isActive ? 'moz-header__link--active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="moz-header__actions">
            <Button to="/espace-eleve/connexion" variant="ghost" size="sm">
              Espace élève
            </Button>
            <Button href={whatsappUrl} variant="whatsapp" size="sm" icon={<WhatsAppIcon />}>
              WhatsApp
            </Button>
            <Button to="/inscription" size="sm">
              S&apos;inscrire
            </Button>
          </div>

          <button
            type="button"
            className="moz-header__menu-btn"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav
          className={`moz-header__mobile-nav ${menuOpen ? 'moz-header__mobile-nav--open' : ''}`}
          aria-label="Navigation mobile"
          hidden={!menuOpen}
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="moz-header__mobile-actions">
            <Button to="/espace-eleve/connexion" variant="outline" fullWidth onClick={() => setMenuOpen(false)}>
              Espace élève
            </Button>
            <Button to="/inscription" fullWidth onClick={() => setMenuOpen(false)}>
              S&apos;inscrire
            </Button>
            <Button href={whatsappUrl} variant="whatsapp" fullWidth icon={<WhatsAppIcon />}>
              WhatsApp
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
