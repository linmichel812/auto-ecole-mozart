import { useState } from 'react';
import { Input } from '../Form/Form';
import './FAQ.css';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  searchable?: boolean;
  defaultOpen?: string;
}

export function FAQ({ items, searchable = false, defaultOpen }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);
  const [search, setSearch] = useState('');

  const filtered = searchable
    ? items.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="moz-faq">
      {searchable && (
        <div className="moz-faq__search">
          <Input
            placeholder="Rechercher une question…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Rechercher dans la FAQ"
          />
        </div>
      )}
      {filtered.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`moz-faq__item ${isOpen ? 'moz-faq__item--open' : ''}`}
          >
            <button
              type="button"
              className="moz-faq__trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
            >
              <span>{item.question}</span>
              <span className="moz-faq__icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              id={`faq-panel-${item.id}`}
              className="moz-faq__panel"
              role="region"
              aria-hidden={!isOpen}
            >
              <div className="moz-faq__content">
                <div className="moz-faq__answer">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
