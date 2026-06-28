import { Button } from '../../design-system';
import { CONTACT } from '../../data/homeContent';
import './FinalCTASection.css';

export function FinalCTASection() {
  const whatsappUrl = `${CONTACT.whatsappHref}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__pattern" aria-hidden="true" />
      <div className="moz-container">
        <div className="final-cta__inner">
          <h2 id="final-cta-title" className="final-cta__title">
            Prêt à obtenir votre permis ?
          </h2>
          <p className="final-cta__desc">
            Rejoignez les milliers d&apos;élèves qui nous ont fait confiance à Yaoundé.
            Inscription simple, accompagnement personnalisé et facilités de paiement.
          </p>
          <div className="final-cta__actions">
            <Button href="/inscription" size="lg">
              S&apos;inscrire maintenant
            </Button>
            <Button href="/contact?devis=1" size="lg" variant="outline" onDark>
              Demander un devis
            </Button>
            <Button href={whatsappUrl} size="lg" variant="whatsapp">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
