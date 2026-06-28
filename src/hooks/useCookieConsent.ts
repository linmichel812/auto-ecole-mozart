/**
 * Gestion du consentement cookies / RGPD : persistance localStorage.
 * @module hooks/useCookieConsent
 */

export interface CookieConsent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

const STORAGE_KEY = 'mozart_cookie_consent';
const CONSENT_VERSION = 1;

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean, marketing: boolean): CookieConsent {
  const consent: CookieConsent = {
    essential: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  return consent;
}

export function hasConsentChoice(): boolean {
  return getCookieConsent() !== null;
}

export function acceptAllCookies(): CookieConsent {
  return saveCookieConsent(true, false);
}

export function rejectOptionalCookies(): CookieConsent {
  return saveCookieConsent(false, false);
}
