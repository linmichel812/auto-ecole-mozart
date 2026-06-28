import { STATS } from '../../data/homeContent';
import { useAnimatedCounter, useInView } from '../../hooks/useInView';
import './StatsSection.css';

function formatStatValue(
  raw: string,
  numericValue: number,
  animated: number,
  active: boolean,
): string {
  if (!active) return raw;

  if (raw.includes('+')) {
    return `${animated.toLocaleString('fr-FR')}+`;
  }
  if (raw.includes('%')) {
    return `${animated} %`;
  }
  return String(animated || numericValue);
}

export function StatsSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section className="stats-section" aria-label="Chiffres clés" ref={ref}>
      <div className="moz-container">
        <div className="stats-section__grid">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  active,
}: {
  stat: (typeof STATS)[number];
  active: boolean;
}) {
  const count = useAnimatedCounter(stat.numericValue, 1800, active);

  return (
    <div className="stats-section__item">
      <div className="stats-section__value" aria-live="polite">
        {formatStatValue(stat.value, stat.numericValue, count, active)}
      </div>
      <div className="stats-section__label">{stat.label}</div>
    </div>
  );
}
