import type { FormEvent } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, FormGrid, Input, Select, Textarea } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { AGENCIES, CONTACT } from '../data';
import './ContactPage.css';
import './pages.css';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const isDevis = searchParams.get('devis') === '1';
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const whatsappUrl = `${CONTACT.whatsappHref}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    if (!fd.get('name')) newErrors.name = 'Nom requis';
    if (!fd.get('phone')) newErrors.phone = 'Téléphone requis';
    if (!fd.get('message')) newErrors.message = 'Message requis';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <>
      <SeoHead
        title="Contact | Auto-École Mozart Yaoundé"
        description="Contactez l'Auto-École Mozart : formulaire, téléphone, WhatsApp et carte. Demandez un devis permis."
        path="/contact"
      />
      <PageHero
        title={isDevis ? 'Demander un devis' : 'Contactez-nous'}
        subtitle="Notre équipe vous répond sous 24h, du lundi au samedi."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <section className="pages__content">
        <div className="moz-container">
          <div className="contact-page__grid">
            <aside className="contact-info">
              <div className="contact-info__card">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Téléphone
                </h3>
                <a href={CONTACT.phone1Href}>{CONTACT.phone1}</a>
                <br />
                <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
                <p>Lun – Sam : 7h30 – 19h</p>
              </div>

              <div className="contact-info__card">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </h3>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {CONTACT.phone2}
                </a>
                <p>Réponse rapide, idéal pour l&apos;inscription</p>
                <div style={{ marginTop: '1rem' }}>
                  <Button href={whatsappUrl} variant="whatsapp" size="sm">
                    Ouvrir WhatsApp
                  </Button>
                </div>
              </div>

              <div className="contact-info__card">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  Email
                </h3>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>

              <Button href="/inscription" fullWidth size="lg">
                S&apos;inscrire en ligne
              </Button>
            </aside>

            <div className="contact-form-panel">
              {submitted ? (
                <div className="contact-form__success">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <h2>Message envoyé !</h2>
                  <p style={{ color: 'var(--moz-text-muted)' }}>
                    Merci pour votre message. Notre équipe vous recontactera sous 24h ouvrées.
                  </p>
                  <Button href="/" variant="outline" style={{ marginTop: '1.5rem' }}>
                    Retour à l&apos;accueil
                  </Button>
                </div>
              ) : (
                <>
                  <h2>{isDevis ? 'Demande de devis' : 'Envoyez-nous un message'}</h2>
                  <p>Remplissez le formulaire et nous vous recontactons rapidement.</p>
                  <form onSubmit={handleSubmit} noValidate>
                    <FormGrid columns={2}>
                      <Input
                        label="Nom complet"
                        name="name"
                        required
                        placeholder="Ex. Jean Kouam"
                        error={errors.name}
                      />
                      <Input
                        label="Téléphone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+237 6 XX XX XX XX"
                        error={errors.phone}
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="votre@email.cm"
                      />
                      <Select
                        label="Objet"
                        name="subject"
                        options={[
                          { value: isDevis ? 'devis' : 'info', label: isDevis ? 'Demande de devis' : 'Demande d\'information' },
                          { value: 'inscription', label: 'Inscription' },
                          { value: 'permis-pro', label: 'Permis professionnel' },
                          { value: 'autre', label: 'Autre' },
                        ]}
                      />
                    </FormGrid>
                    <div style={{ marginTop: '1.25rem' }}>
                      <Select
                        label="Agence préférée"
                        name="agency"
                        options={[
                          { value: '', label: 'Choisir une agence…' },
                          ...AGENCIES.map((a) => ({ value: a.id, label: a.name })),
                        ]}
                      />
                    </div>
                    <div style={{ marginTop: '1.25rem' }}>
                      <Textarea
                        label="Message"
                        name="message"
                        required
                        placeholder={isDevis ? 'Précisez le permis souhaité et vos disponibilités…' : 'Votre message…'}
                        error={errors.message}
                      />
                    </div>
                    <Button type="submit" size="lg" fullWidth style={{ marginTop: '1.5rem' }}>
                      Envoyer le message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="contact-map">
            <iframe
              title="Carte : Auto-École Mozart Yaoundé"
              src="https://maps.google.com/maps?q=Acacias+Yaounde+Cameroun&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
