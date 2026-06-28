import { Link, useParams } from 'react-router-dom';
import { Badge, Button } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { ARTICLES } from '../data';
import { formatDate } from '../shared';
import './NewsPage.css';
import './pages.css';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="moz-container pages__content" style={{ textAlign: 'center' }}>
        <h1>Article introuvable</h1>
        <Button href="/actualites">Retour aux actualités</Button>
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`${article.title} | Auto-École Mozart`}
        description={article.excerpt}
        path={`/actualites/${article.slug}`}
      />
      <PageHero
        title={article.title}
        subtitle={article.excerpt}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Actualités', href: '/actualites' },
          { label: article.category },
        ]}
      />

      <section className="pages__content">
        <div className="moz-container">
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Badge variant="secondary">{article.category}</Badge>
            <time dateTime={article.date} className="moz-caption">
              {formatDate(article.date)}
            </time>
            <span className="moz-caption">{article.readTime} de lecture</span>
          </div>
          <article className="article-content">
            {article.content.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }} />
            ))}
          </article>
          <div className="pages__cta-band" style={{ marginTop: '3rem' }}>
            <h3>Prêt à vous inscrire ?</h3>
            <p>Rejoignez l&apos;Auto-École Mozart et obtenez votre permis à Yaoundé.</p>
            <Button href="/inscription" size="lg">
              S&apos;inscrire maintenant
            </Button>
          </div>
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/actualites">← Retour aux actualités</Link>
          </p>
        </div>
      </section>
    </>
  );
}
