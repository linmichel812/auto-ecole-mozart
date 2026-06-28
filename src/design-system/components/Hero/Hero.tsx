import { Link } from 'react-router-dom';
import type { CSSProperties, ReactNode } from 'react';
import type { HeroVariant } from '../../tokens';
import { useParallax } from '../../../hooks/useParallax';
import './Hero.css';

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProps {
  variant?: HeroVariant;
  overline?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  badges?: ReactNode;
  actions?: ReactNode;
  breadcrumb?: Array<{ label: string; href?: string }>;
  stats?: HeroStat[];
  visual?: ReactNode;
}

export function Hero({
  variant = 'home',
  overline,
  title,
  subtitle,
  backgroundImage,
  badges,
  actions,
  breadcrumb,
  stats,
  visual,
}: HeroProps) {
  const style = backgroundImage
    ? ({ '--moz-hero-image': `url(${backgroundImage})` } as CSSProperties)
    : undefined;
  const bgRef = useParallax<HTMLDivElement>(0.15);

  return (
    <section className={`moz-hero moz-hero--${variant}`} style={style}>
      <div ref={bgRef} className="moz-hero__bg" aria-hidden="true" />
      {variant === 'home' && (
        <>
          <div className="moz-hero__pattern" aria-hidden="true" />
          <div className="moz-hero__accent" aria-hidden="true" />
        </>
      )}
      <div className="moz-hero__inner moz-container">
        <div className="moz-hero__layout">
          <div className="moz-hero__content">
            {breadcrumb && breadcrumb.length > 0 && (
              <nav className="moz-hero__breadcrumb" aria-label="Fil d'Ariane">
                {breadcrumb.map((item, i) => (
                  <span key={item.label} style={{ display: 'contents' }}>
                    {i > 0 && <span className="moz-hero__breadcrumb-sep">/</span>}
                    {item.href ? (
                      item.href.startsWith('/') ? (
                        <Link to={item.href}>{item.label}</Link>
                      ) : (
                        <a href={item.href}>{item.label}</a>
                      )
                    ) : (
                      <span aria-current="page">{item.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            {overline && <span className="moz-hero__overline">{overline}</span>}
            {badges && <div className="moz-hero__badges">{badges}</div>}
            <h1 className="moz-hero__title">{title}</h1>
            {subtitle && <p className="moz-hero__subtitle">{subtitle}</p>}
            {actions && <div className="moz-hero__actions">{actions}</div>}
            {stats && stats.length > 0 && (
              <div className="moz-hero__stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="moz-hero__stat-value">{stat.value}</div>
                    <div className="moz-hero__stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {visual && variant === 'home' && (
            <div className="moz-hero__visual">
              <div className="moz-hero__visual-card">{visual}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
