import { useEffect, useRef } from 'react';

/**
 * Effet parallaxe performant et accessible.
 *
 * Attache la ref retournée à un élément : sa position verticale est décalée
 * en fonction du défilement via la variable CSS `--parallax-y`, uniquement
 * lorsqu'il est visible (IntersectionObserver) et hors `prefers-reduced-motion`.
 *
 * @param speed Intensité du décalage (0 = fixe, 0.3 = marqué). Défaut 0.18.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.18) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    let rafId = 0;
    let isVisible = false;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (viewportCenter - elementCenter) * speed;
      el.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
    };

    const requestUpdate = () => {
      if (!isVisible || rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) requestUpdate();
      },
      { threshold: 0 },
    );

    observer.observe(el);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
