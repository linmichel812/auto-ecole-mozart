import type { HTMLAttributes, ReactNode } from 'react';
import type { BadgeVariant } from '../../tokens';
import './Badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant | 'accent';
  solid?: boolean;
  dot?: boolean;
  size?: 'sm' | 'lg';
  children: ReactNode;
}

export function Badge({
  variant = 'primary',
  solid = false,
  dot = false,
  size = 'sm',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const classes = [
    'moz-badge',
    `moz-badge--${variant}`,
    solid ? 'moz-badge--solid' : '',
    dot ? 'moz-badge--dot' : '',
    size === 'lg' ? 'moz-badge--lg' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
