# Design System — Auto-École Mozart

> **Version 1.0** · React.js · Mobile-first · Identité conservée, usage modernisé

---

## Vue d'ensemble

Ce Design System est la fondation visuelle et technique de la refonte premium de [autoecolemozart.cm](https://autoecolemozart.cm/). Il conserve l'identité rouge Mozart (#E62100) et le navy institutionnel (#021E40), tout en modernisant leur application.

**Stack :** React 19 + TypeScript + Vite + CSS Custom Properties

**Polices :**
- **Titres** → Poppins (500–800)
- **Corps** → Inter (400–700)

**Lancer la vitrine :**
```bash
npm install
npm run dev
```

---

## 1. Palette de couleurs

### Primary — Rouge Mozart
Hérité du site actuel (`#E62100`, `#C62333`, `#DC3545`).

| Token | Hex | Usage |
|-------|-----|-------|
| `--moz-primary-500` | `#E62100` | CTA principal, liens, accents |
| `--moz-primary-600` | `#C62333` | Hover, top bar legacy |
| `--moz-primary-50` | `#FFF1F0` | Fonds subtils, badges |
| `--moz-primary-subtle` | `#FFF1F0` | Backgrounds légers |

### Secondary — Navy institutionnel
Hérité du heading color actuel `#021E40`.

| Token | Hex | Usage |
|-------|-----|-------|
| `--moz-secondary-500` | `#021E40` | Titres, headers table, Hero |
| `--moz-secondary-50` | `#E8EDF4` | Fonds alternatifs |

### Accent — Or premium
Inspiré du nom « Mozart » — réussite, badges premium.

| Token | Hex | Usage |
|-------|-----|-------|
| `--moz-accent-500` | `#C9A227` | Étoiles témoignages, badges premium |

### Sémantiques

| Rôle | Token | Hex |
|------|-------|-----|
| Success | `--moz-success-500` | `#059669` |
| Warning | `--moz-warning-500` | `#F59E0B` |
| Error | `--moz-error-500` | `#DC3545` |
| Texte corps | `--moz-neutral-800` | `#2D2D2D` |
| Texte muted | `--moz-neutral-500` | `#696868` |
| Fond page | `--moz-neutral-0` | `#FFFFFF` |
| Fond Hero | `--moz-neutral-950` | `#0A1628` |

---

## 2. Typographie

| Élément | Police | Taille | Poids |
|---------|--------|--------|-------|
| H1 | Poppins | clamp(2rem, 5vw, 3rem) | 800 |
| H2 | Poppins | clamp(1.625rem, 4vw, 2.25rem) | 700 |
| H3 | Poppins | clamp(1.375rem, 3vw, 1.875rem) | 600 |
| Lead | Inter | clamp(1.125rem, 2.5vw, 1.25rem) | 400 |
| Body | Inter | 1rem (16px) | 400 |
| Overline | Poppins | 0.75rem, uppercase | 600 |
| Caption | Inter | 0.875rem | 400 |
| Label | Inter | 0.875rem | 500 |

**Classes utilitaires :** `.moz-h1` à `.moz-h6`, `.moz-lead`, `.moz-overline`, `.moz-caption`, `.moz-label`

---

## 3. Espacements

Base **4px** (0.25rem).

| Token | Valeur | Usage |
|-------|--------|-------|
| `--moz-space-2` | 8px | Gaps compacts |
| `--moz-space-4` | 16px | Padding composants |
| `--moz-space-6` | 24px | Padding cards |
| `--moz-space-8` | 32px | Gaps sections |
| `--moz-space-16` | 64px | Section mobile |
| `--moz-space-24` | 96px | Section desktop |

**Container :** max-width 1200px, padding responsive (16px → 24px → 32px).

---

## 4. Border Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `--moz-radius-sm` | 6px | Badges, petits boutons |
| `--moz-radius-md` | 10px | Inputs, boutons |
| `--moz-radius-lg` | 16px | Cartes |
| `--moz-radius-xl` | 24px | Témoignages, modales |
| `--moz-radius-2xl` | 32px | Hero visual |
| `--moz-radius-full` | 9999px | Avatars, badges pill |

---

## 5. Ombres

| Token | Usage |
|-------|-------|
| `--moz-shadow-sm` | Éléments subtils |
| `--moz-shadow-card` | Cartes au repos |
| `--moz-shadow-card-hover` | Cartes interactives |
| `--moz-shadow-primary` | Bouton CTA primary |
| `--moz-shadow-lg` | FAQ ouverte, dropdowns |

Toutes les ombres sont teintées **navy** (`rgb(2 30 64 / x)`) pour un rendu institutionnel.

---

## 6. Composants React

### Import
```tsx
import {
  Button, Card, Badge, Input, Textarea, Select,
  Checkbox, FormGrid, Table, FAQ, TestimonialCarousel, Hero,
} from './design-system';
```

### Button
| Prop | Valeurs | Default |
|------|---------|---------|
| `variant` | primary, secondary, outline, ghost, whatsapp | primary |
| `size` | sm, md, lg | md |
| `fullWidth` | boolean | false |
| `onDark` | boolean (outline sur Hero) | false |

### Card
| Prop | Valeurs | Default |
|------|---------|---------|
| `variant` | default, elevated, outlined, featured | default |
| `interactive` | boolean (hover lift) | false |

### Badge
| Prop | Valeurs |
|------|---------|
| `variant` | primary, secondary, success, warning, error, neutral, accent |
| `solid` | boolean |
| `dot` | boolean |

### Hero
| Variant | Hauteur | Usage |
|---------|---------|-------|
| `home` | 520–800px | Accueil, conversion |
| `page` | 240–360px | Pages intérieures |
| `formation` | 320–480px | Détail permis |

---

## 7. Responsive

| Breakpoint | Range | Comportement |
|------------|-------|--------------|
| Mobile | 320–767px | 1 col, bottom CTA, tables → cards |
| Tablet | 768–1023px | 2 cols, nav visible |
| Desktop | 1024px+ | 3–4 cols, Hero split, dropdowns |
| Wide | 1280px+ | Container centré 1200px |

**Principes mobile-first :**
- Touch targets ≥ 48px
- Font-size inputs = 16px (anti-zoom iOS)
- Sticky CTA bar (à implémenter en layout)
- Scroll-snap carousels

---

## 8. Structure des fichiers

```
src/design-system/
├── tokens/
│   ├── tokens.css      # CSS custom properties
│   └── index.ts        # Tokens TypeScript
├── styles/
│   └── base.css        # Reset, typographie, utilities
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Badge/
│   ├── Form/
│   ├── Table/
│   ├── FAQ/
│   ├── Testimonial/
│   └── Hero/
└── index.ts            # Exports publics

src/showcase/
└── DesignSystemShowcase.tsx   # Vitrine interactive
```

---

## 9. Prochaine étape

Après validation visuelle du Design System (`npm run dev`), développement des pages du sitemap validé en réutilisant ces composants.
