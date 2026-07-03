import type { ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  FAQ,
  FormGrid,
  Hero,
  Input,
  Select,
  Table,
  TestimonialCarousel,
  Textarea,
  colors,
} from '../design-system';
import './DesignSystemShowcase.css';

const NAV = [
  { href: '#palette', label: 'Palette' },
  { href: '#typography', label: 'Typographie' },
  { href: '#spacing', label: 'Espacements' },
  { href: '#radius', label: 'Radius' },
  { href: '#shadows', label: 'Ombres' },
  { href: '#buttons', label: 'Boutons' },
  { href: '#cards', label: 'Cartes' },
  { href: '#forms', label: 'Formulaires' },
  { href: '#badges', label: 'Badges' },
  { href: '#tables', label: 'Tables' },
  { href: '#faq', label: 'FAQ' },
  { href: '#testimonials', label: 'Témoignages' },
  { href: '#hero', label: 'Hero' },
  { href: '#responsive', label: 'Responsive' },
];

const FAQ_ITEMS = [
  {
    id: '1',
    question: 'Quelles sont les conditions d\'inscription ?',
    answer:
      'Avoir au moins 18 ans, une pièce d\'identité valide et remplir le formulaire d\'inscription en ligne ou en agence.',
  },
  {
    id: '2',
    question: 'Proposez-vous un paiement échelonné ?',
    answer:
      'Oui, nous offrons des facilités de paiement adaptées à votre budget. Contactez-nous pour connaître les modalités.',
  },
  {
    id: '3',
    question: 'Combien de temps dure la formation Permis B ?',
    answer:
      'En moyenne 1 à 2 mois, selon votre disponibilité et votre rythme d\'apprentissage (3 cours théoriques + 3 pratiques par semaine).',
  },
];

const TESTIMONIALS = [
  {
    id: '1',
    text: 'Grâce à l\'Auto-École Mozart, j\'ai réussi mon permis du premier coup !',
    name: 'Mireille Kouam',
    meta: 'Permis B · Bastos, Yaoundé',
    rating: 5,
    initials: 'MK',
  },
  {
    id: '2',
    text: 'Les moniteurs sont patients et très professionnels. J\'ai pris confiance au volant.',
    name: 'Alain Ndongo',
    meta: 'Permis B · Ngousso',
    rating: 5,
    initials: 'AN',
  },
  {
    id: '3',
    text: 'Formation complète et véhicules impeccables. Je recommande vivement Mozart.',
    name: 'Brice Nguema',
    meta: 'Permis A · Odza',
    rating: 5,
    initials: 'BN',
  },
];

const PRICING_DATA = [
  { formation: 'Permis B', duree: '1–2 mois', prix: '50 000 FCFA', echelonnement: 'Oui' },
  { formation: 'Permis A', duree: '3–6 sem.', prix: 'Sur devis', echelonnement: 'Oui' },
  { formation: 'Permis C/D/E', duree: 'Variable', prix: 'Sur devis', echelonnement: 'Oui' },
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="moz-ds__swatch">
      <div className="moz-ds__swatch-color" style={{ background: hex }} />
      <div className="moz-ds__swatch-info">
        <div className="moz-ds__swatch-name">{name}</div>
        <div className="moz-ds__swatch-hex">{hex}</div>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="moz-ds__section">
      <div className="moz-container">
        <h2 className="moz-ds__section-title">{title}</h2>
        <p className="moz-ds__section-desc">{description}</p>
        {children}
      </div>
    </section>
  );
}

export function DesignSystemShowcase() {
  return (
    <div className="moz-ds">
      <header className="moz-ds__header">
        <div className="moz-container moz-ds__header-inner">
          <div className="moz-ds__logo">
            Auto-École <span>Mozart</span>
          </div>
          <nav className="moz-ds__nav" aria-label="Navigation Design System">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <Badge variant="primary" solid>
            Design System v1.0
          </Badge>
        </div>
      </header>

      <div className="moz-ds__intro">
        <div className="moz-container">
          <p className="moz-overline">Le génie du volant</p>
          <h1>Design System Mozart</h1>
          <p className="moz-lead">
            Système de design complet pour la refonte premium de l&apos;Auto-École Mozart.
            Identité conservée, utilisation modernisée : Poppins + Inter, palette rouge
            institutionnelle et navy #021E40.
          </p>
          <div className="moz-ds__intro-meta">
            <Badge variant="primary">Primary #E62100</Badge>
            <Badge variant="secondary">Secondary #021E40</Badge>
            <Badge variant="accent">Accent #C9A227</Badge>
            <Badge variant="neutral">Mobile-first</Badge>
          </div>
        </div>
      </div>

      {/* 1. Palette */}
      <Section
        id="palette"
        title="1. Palette de couleurs"
        description="Basée sur les couleurs existantes du site (rouge #E62100, navy #021E40, gris #696868), enrichie d'échelles complètes pour un usage premium et cohérent."
      >
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Primary : Rouge Mozart</h3>
          <div className="moz-ds__swatch-grid">
            {Object.entries(colors.primary).map(([k, v]) => (
              <Swatch key={k} name={`primary-${k}`} hex={v} />
            ))}
          </div>
        </div>
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Secondary : Navy institutionnel</h3>
          <div className="moz-ds__swatch-grid">
            {Object.entries(colors.secondary).map(([k, v]) => (
              <Swatch key={k} name={`secondary-${k}`} hex={v} />
            ))}
          </div>
        </div>
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Accent · Success · Warning · Error · Neutral</h3>
          <div className="moz-ds__swatch-grid">
            <Swatch name="accent-500" hex={colors.accent[500]} />
            <Swatch name="success-500" hex={colors.success[500]} />
            <Swatch name="warning-500" hex={colors.warning[500]} />
            <Swatch name="error-500" hex={colors.error[500]} />
            {(['500', '800', '950'] as const).map((k) => (
              <Swatch key={k} name={`neutral-${k}`} hex={colors.neutral[k === '950' ? 950 : k === '800' ? 800 : 500]} />
            ))}
          </div>
        </div>
      </Section>

      {/* 2. Typographie */}
      <Section
        id="typography"
        title="2. Typographie"
        description="Poppins pour les titres (impact, modernité éducation). Inter pour le corps (lisibilité mobile exceptionnelle)."
      >
        <div className="moz-ds__type-sample">
          <div className="moz-ds__type-row">
            <h1>Heading 1 : Le génie du volant</h1>
            <span className="moz-ds__type-meta">Poppins 800 · clamp 2–3rem</span>
          </div>
          <div className="moz-ds__type-row">
            <h2>Heading 2 : Nos formations</h2>
            <span className="moz-ds__type-meta">Poppins 700 · clamp 1.6–2.25rem</span>
          </div>
          <div className="moz-ds__type-row">
            <h3>Heading 3 : Permis B</h3>
            <span className="moz-ds__type-meta">Poppins 600 · clamp 1.4–1.875rem</span>
          </div>
          <div className="moz-ds__type-row">
            <p className="moz-lead">Lead : Apprenez à rouler, vivez pleinement à Yaoundé.</p>
            <span className="moz-ds__type-meta">Inter 400 · 1.125–1.25rem</span>
          </div>
          <div className="moz-ds__type-row">
            <p>Corps : Créée pour former des conducteurs responsables et sûrs, l&apos;Auto-École Mozart est une référence à Yaoundé.</p>
            <span className="moz-ds__type-meta">Inter 400 · 1rem</span>
          </div>
          <div className="moz-ds__type-row">
            <span className="moz-overline">Overline : Permis de conduire</span>
            <span className="moz-ds__type-meta">Poppins 600 · 0.75rem caps</span>
          </div>
          <div className="moz-ds__type-row">
            <span className="moz-caption">Caption : À partir de 50 000 FCFA</span>
            <span className="moz-ds__type-meta">Inter 400 · 0.875rem</span>
          </div>
        </div>
      </Section>

      {/* 3. Espacements */}
      <Section
        id="spacing"
        title="3. Espacements"
        description="Échelle basée sur 4px (0.25rem). Cohérence verticale entre sections : 4rem mobile → 6rem desktop."
      >
        {[
          { token: 'space-2', value: '0.5rem', px: 8 },
          { token: 'space-4', value: '1rem', px: 16 },
          { token: 'space-6', value: '1.5rem', px: 24 },
          { token: 'space-8', value: '2rem', px: 32 },
          { token: 'space-12', value: '3rem', px: 48 },
          { token: 'space-16', value: '4rem', px: 64 },
          { token: 'space-24', value: '6rem', px: 96 },
        ].map((s) => (
          <div key={s.token} className="moz-ds__spacing-row">
            <span className="moz-ds__spacing-label">{s.token}</span>
            <div className="moz-ds__spacing-bar" style={{ width: s.px * 2 }} />
            <span className="moz-ds__spacing-label">{s.value} ({s.px}px)</span>
          </div>
        ))}
      </Section>

      {/* 4. Border Radius */}
      <Section
        id="radius"
        title="4. Border Radius"
        description="Coins arrondis modernes : md pour inputs/boutons, lg/xl pour cartes, full pour badges."
      >
        <div className="moz-ds__radius-grid">
          {[
            { name: 'sm · 6px', var: 'var(--moz-radius-sm)' },
            { name: 'md · 10px', var: 'var(--moz-radius-md)' },
            { name: 'lg · 16px', var: 'var(--moz-radius-lg)' },
            { name: 'xl · 24px', var: 'var(--moz-radius-xl)' },
            { name: '2xl · 32px', var: 'var(--moz-radius-2xl)' },
            { name: 'full', var: 'var(--moz-radius-full)' },
          ].map((r) => (
            <div key={r.name} className="moz-ds__radius-item">
              <div className="moz-ds__radius-box" style={{ borderRadius: r.var }} />
              <span className="moz-caption">{r.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Shadows */}
      <Section
        id="shadows"
        title="5. Ombres"
        description="Ombres teintées navy pour un rendu institutionnel. shadow-primary pour les CTA, shadow-card pour les cartes."
      >
        <div className="moz-ds__shadow-grid">
          {[
            { name: 'xs', shadow: 'var(--moz-shadow-xs)' },
            { name: 'sm', shadow: 'var(--moz-shadow-sm)' },
            { name: 'md', shadow: 'var(--moz-shadow-md)' },
            { name: 'lg', shadow: 'var(--moz-shadow-lg)' },
            { name: 'card', shadow: 'var(--moz-shadow-card)' },
            { name: 'primary', shadow: 'var(--moz-shadow-primary)' },
          ].map((s) => (
            <div key={s.name} className="moz-ds__shadow-box" style={{ boxShadow: s.shadow }}>
              {s.name}
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Boutons */}
      <Section
        id="buttons"
        title="6. Boutons"
        description="5 variantes × 3 tailles. Minimum 48px de hauteur sur mobile (touch target). Primary = action principale conversion."
      >
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Variantes</h3>
          <div className="moz-ds__row">
            <Button variant="primary">S&apos;inscrire</Button>
            <Button variant="secondary">En savoir plus</Button>
            <Button variant="outline">Voir les tarifs</Button>
            <Button variant="ghost">Annuler</Button>
            <Button variant="whatsapp">WhatsApp</Button>
          </div>
        </div>
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Tailles</h3>
          <div className="moz-ds__row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Sur fond sombre (Hero)</h3>
          <div className="moz-ds__row" style={{ background: '#021E40', padding: '1.5rem', borderRadius: '1rem' }}>
            <Button variant="primary">Choisir ma formation</Button>
            <Button variant="outline" onDark>
              Nous contacter
            </Button>
          </div>
        </div>
      </Section>

      {/* 7. Cartes */}
      <Section
        id="cards"
        title="7. Cartes"
        description="4 variantes pour formations, tarifs et contenus. Interactive = hover lift pour les cards cliquables."
      >
        <div className="moz-grid moz-grid--4">
          <Card
            variant="default"
            title="Permis B"
            subtitle="Voiture"
            meta={[
              { label: 'Durée', value: '1–2 mois' },
              { label: 'Tarif', value: '50 000 FCFA' },
            ]}
            footer={<Button size="sm">En savoir plus</Button>}
          >
            Programme complet : code, conduite, examens blancs.
          </Card>
          <Card
            variant="elevated"
            interactive
            title="Permis A"
            subtitle="Moto"
            footer={<Button size="sm" variant="outline">Découvrir</Button>}
          >
            Maîtrise des deux-roues en milieu urbain camerounais.
          </Card>
          <Card
            variant="outlined"
            title="Permis Pro"
            subtitle="C, D, E"
          >
            Formation orientée emploi et carrière professionnelle.
          </Card>
          <Card
            variant="featured"
            badge={<Badge variant="primary" solid>Populaire</Badge>}
            title="Permis B"
            subtitle="Le plus demandé"
            footer={<Button size="sm">S&apos;inscrire</Button>}
          >
            Idéal pour jeunes adultes, étudiants et professionnels.
          </Card>
        </div>
      </Section>

      {/* 8. Formulaires */}
      <Section
        id="forms"
        title="8. Formulaires"
        description="Inputs 48px min, font-size 16px sur mobile (évite le zoom iOS). États error/success, labels et hints."
      >
        <FormGrid columns={2}>
          <Input label="Nom complet" placeholder="Ex. Jean Kouam" required />
          <Input label="Téléphone" type="tel" placeholder="+237 6 XX XX XX XX" required />
          <Select
            label="Formation souhaitée"
            options={[
              { value: '', label: 'Choisir…' },
              { value: 'b', label: 'Permis B' },
              { value: 'a', label: 'Permis A' },
              { value: 'pro', label: 'Permis Professionnel' },
            ]}
          />
          <Input label="Email" type="email" placeholder="contact@exemple.cm" hint="Optionnel" />
        </FormGrid>
        <div style={{ marginTop: '1.5rem' }}>
          <Textarea label="Message" placeholder="Votre question…" />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Input label="Champ en erreur" error="Ce champ est obligatoire" defaultValue="" />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Checkbox
            label="J'accepte que mes données soient traitées conformément à la politique de confidentialité."
            required
          />
        </div>
      </Section>

      {/* 9. Badges */}
      <Section
        id="badges"
        title="9. Badges"
        description="Labels compacts pour statuts, catégories et trust signals."
      >
        <div className="moz-ds__row">
          <Badge variant="primary">Permis B</Badge>
          <Badge variant="secondary">Yaoundé</Badge>
          <Badge variant="success" dot>Disponible</Badge>
          <Badge variant="warning">Places limitées</Badge>
          <Badge variant="error">Complet</Badge>
          <Badge variant="accent">Premium</Badge>
          <Badge variant="neutral">Info</Badge>
        </div>
        <div className="moz-ds__row" style={{ marginTop: '1rem' }}>
          <Badge variant="primary" solid>
            S&apos;inscrire
          </Badge>
          <Badge variant="success" solid size="lg">
            Taux de réussite élevé
          </Badge>
        </div>
      </Section>

      {/* 10. Tables */}
      <Section
        id="tables"
        title="10. Tables"
        description="Header navy institutionnel. Sur mobile (< 768px), transformation automatique en cards empilées."
      >
        <Table
          columns={[
            { key: 'formation', header: 'Formation' },
            { key: 'duree', header: 'Durée' },
            { key: 'prix', header: 'Tarif dès', highlight: true },
            { key: 'echelonnement', header: 'Échelonnement' },
          ]}
          data={PRICING_DATA}
        />
      </Section>

      {/* 11. FAQ */}
      <Section
        id="faq"
        title="11. FAQ"
        description="Accordéon accessible (ARIA), un seul panneau ouvert recommandé. Recherche intégrée optionnelle."
      >
        <FAQ items={FAQ_ITEMS} searchable defaultOpen="1" />
      </Section>

      {/* 12. Témoignages */}
      <Section
        id="testimonials"
        title="12. Témoignages"
        description="Carousel scroll-snap : 1 card mobile, 2 tablette, 3 desktop. Étoiles accent or, citations italiques."
      >
        <TestimonialCarousel items={TESTIMONIALS} />
      </Section>

      {/* 13. Hero */}
      <Section
        id="hero"
        title="13. Sections Hero"
        description="3 variantes : home (plein écran conversion), page (intérieur), formation (détail offre). Contact retiré de la Hero : CTAs actionnables uniquement."
      >
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Hero Home</h3>
          <Hero
            variant="home"
            overline="Votre permis, c'est ici !"
            title="Apprenez à rouler, vivez pleinement !"
            subtitle="Auto-École Mozart : référence à Yaoundé. Moniteurs pédagogues, véhicules modernes, facilités de paiement."
            actions={
              <>
                <Button size="lg">Choisir ma formation</Button>
                <Button size="lg" variant="outline" onDark>
                  Comment ça marche
                </Button>
              </>
            }
            stats={[
              { value: '15+', label: 'Années d\'expérience' },
              { value: '2 000+', label: 'Élèves formés' },
              { value: '95%', label: 'Taux de réussite' },
            ]}
            visual={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #021E40, #E62100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '1.25rem',
                }}
              >
                Photo moniteur / élève
              </div>
            }
          />
        </div>
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Hero Page intérieure</h3>
          <Hero
            variant="page"
            title="Nos formations"
            subtitle="Toutes les catégories de permis pour vos besoins à Yaoundé."
            breadcrumb={[
              { label: 'Accueil', href: '#' },
              { label: 'Formations' },
            ]}
          />
        </div>
        <div className="moz-ds__subsection">
          <h3 className="moz-ds__subsection-title">Hero Formation</h3>
          <Hero
            variant="formation"
            badges={
              <>
                <Badge variant="primary" solid>
                  Permis B
                </Badge>
                <Badge variant="accent">Populaire</Badge>
              </>
            }
            title="Permis B : Conduite voiture"
            subtitle="À partir de 50 000 FCFA · 1 à 2 mois · Paiement échelonné"
            actions={
              <>
                <Button size="lg">S&apos;inscrire au Permis B</Button>
                <Button size="lg" variant="whatsapp">
                  WhatsApp
                </Button>
              </>
            }
            breadcrumb={[
              { label: 'Accueil', href: '#' },
              { label: 'Formations', href: '#' },
              { label: 'Permis B' },
            ]}
          />
        </div>
      </Section>

      {/* Responsive */}
      <Section
        id="responsive"
        title="14. Mode responsive"
        description="Mobile-first. Breakpoints : 320px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide)."
      >
        <div className="moz-ds__breakpoint-grid">
          <Card variant="elevated" title="Mobile" subtitle="320 – 767px">
            Menu hamburger · Bottom bar CTA sticky · Hero stacked · Tables → cards ·
            Formulaire pleine largeur · 1 colonne
          </Card>
          <Card variant="elevated" title="Tablet" subtitle="768 – 1023px">
            Nav visible · Grilles 2 colonnes · Hero compact · Témoignages 2 cards ·
            Container padding 24px
          </Card>
          <Card variant="elevated" title="Desktop" subtitle="1024px+">
            Nav complète + dropdowns · Grilles 3–4 colonnes · Hero split layout ·
            Témoignages 3 cards · Container max 1200px
          </Card>
        </div>
      </Section>

      <footer className="moz-section moz-section--muted">
        <div className="moz-container" style={{ textAlign: 'center' }}>
          <p className="moz-caption">
            © 2026 Auto-École Mozart : Design System v1.0 · Poppins + Inter · React.js
          </p>
        </div>
      </footer>
    </div>
  );
}
