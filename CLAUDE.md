# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, framework-free brutalist design system: raw, unadorned, high-contrast. No accent color — hierarchy comes from black/white/gray and monospace typography. Just `index.html` + `styles.css` + `site.css` + `app.js`, no build step, no package manager.

## Commands

Serve locally (no build step needed, plain static files):

```
python3 -m http.server 8123 --directory /Users/davidmariolc/projects/basic-design-system
curl -sf http://localhost:8123
```

## Architecture

- `styles.css` — the exportable design system: design tokens as CSS custom properties on `:root`, plus the reusable component styles (Button, Input, Card, Modal, etc.). This is the only stylesheet meant to be consumed externally (e.g. via CDN) — never add page-specific/layout rules here. Tokens are consumed everywhere via `var(--token-name)`; never hardcode raw colors/sizes/spacing in component rules.
- `site.css` — styling private to this landing page (Header, Hero, Install, Components grid, Examples section and its demo blocks). Not part of the design system's public surface; not meant to be linked from other sites. Still consumes tokens from `styles.css` via `var(--token-name)`.
- `index.html` — single page consuming the tokens/components from `styles.css` and the page-specific styles from `site.css` (linked in that order).
- `app.js` — vanilla JS, no dependencies. Currently wires the `#components` grid: clicking a `.ComponentCard` opens a native `<dialog>` (`.Modal`) showing a live preview plus a copy-pasteable HTML snippet read from that card's `<template class="ComponentCard__code">`.
- `DESIGN.md` (Spanish) — the source of truth for the design system's principles, tokens, and conventions. Read it before adding tokens or components; keep it in sync when you change either.

### Token conventions (from DESIGN.md)

- Naming: `--{category}-{variant}` (e.g. `--color-gray-500`, `--font-size-lg`, `--space-4`).
- Semantic aliases (`--color-bg`, `--color-fg`, `--color-border`, `--color-muted`) decouple usage from the raw gray scale — prefer these over raw `--color-gray-*` in component rules.
- No semantic status colors (success/error/warning) yet — add them only when a component actually needs them.
- Spacing is a 4px scale: `--space-1` (4px) through `--space-8` (64px).
- Font: JetBrains Mono, loaded via Google Fonts link in `index.html`.

### CSS class naming: BEM, capitalized block

- Block = root component, PascalCase (e.g. `.Header`, `.Hero`, `.Components`).
- Element: `Block__element` (e.g. `.Header__brand`, `.Hero__title`).
- Modifier: `Block--modifier` or `Block__element--modifier` (e.g. `.card--highlighted`, `.card__title--large`).
- A block must never depend on another block's styles — no cross-block selector nesting.
