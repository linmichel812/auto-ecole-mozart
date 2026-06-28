import { useMemo, useState } from 'react';
import { Button, FAQ } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../data';
import './FAQPage.css';
import './pages.css';

export function FAQPage() {
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(
    () =>
      category === 'all'
        ? [...FAQ_ITEMS]
        : FAQ_ITEMS.filter((item) => item.category === category),
    [category],
  );

  return (
    <>
      <SeoHead
        title="FAQ : Questions fréquentes | Auto-École Mozart"
        description="Réponses à vos questions sur l'inscription, les tarifs, les formations permis et nos agences à Yaoundé."
        path="/faq"
      />
      <PageHero
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir avant de vous inscrire."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'FAQ' },
        ]}
      />

      <section className="pages__content">
        <div className="moz-container">
          <div className="faq-page__filters" role="group" aria-label="Filtrer par catégorie">
            <button
              type="button"
              className={`faq-page__filter ${category === 'all' ? 'faq-page__filter--active' : ''}`}
              onClick={() => setCategory('all')}
            >
              Toutes
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-page__filter ${category === cat.id ? 'faq-page__filter--active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <FAQ items={filtered} searchable />

          <div className="pages__cta-band">
            <h3>Vous n&apos;avez pas trouvé votre réponse ?</h3>
            <p>Contactez-nous par WhatsApp ou remplissez notre formulaire : réponse sous 24h.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href="/contact" size="lg">
                Nous contacter
              </Button>
              <Button href="/inscription" variant="outline" size="lg">
                S&apos;inscrire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
