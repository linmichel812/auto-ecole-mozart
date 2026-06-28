import type { ReactNode } from 'react';
import { Hero } from '../../design-system';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  actions?: ReactNode;
}

export function PageHero({ title, subtitle, breadcrumb, actions }: PageHeroProps) {
  return (
    <Hero
      variant="page"
      title={title}
      subtitle={subtitle}
      breadcrumb={breadcrumb}
      actions={actions}
      backgroundImage="https://autoecolemozart.cm/wp-content/uploads/2025/09/auto-ecole-mozart7.jpg"
    />
  );
}
