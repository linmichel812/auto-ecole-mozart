import type { ReactNode } from 'react';
import { WHY_MOZART } from '../../data/homeContent';
import './WhyMozartSection.css';

const ICONS: Record<string, ReactNode> = {
  instructor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  vehicle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  ),
  success: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
  schedule: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  payment: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
    </svg>
  ),
  support: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
};

export function WhyMozartSection() {
  return (
    <section className="moz-section" aria-labelledby="why-title">
      <div className="moz-container">
        <header className="moz-section-header moz-section-header--center">
          <span className="moz-overline">Nos atouts</span>
          <h2 id="why-title">Pourquoi choisir Mozart ?</h2>
          <p className="moz-lead">
            Une auto-école établie à Yaoundé, reconnue pour son sérieux, sa pédagogie
            et son accompagnement personnalisé jusqu&apos;à l&apos;obtention de votre permis.
          </p>
        </header>
        <div className="why-section__grid">
          {WHY_MOZART.map((item) => (
            <article key={item.id} className="why-section__card">
              <div className="why-section__icon">{ICONS[item.icon]}</div>
              <h3 className="why-section__title">{item.title}</h3>
              <p className="why-section__desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
