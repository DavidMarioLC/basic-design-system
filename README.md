# Basic Design System

A static, framework-free brutalist design system: raw, unadorned,
high-contrast. No accent color — hierarchy comes from black/white/gray and
monospace typography (JetBrains Mono).

Just plain HTML/CSS/JS. No build step, no package manager, no frameworks.

## Structure

- `styles.css` — the exportable design system: design tokens (`--color-*`,
  `--font-*`, `--space-*`, etc.) as custom properties on `:root`, plus the
  reusable component styles (Button, Input, Card, Modal, ...). This is the
  only stylesheet meant to be consumed externally (e.g. via CDN).
- `site.css` — styling private to this landing page (Header, Hero, Install,
  Components grid, Examples section and its demos). Not part of the design
  system's public surface.
- `index.html` — single page consuming the tokens/components from
  `styles.css` and the page-specific styles from `site.css`.
- `app.js` — vanilla JS, no dependencies. Wires the `#components` grid:
  clicking a `.ComponentCard` opens a `<dialog>` (`.Modal`) with a live
  preview and the copy-pasteable HTML snippet from that card.
- `DESIGN.md` (Spanish) — the source of truth for the design system's
  principles, tokens, and conventions. Read it before adding tokens or
  components.

## Conventions

- **Tokens**: `--{category}-{variant}` (e.g. `--color-gray-500`,
  `--font-size-lg`, `--space-4`). Components must consume tokens via
  `var(--token-name)`, never raw values.
- **CSS classes**: BEM with a capitalized block — `.Block`, `.Block__element`,
  `.Block--modifier`. A block must never depend on another block's styles.

See `DESIGN.md` for the full detail on tokens and components.
