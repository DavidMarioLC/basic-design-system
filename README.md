# Basic Design System

Sistema de diseño brutalista, estático y sin dependencias: crudo, sin adornos,
alto contraste. Sin color de acento — la jerarquía se construye con
negro/blanco/gris y tipografía monoespaciada (JetBrains Mono).

Solo HTML/CSS/JS plano. Sin build step, sin package manager, sin frameworks.

## Estructura

- `styles.css` — el sistema de diseño exportable: design tokens (`--color-*`,
  `--font-*`, `--space-*`, etc.) como custom properties en `:root`, más los
  componentes reutilizables (Button, Input, Card, Modal, ...). Es la única
  hoja de estilos pensada para consumirse externamente (ej. vía CDN).
- `site.css` — estilos privados de esta landing page (Header, Hero, Install,
  grilla de Components, sección Examples y sus demos). No forma parte de la
  superficie pública del sistema de diseño.
- `index.html` — página que consume los tokens/componentes de `styles.css` y
  los estilos propios de `site.css`.
- `app.js` — JS vanilla sin dependencias. Controla la grilla `#components`:
  al hacer clic en una `.ComponentCard` abre un `<dialog>` (`.Modal`) con una
  vista previa en vivo y el snippet HTML copiable de esa tarjeta.
- `DESIGN.md` — fuente de verdad de los principios, tokens y convenciones del
  sistema de diseño (en español). Léelo antes de agregar tokens o
  componentes nuevos.

## Convenciones

- **Tokens**: `--{categoría}-{variante}` (ej. `--color-gray-500`,
  `--font-size-lg`, `--space-4`). Los componentes deben consumir tokens vía
  `var(--token-name)`, nunca valores crudos.
- **Clases CSS**: BEM con bloque en PascalCase — `.Block`, `.Block__element`,
  `.Block--modifier`. Un bloque nunca depende de los estilos de otro.

Ver `DESIGN.md` para el detalle completo de tokens y componentes.
