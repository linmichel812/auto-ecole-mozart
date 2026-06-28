import { useRef, useState } from 'react';
import './Testimonial.css';

export interface TestimonialItem {
  id: string;
  text: string;
  name: string;
  meta?: string;
  rating?: number;
  avatar?: string;
  initials?: string;
}

export interface TestimonialCarouselProps {
  items: TestimonialItem[];
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="moz-testimonial__stars" aria-label={`${rating} sur 5 étoiles`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <div className="moz-testimonial">
      <div
        ref={trackRef}
        className="moz-testimonial__track"
        onScroll={handleScroll}
        role="list"
      >
        {items.map((item) => (
          <article key={item.id} className="moz-testimonial__card" role="listitem">
            <svg className="moz-testimonial__quote-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.45l1.135 1.668C6.832 7.556 5.5 10.025 5.5 12.011c0 1.2.45 2.2 1.329 3.021L4.583 17.321zm9 0C12.553 16.227 12 15 12 13.011c0-3.5 2.457-6.637 6.03-8.45l1.135 1.668C15.832 7.556 14.5 10.025 14.5 12.011c0 1.2.45 2.2 1.329 3.021l-2.246 2.289z" />
            </svg>
            {item.rating !== undefined && <StarRating rating={item.rating} />}
            <blockquote className="moz-testimonial__text">&ldquo;{item.text}&rdquo;</blockquote>
            <footer className="moz-testimonial__author">
              <div className="moz-testimonial__avatar">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} />
                ) : (
                  item.initials ?? item.name.charAt(0)
                )}
              </div>
              <div className="moz-testimonial__info">
                <cite className="moz-testimonial__name">{item.name}</cite>
                {item.meta && <span className="moz-testimonial__meta">{item.meta}</span>}
              </div>
            </footer>
          </article>
        ))}
      </div>
      <div className="moz-testimonial__nav">
        <button
          type="button"
          className="moz-testimonial__arrow"
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          aria-label="Témoignage précédent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`moz-testimonial__dot ${i === activeIndex ? 'moz-testimonial__dot--active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Aller au témoignage ${i + 1}`}
          />
        ))}
        <button
          type="button"
          className="moz-testimonial__arrow"
          onClick={() => scrollTo(Math.min(items.length - 1, activeIndex + 1))}
          aria-label="Témoignage suivant"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
