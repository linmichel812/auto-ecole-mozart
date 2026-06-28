import type { HTMLAttributes, ReactNode } from 'react';
import type { CardVariant } from '../../tokens';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
  media?: ReactNode;
  badge?: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  meta?: Array<{ label: string; value: string }>;
}

export function Card({
  variant = 'default',
  interactive = false,
  media,
  badge,
  title,
  subtitle,
  footer,
  meta,
  children,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    'moz-card',
    `moz-card--${variant}`,
    interactive ? 'moz-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {badge && <div className="moz-card__badge">{badge}</div>}
      {media && <div className="moz-card__media">{media}</div>}
      <div className="moz-card__body">
        {(title || subtitle) && (
          <div className="moz-card__header">
            {title && <h3 className="moz-card__title">{title}</h3>}
            {subtitle && <p className="moz-card__subtitle">{subtitle}</p>}
          </div>
        )}
        {children && <div className="moz-card__content">{children}</div>}
        {meta && meta.length > 0 && (
          <div className="moz-card__meta">
            {meta.map((item) => (
              <div key={item.label} className="moz-card__meta-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
      {footer && <div className="moz-card__footer">{footer}</div>}
    </div>
  );
}
