import { Badge, Button, Card } from '../../design-system';
import { FORMATIONS } from '../../data';
import './FormationsSection.css';

export function FormationsSection() {
  return (
    <section
      id="formations"
      className="moz-section moz-section--muted"
      aria-labelledby="formations-title"
    >
      <div className="moz-container">
        <header className="moz-section-header moz-section-header--center">
          <span className="moz-overline">Nos offres</span>
          <h2 id="formations-title">Nos formations au permis de conduire</h2>
          <p className="moz-lead">
            Toutes les catégories de permis pour répondre à vos besoins : voiture, moto,
            transport professionnel, conversion et permis international.
          </p>
        </header>

        <div className="formations-section__grid formations-section__grid--7">
          {FORMATIONS.map((formation) => (
            <a
              key={formation.id}
              href={formation.href}
              className="formations-section__card-link"
            >
              <Card
                variant={formation.featured ? 'featured' : 'elevated'}
                interactive
                badge={
                  formation.featured ? (
                    <Badge variant="primary" solid>
                      Populaire
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{formation.category}</Badge>
                  )
                }
                title={formation.title}
                subtitle={formation.category}
                meta={[
                  { label: 'Durée', value: formation.duration },
                  { label: 'Tarif', value: formation.price },
                ]}
              >
                {formation.description}
              </Card>
            </a>
          ))}
        </div>

        <div className="formations-section__cta">
          <Button href="/formations" variant="outline" size="lg">
            Voir toutes nos formations
          </Button>
        </div>
      </div>
    </section>
  );
}
