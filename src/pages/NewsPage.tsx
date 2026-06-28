import { Link } from 'react-router-dom';
import { Badge } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { ARTICLES } from '../data';
import { formatDate } from '../shared';
import './NewsPage.css';
import './pages.css';

export function NewsPage() {
  return (
    <>
      <SeoHead
        title="Actualités : Conseils permis & sécurité routière | Mozart"
        description="Guides pratiques, conseils examen et actualités permis de conduire à Yaoundé par l'Auto-École Mozart."
        path="/actualites"
      />
      <PageHero
        title="Actualités & ressources"
        subtitle="Conseils pratiques, guides permis et sécurité routière par nos experts."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Actualités' },
        ]}
      />

      <section className="pages__content">
        <div className="moz-container">
          <div className="news-grid">
            {ARTICLES.map((article) => (
              <article key={article.id} className="news-card">
                <Badge variant="secondary">{article.category}</Badge>
                <time className="news-card__date" dateTime={article.date}>
                  {formatDate(article.date)}
                </time>
                <h2 className="news-card__title">
                  <Link to={`/actualites/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="news-card__excerpt">{article.excerpt}</p>
                <div className="news-card__footer">
                  <span className="moz-caption">{article.readTime} de lecture</span>
                  <Link to={`/actualites/${article.slug}`} className="news-card__link">
                    Lire l&apos;article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
