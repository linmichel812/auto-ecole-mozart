import { TestimonialCarousel } from '../../design-system';
import { TESTIMONIALS } from '../../data/homeContent';

export function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      className="moz-section moz-section--muted"
      aria-labelledby="testimonials-title"
    >
      <div className="moz-container">
        <header className="moz-section-header moz-section-header--center">
          <span className="moz-overline">Témoignages</span>
          <h2 id="testimonials-title">Ce qu&apos;ils pensent de nous</h2>
          <p className="moz-lead">
            Des centaines d&apos;élèves nous font confiance chaque année à Yaoundé.
            Découvrez leurs expériences.
          </p>
        </header>
        <TestimonialCarousel items={[...TESTIMONIALS]} />
      </div>
    </section>
  );
}
