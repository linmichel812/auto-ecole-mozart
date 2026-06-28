import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ButtonSize, ButtonVariant } from '../../tokens';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onDark?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  to?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onDark = false,
  icon,
  iconPosition = 'left',
  href,
  to,
  target,
  rel,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'moz-btn',
    `moz-btn--${variant}`,
    `moz-btn--${size}`,
    fullWidth ? 'moz-btn--full' : '',
    onDark && variant === 'outline' ? 'moz-btn--on-dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="moz-btn__icon">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="moz-btn__icon">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
