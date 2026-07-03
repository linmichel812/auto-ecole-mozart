import type { ReactNode } from 'react';
import { Hero } from '../../design-system';
import { ASSETS } from '../../data';

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
      backgroundImage={ASSETS.heroBg}
    />
  );
}
