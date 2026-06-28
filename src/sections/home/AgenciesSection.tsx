import { Link } from 'react-router-dom';
import { Button } from '../../design-system';
import { AGENCIES } from '../../data';
import './AgenciesSection.css';

export function AgenciesSection() {
  return (
    <section id="agences" className="moz-section" aria-labelledby="agencies-title">
      <div className="moz-container">
        <header className="moz-section-header moz-section-header--center">
          <span className="moz-overline">Présence locale</span>
          <h2 id="agencies-title">Notre réseau d&apos;agences à Yaoundé</h2>
          <p className="moz-lead">
            6 points de formation répartis dans les principaux quartiers de Yaoundé
            pour vous garantir proximité, flexibilité et suivi de qualité.
          </p>
        </header>

        <div className="agencies-section__grid">
          {AGENCIES.map((agency) => (
            <Link key={agency.id} to={`/nos-agences#${agency.id}`} className="agencies-section__card">
              <div className="agencies-section__header">
                <h3 className="agencies-section__name">{agency.name}</h3>
                <span className="agencies-section__pin" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
              </div>
              <p className="agencies-section__desc">{agency.description}</p>
              <span className="agencies-section__link">
                Voir l&apos;agence
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="agencies-section__map">
          <h3 className="agencies-section__map-title">Toujours une agence près de chez vous</h3>
          <p className="agencies-section__map-desc">
            Acacias, Ngousso, Ngoa Ekelle, Odza, Biteng et Nkolbisson : choisissez
            l&apos;agence la plus proche lors de votre inscription.
          </p>
          <Button to="/nos-agences" variant="outline" onDark>
            Voir le plan des agences
          </Button>
        </div>
      </div>
    </section>
  );
}
