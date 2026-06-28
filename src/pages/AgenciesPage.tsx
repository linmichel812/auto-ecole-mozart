import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge, Button } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { AGENCIES } from '../data';
import type { Agency } from '../data';
import './AgenciesPage.css';
import './pages.css';

function DetailRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="agency-detail-row">
      {icon}
      <div>{children}</div>
    </div>
  );
}

export function AgenciesPage() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('agence') ?? AGENCIES.find((a) => a.isMain)?.id ?? AGENCIES[0].id;
  const [selectedId, setSelectedId] = useState(initialId);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && AGENCIES.some((a) => a.id === hash)) {
      setSelectedId(hash);
    }
  }, []);

  const agency = AGENCIES.find((a) => a.id === selectedId) ?? AGENCIES[0];

  return (
    <>
      <SeoHead
        title="Nos agences à Yaoundé | Auto-École Mozart"
        description="6 agences à Yaoundé : Acacias, Ngousso, Ngoa Ekelle, Odza, Biteng, Nkolbisson. Horaires, contact et itinéraire."
        path="/nos-agences"
      />
      <PageHero
        title="Nos agences"
        subtitle="6 points de formation à Yaoundé : choisissez l'agence la plus proche de chez vous."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Agences' },
        ]}
      />

      <section className="pages__content">
        <div className="moz-container">
          <AgencySelector selectedId={selectedId} onSelect={setSelectedId} agency={agency} />
        </div>
      </section>
    </>
  );
}

function AgencySelector({
  selectedId,
  onSelect,
  agency,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  agency: Agency;
}) {
  return (
    <div className="agency-selector">
      <div
        className="agency-selector__tabs"
        role="tablist"
        aria-label="Choisir une agence"
      >
        {AGENCIES.map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={selectedId === a.id}
            aria-controls={`agency-panel-${a.id}`}
            className={`agency-selector__tab ${selectedId === a.id ? 'agency-selector__tab--active' : ''} ${a.isMain ? 'agency-selector__tab--main' : ''}`}
            onClick={() => onSelect(a.id)}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div
        key={agency.id}
        id={`agency-panel-${agency.id}`}
        role="tabpanel"
        className="agency-selector__panel"
      >
        <div className="agency-selector__info">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            {agency.isMain && <Badge variant="primary" solid>Agence principale</Badge>}
          </div>
          <h3>{agency.name}</h3>
          <p className="agency-selector__desc">{agency.description}</p>

          <div className="agency-selector__details">
            <DetailRow
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            >
              <strong>Adresse</strong>
              <br />
              {agency.address}
            </DetailRow>
            <DetailRow
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              }
            >
              <a href={agency.phoneHref}>{agency.phone}</a>
            </DetailRow>
            <DetailRow
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              }
            >
              <a href={`mailto:${agency.email}`}>{agency.email}</a>
            </DetailRow>
            <DetailRow
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
            >
              {agency.hours}
            </DetailRow>
          </div>

          <div className="agency-selector__services">
            {agency.services.map((s) => (
              <Badge key={s} variant="neutral">
                {s}
              </Badge>
            ))}
          </div>

          <div className="agency-selector__actions">
            <Button href={agency.directionsUrl} target="_blank" rel="noopener noreferrer">
              Obtenir l&apos;itinéraire
            </Button>
            <Button href={`/inscription?agence=${agency.id}`} variant="outline">
              S&apos;inscrire à {agency.name}
            </Button>
            <Button
              href={`https://wa.me/237696276950?text=${encodeURIComponent(`Bonjour, je souhaite des infos sur l'agence ${agency.name}.`)}`}
              variant="whatsapp"
            >
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="agency-selector__map">
          <iframe
            title={`Carte : Agence Mozart ${agency.name}`}
            src={agency.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
