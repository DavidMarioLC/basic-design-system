# Basic Design System

## Principios

Estilo brutalista: crudo, sin adornos, alto contraste. Sin color de acento —
la jerarquía se construye con negro, blanco, gris y tipografía monoespaciada.

## Design Tokens

### Colores

| Token | Valor | Uso |
|---|---|---|
| `--color-black` | `#000000` | Texto principal, bordes |
| `--color-white` | `#ffffff` | Fondo principal |
| `--color-gray-100` … `--color-gray-900` | de `#f2f2f2` a `#0a0a0a` | Escala de grises para superficies, estados, texto secundario |
| `--color-bg` | alias de `--color-gray-200` | Fondo semántico |
| `--color-fg` | alias de `--color-black` | Texto semántico |
| `--color-border` | alias de `--color-black` | Bordes (brutalismo = bordes duros, sin sombra) |
| `--color-muted` | alias de `--color-gray-500` | Texto secundario / deshabilitado |

Sin colores semánticos de estado (success/error/warning) todavía — se definen
cuando aparezcan componentes que los necesiten.

### Tipografía

- Familia: **JetBrains Mono** (Google Fonts), fallback `monospace`.
- Pesos: `400` regular, `500` medium, `700` bold, `800` extrabold.
- Escala (`--font-size-*`): `xs` 12px, `sm` 14px, `base` 16px, `lg` 20px,
  `xl` 24px, `2xl` 32px, `3xl` 48px, `4xl` 64px.
- Line-height: `tight` 1.1 (títulos), `normal` 1.5 (texto), `relaxed` 1.75.

Pendiente: importar la fuente desde Google Fonts en `index.html` (link o
`@font-face`) — no está cargada todavía, solo declarada en el token.

### Espaciado

Escala de 4px: `--space-1` (4px) hasta `--space-8` (64px), pasos
4/8/12/16/24/32/48/64.

## Componentes

### Button (`.Button`)

Botón sólido, sin radio de borde, sin sombra — invierte fg/bg en hover.

- `.Button` — variante primaria (fondo `--color-fg`, texto `--color-bg`).
- `.Button--secondary` — invierte los colores base (fondo `--color-bg`,
  texto `--color-fg`); el hover también se invierte.
- `:disabled` — borde y texto en `--color-muted`, sin interacción.

`.ComponentCard` es el bloque contenedor usado en la grilla de `#components`
para mostrar cada componente (título + fila de ejemplos); no es parte del
sistema de componentes en sí.

## Convenciones de código

- Tokens como custom properties CSS en `:root` (`styles.css`).
- Nomenclatura de tokens: `--{categoria}-{variante}` (ej: `--color-gray-500`,
  `--font-size-lg`, `--space-4`).
- Alias semánticos (`--color-bg`, `--color-fg`) para desacoplar el uso de
  la escala cruda de grises.
- Nomenclatura de clases: **BEM** (`Block__Element--Modifier`).
  - Block: componente raíz (ej: `.card`).
  - Element (`__`): parte interna del bloque (ej: `.card__title`).
  - Modifier (`--`): variante o estado (ej: `.card--highlighted`,
    `.card__title--large`).
  - Un bloque no debe depender de estilos de otro bloque (sin anidar
    selectores de distintos componentes).

## Uso

Enlazar `styles.css` desde `index.html`. Todo el sistema se consume vía
custom properties (`var(--token-name)`).
