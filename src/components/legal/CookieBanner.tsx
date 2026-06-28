import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../design-system';
import {
  acceptAllCookies,
  getCookieConsent,
  hasConsentChoice,
  rejectOptionalCookies,
  saveCookieConsent,
} from '../../hooks/useCookieConsent';
import './CookieBanner.css';

/**
 * Bannière cookies RGPD : affichée tant qu'aucun choix n'est enregistré.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setVisible(!hasConsentChoice());
  }, []);

  const close = () => setVisible(false);

  const handleAcceptAll = () => {
    acceptAllCookies();
    close();
  };

  const handleReject = () => {
    rejectOptionalCookies();
    close();
  };

  const handleSavePrefs = () => {
    saveCookieConsent(analytics, false);
    close();
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-modal="false">
      <div className="cookie-banner__inner moz-container">
        <div className="cookie-banner__content">
          <h2 id="cookie-banner-title" className="cookie-banner__title">Cookies &amp; confidentialité</h2>
          <p className="cookie-banner__text">
            Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre accord,
            des cookies analytiques pour améliorer nos services. Consultez notre{' '}
            <Link to="/legal/politique-cookies">politique des cookies</Link> et notre{' '}
            <Link to="/legal/politique-de-confidentialite">politique de confidentialité</Link>.
          </p>

          {showPrefs && (
            <div className="cookie-banner__prefs">
              <label className="cookie-banner__pref cookie-banner__pref--locked">
                <input type="checkbox" checked disabled />
                <span><strong>Essentiels</strong> : toujours actifs (session, sécurité)</span>
              </label>
              <label className="cookie-banner__pref">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span><strong>Analytiques</strong> : mesure d&apos;audience anonymisée</span>
              </label>
            </div>
          )}
        </div>

        <div className="cookie-banner__actions">
          {!showPrefs ? (
            <>
              <Button size="sm" onClick={handleAcceptAll}>Tout accepter</Button>
              <Button size="sm" variant="outline" onClick={() => setShowPrefs(true)}>Personnaliser</Button>
              <Button size="sm" variant="ghost" onClick={handleReject}>Refuser le non-essentiel</Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleSavePrefs}>Enregistrer mes choix</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowPrefs(false)}>Retour</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Bouton pour rouvrir les préférences cookies (footer) */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cookie-settings-btn"
      onClick={() => {
        localStorage.removeItem('mozart_cookie_consent');
        window.location.reload();
      }}
    >
      Gérer les cookies
    </button>
  );
}

/** Affiche le statut consentement pour debug / admin */
export function useAnalyticsAllowed(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics ?? false;
}
