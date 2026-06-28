import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { getLegalDocument, LEGAL_DOCUMENTS } from '../data/legal';
import { formatDate } from '../shared';
import './LegalPage.css';

function NotFoundLegal() {
  return (
    <Layout>
      <div className="moz-container legal-page" style={{ paddingBlock: '4rem', textAlign: 'center' }}>
        <h1>Document introuvable</h1>
        <Link to="/legal/mentions-legales">Retour aux mentions légales</Link>
      </div>
    </Layout>
  );
}

export function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getLegalDocument(slug) : undefined;

  if (!doc) return <NotFoundLegal />;

  const otherDocs = LEGAL_DOCUMENTS.filter((d) => d.slug !== doc.slug);

  return (
    <Layout>
      <SeoHead
        title={`${doc.title} | Auto-École Mozart`}
        description={doc.metaDescription}
        path={`/legal/${doc.slug}`}
        noIndex={false}
      />
      <PageHero
        title={doc.title}
        subtitle={`Dernière mise à jour : ${formatDate(doc.lastUpdated)}`}
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: doc.title },
        ]}
      />
      <article className="moz-container legal-page">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="legal-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <nav className="legal-nav" aria-label="Autres documents légaux">
          <h2>Documents associés</h2>
          <ul>
            {otherDocs.map((d) => (
              <li key={d.slug}>
                <Link to={`/legal/${d.slug}`}>{d.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </Layout>
  );
}
