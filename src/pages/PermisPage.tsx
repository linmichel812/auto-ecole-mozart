import { Badge, Button } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { PERMIS_DETAILS } from '../data';
import './PermisPage.css';
import './pages.css';

export function PermisPage() {
  return (
    <>
      <SeoHead
        title="Nos permis : Formations permis de conduire | Auto-École Mozart"
        description="Comparez nos formations : Permis B, A, C, D, E, conversion et international. Prix, durée, conditions et documents à Yaoundé."
        path="/nos-permis"
      />
      <PageHero
        title="Nos permis"
        subtitle="Toutes les catégories de permis : comparez prix, durée, conditions et avantages."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Nos permis' },
        ]}
        actions={
          <Button href="/inscription" size="lg">
            S&apos;inscrire maintenant
          </Button>
        }
      />

      <section className="pages__content">
        <div className="moz-container">
          <header className="moz-section-header moz-section-header--center">
            <span className="moz-overline">Comparatif</span>
            <h2>Grille comparative détaillée</h2>
            <p className="moz-lead">
              Trouvez la formation adaptée à votre projet. Paiement échelonné disponible.
            </p>
          </header>

          <div className="permis-compare" role="region" aria-label="Comparatif des formations">
            <table className="permis-compare__table">
              <thead>
                <tr>
                  <th>Formation</th>
                  <th>Prix</th>
                  <th>Durée</th>
                  <th>Conditions</th>
                  <th>Documents requis</th>
                  <th>Avantages</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {PERMIS_DETAILS.map((p) => (
                  <tr key={p.id} id={p.id}>
                    <td>
                      <span className="permis-compare__name">{p.title}</span>
                      <span className="permis-compare__cat">{p.category}</span>
                    </td>
                    <td>
                      <span className="permis-compare__price">{p.price}</span>
                      {p.priceNote && (
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{p.priceNote}</div>
                      )}
                    </td>
                    <td>{p.duration}</td>
                    <td>
                      <ul className="permis-compare__list">
                        {p.conditions.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="permis-compare__list">
                        {p.documents.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="permis-compare__list">
                        {p.advantages.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <Button href={`/inscription?permis=${p.id}`} size="sm">
                        S&apos;inscrire
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="permis-cards">
            {PERMIS_DETAILS.map((p) => (
              <article
                key={p.id}
                id={p.id}
                className={`permis-card-detail ${p.featured ? 'permis-card-detail--featured' : ''}`}
              >
                <div className="permis-card-detail__header">
                  <div>
                    <h3>{p.title}</h3>
                    <Badge variant={p.featured ? 'primary' : 'secondary'}>{p.category}</Badge>
                  </div>
                  {p.featured && <Badge variant="accent" solid>Populaire</Badge>}
                </div>
                <p style={{ color: 'var(--moz-text-muted)', marginBottom: '1rem' }}>{p.description}</p>
                <dl className="permis-card-detail__meta">
                  <div>
                    <dt>Prix</dt>
                    <dd>{p.price}</dd>
                  </div>
                  <div>
                    <dt>Durée</dt>
                    <dd>{p.duration}</dd>
                  </div>
                </dl>
                <div className="permis-card-detail__section">
                  <h4>Conditions</h4>
                  <ul>
                    {p.conditions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="permis-card-detail__section">
                  <h4>Documents requis</h4>
                  <ul>
                    {p.documents.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="permis-card-detail__section">
                  <h4>Avantages Mozart</h4>
                  <ul>
                    {p.advantages.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <Button href={`/inscription?permis=${p.id}`} fullWidth>
                  S&apos;inscrire au {p.title}
                </Button>
              </article>
            ))}
          </div>

          <div className="pages__cta-band">
            <h3>Besoin d&apos;un devis personnalisé ?</h3>
            <p>Nos conseillers vous répondent sous 24h : permis pro, conversion et international.</p>
            <Button href="/contact?devis=1" variant="outline" size="lg">
              Demander un devis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
