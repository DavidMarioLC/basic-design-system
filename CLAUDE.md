# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, framework-free brutalist design system: raw, unadorned, high-contrast. No accent color — hierarchy comes from black/white/gray and monospace typography. Just `index.html` + `styles.css`, no build step, no package manager.

## Commands

Serve locally (no build step needed, plain static files):

```
python3 -m http.server 8123 --directory /Users/davidmariolc/projects/basic-design-system
curl -sf http://localhost:8123
```

## Architecture

- `styles.css` — all design tokens live as CSS custom properties on `:root`, followed by component styles. Tokens are consumed everywhere via `var(--token-name)`; never hardcode raw colors/sizes/spacing in component rules.
- `index.html` — single page consuming the tokens/components from `styles.css`.
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
