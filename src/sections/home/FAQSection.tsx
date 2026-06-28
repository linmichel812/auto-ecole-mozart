import { FAQ } from '../../design-system';
import { FAQ_ITEMS } from '../../data/homeContent';

export function FAQSection() {
  return (
    <section id="faq" className="moz-section" aria-labelledby="faq-title">
      <div className="moz-container">
        <header className="moz-section-header">
          <span className="moz-overline">Questions fréquentes</span>
          <h2 id="faq-title">FAQ</h2>
          <p className="moz-lead">
            Toutes les réponses aux questions les plus posées sur nos formations,
            tarifs et démarches d&apos;inscription.
          </p>
        </header>
        <FAQ items={[...FAQ_ITEMS]} searchable defaultOpen="inscription" />
      </div>
    </section>
  );
}
