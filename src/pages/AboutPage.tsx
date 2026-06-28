import { Badge, Button } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import { ABOUT_CONTENT, ASSETS, STATS, TEAM, VALUES } from '../data';
import './AboutPage.css';
import './pages.css';

export function AboutPage() {
  return (
    <>
      <SeoHead
        title="À propos : Auto-École Mozart | Le génie du volant"
        description="Découvrez l'histoire, la mission et l'équipe de l'Auto-École Mozart, référence à Yaoundé depuis plus de 15 ans."
        path="/a-propos"
      />
      <PageHero
        title="À propos de Mozart"
        subtitle="Plus de 15 ans d'excellence à Yaoundé : former des conducteurs responsables et confiants."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'À propos' },
        ]}
      />

      <section className="pages__content about-history">
        <div className="moz-container pages__grid-2">
          <div className="pages__prose">
            <span className="moz-overline">Notre histoire</span>
            <h2>{ABOUT_CONTENT.history.title}</h2>
            {ABOUT_CONTENT.history.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <figure className="about-history__image">
            <img
              src={ASSETS.aboutImage}
              alt="Auto-École Mozart, formation à la conduite à Yaoundé"
              width={600}
              height={400}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="pages__content moz-section--muted about-mvv">
        <div className="moz-container">
          <div className="about-mvv__grid">
            <article className="about-mvv__card">
              <span className="moz-overline">Mission</span>
              <h3>{ABOUT_CONTENT.mission.title}</h3>
              <p>{ABOUT_CONTENT.mission.text}</p>
            </article>
            <article className="about-mvv__card">
              <span className="moz-overline">Vision</span>
              <h3>{ABOUT_CONTENT.vision.title}</h3>
              <p>{ABOUT_CONTENT.vision.text}</p>
            </article>
          </div>
          <div className="about-stats">
            {STATS.map((s) => (
              <div key={s.label} className="about-stats__item">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pages__content about-values">
        <div className="moz-container">
          <header className="moz-section-header moz-section-header--center">
            <span className="moz-overline">Ce qui nous guide</span>
            <h2>Nos valeurs</h2>
          </header>
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <article key={v.id} className="about-values__card">
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pages__content moz-section--muted about-team">
        <div className="moz-container">
          <header className="moz-section-header moz-section-header--center">
            <span className="moz-overline">L&apos;équipe Mozart</span>
            <h2>Des professionnels passionnés</h2>
            <p className="moz-lead">
              Chaque membre de notre équipe partage la même exigence : votre réussite et votre sécurité.
            </p>
          </header>
          <div className="about-team__grid">
            {TEAM.map((member) => (
              <article key={member.id} className="about-team__card">
                <div className="about-team__photo">
                  <img src={member.photo} alt={member.name} width={320} height={320} loading="lazy" />
                </div>
                <div className="about-team__body">
                  <h3>{member.name}</h3>
                  <Badge variant="primary">{member.role}</Badge>
                  <p className="about-team__specialty">{member.specialty}</p>
                  <p className="about-team__exp">{member.experience}</p>
                  <p className="about-team__bio">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pages__content">
        <div className="moz-container">
          <div className="pages__cta-band">
            <h3>Prêt à nous rejoindre ?</h3>
            <p>Inscrivez-vous en ligne ou visitez l&apos;une de nos 6 agences à Yaoundé.</p>
            <Button to="/inscription" size="lg">
              S&apos;inscrire maintenant
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
