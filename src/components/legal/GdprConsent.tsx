import { Link } from 'react-router-dom';

interface GdprConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string;
}

/**
 * Case à cocher consentement RGPD : formulaires inscription / contact.
 */
export function GdprConsent({ checked, onChange, error, id = 'gdpr-consent' }: GdprConsentProps) {
  return (
    <div className="gdpr-consent">
      <label className="gdpr-consent__label" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-invalid={!!error}
        />
        <span>
          J&apos;accepte les{' '}
          <Link to="/legal/conditions-generales-utilisation" target="_blank">CGU</Link>, les{' '}
          <Link to="/legal/conditions-generales-vente" target="_blank">CGV</Link> et la{' '}
          <Link to="/legal/politique-de-confidentialite" target="_blank">politique de confidentialité</Link>.
          Je consens au traitement de mes données pour la gestion de mon inscription conformément au RGPD.
        </span>
      </label>
      {error && <p className="gdpr-consent__error" role="alert">{error}</p>}
    </div>
  );
}
