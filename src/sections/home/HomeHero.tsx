import type { CSSProperties } from 'react';
import { Button } from '../../design-system';
import { ASSETS, SITE } from '../../data/homeContent';
import { useParallax } from '../../hooks/useParallax';
import './HomeHero.css';

const COLLAGE = [
  {
    src: ASSETS.collage.vehicles,
    alt: 'Véhicules de formation modernes et climatisés de l\'Auto-École Mozart',
    label: 'Véhicules',
  },
  {
    src: ASSETS.collage.instructor,
    alt: 'Moniteur pédagogue accompagnant un élève conducteur',
    label: 'Moniteurs',
  },
  {
    src: ASSETS.collage.students,
    alt: 'Élève en cours de conduite pratique à Yaoundé',
    label: 'Élèves',
  },
  {
    src: ASSETS.collage.training,
    alt: 'Séance de formation à la conduite en conditions réelles',
    label: 'Formation',
  },
] as const;

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function HomeHero() {
  const bgRef = useParallax<HTMLDivElement>(0.15);
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div
        ref={bgRef}
        className="home-hero__bg"
        style={{ '--moz-hero-image': `url(${ASSETS.heroBg})` } as CSSProperties}
        aria-hidden="true"
      />
      <div className="home-hero__pattern" aria-hidden="true" />
      <div className="home-hero__glow" aria-hidden="true" />

      <div className="moz-container home-hero__inner">
        <div className="home-hero__grid">
          <div>
            <span className="home-hero__overline">Votre permis, c&apos;est ici !</span>
            <h1 id="hero-title" className="home-hero__title">
              Apprenez à rouler,
              <br />
              <em>vivez pleinement !</em>
            </h1>
            <p className="home-hero__subtitle">
              {SITE.name}, {SITE.tagline}. Référence à Yaoundé depuis plus de 15 ans.
              Moniteurs pédagogues, véhicules modernes et 6 agences pour vous accompagner
              jusqu&apos;à la réussite.
            </p>
            <div className="home-hero__actions">
              <Button href="/inscription" size="lg">
                S&apos;inscrire maintenant
              </Button>
              <Button href="/contact?devis=1" size="lg" variant="outline" onDark>
                Demander un devis
              </Button>
            </div>
            <div className="home-hero__trust">
              <span className="home-hero__trust-item">
                <CheckIcon /> Agréé &amp; reconnu à Yaoundé
              </span>
              <span className="home-hero__trust-item">
                <CheckIcon /> Paiement échelonné
              </span>
              <span className="home-hero__trust-item">
                <CheckIcon /> Dès 50 000 FCFA
              </span>
            </div>
          </div>

          <div className="home-hero__collage" aria-label="Galerie : véhicules, moniteurs et élèves">
            {COLLAGE.map((item, index) => (
              <figure key={item.label} className="home-hero__photo">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={360}
                  height={450}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding={index === 0 ? 'sync' : 'async'}
                />
                <figcaption className="home-hero__photo-label">{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
