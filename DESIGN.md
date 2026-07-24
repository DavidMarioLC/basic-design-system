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

`.ComponentCard--span-2` / `.ComponentCard--span-3` — modificadores
opcionales (`grid-column: span N`) para componentes que necesitan más ancho
en la grilla para apreciarse bien (ej: `.Table` y `.Accordion`, que con el
ancho de una columna quedan demasiado apretados).

### Radio (`.Radio`)

`<input type="radio">` reestilado (`appearance: none`) manteniendo su
semántica y accesibilidad nativas — sigue siendo un input real, no un div
simulado.

- `.Radio` — label wrapper, `display: inline-flex`.
- `.Radio__input` — el input nativo; círculo con borde duro de 2px, punto
  interior (`::before`) que escala con `:checked`.
- `.Radio__label` — texto asociado; se atenúa a `--color-muted` cuando el
  input hermano está `:disabled` (selector `~`).
- `:disabled` — borde y punto en `--color-muted`, `cursor: not-allowed`.

### Checkbox (`.Checkbox`)

`<input type="checkbox">` reestilado (`appearance: none`), mismo patrón que
`.Radio`: input real, no un div simulado.

- `.Checkbox` — label wrapper, `display: inline-flex`.
- `.Checkbox__input` — el input nativo; cuadrado con borde duro de 2px, tilde
  interior (`::before`, `clip-path`) que escala con `:checked`.
- `.Checkbox__label` — texto asociado; se atenúa a `--color-muted` cuando el
  input hermano está `:disabled` (selector `~`).
- `:disabled` — borde y tilde en `--color-muted`, `cursor: not-allowed`.

### Input (`.Input`)

`<input>` reestilado dentro de un `<label>` wrapper, manteniendo semántica
y accesibilidad nativas (el label asocia el texto al campo sin necesidad de
`for`/`id`).

- `.Input` — label wrapper, `display: inline-flex`, `flex-direction: column`.
- `.Input__label` — texto del campo, en mayúsculas, bold.
- `.Input__field` — el input nativo; borde duro de 2px, fondo `--color-bg`.
  El foco reemplaza el outline por defecto con `box-shadow` duro (mismo
  patrón que `.ComponentCard:hover`).
- `:disabled` — borde y texto en `--color-muted`, `cursor: not-allowed`.

### Slider (`.Slider`)

`<input type="range">` reestilado dentro de un `<label>` wrapper, mismo
patrón de `.Input`.

- `.Slider` — label wrapper, `display: inline-flex`, `flex-direction: column`.
- `.Slider__label` — texto del campo, en mayúsculas, bold.
- `.Slider__field` — el input nativo; track plano de 4px (`--color-border`)
  y thumb cuadrado con borde duro de 2px (pseudo-elementos
  `::-webkit-slider-*` / `::-moz-range-*`, ya que `<input type="range">` no
  se puede estilizar con selectores estándar).
- `:disabled` — track y thumb en `--color-muted`, `cursor: not-allowed`.

### Select (`.Select`)

`<select>` reestilado (`appearance: none`) con flecha propia, ya que
`<select>` no admite pseudo-elementos de forma confiable — la flecha vive en
`.Select__control::after` en vez de en el propio `<select>`.

- `.Select` — label wrapper, `display: inline-flex`, `flex-direction: column`.
- `.Select__label` — texto del campo, en mayúsculas, bold.
- `.Select__control` — wrapper `position: relative` que agrega la flecha
  decorativa (`::after`, `pointer-events: none`).
- `.Select__field` — el select nativo; mismo tratamiento visual que
  `.Input__field` (borde duro, foco con `box-shadow`).
- `:disabled` — borde y texto en `--color-muted`, `cursor: not-allowed`.

### Avatar (`.Avatar`)

Cuadrado con borde duro (no círculo — consistente con el brutalismo de
bordes rectos del resto del sistema), fondo invertido (`--color-fg`) con
iniciales en mayúsculas, o una imagen recortada con `object-fit: cover`.

- `.Avatar` — contenedor `40×40`, `display: inline-flex` centrado.
- `.Avatar__image` — `<img>` opcional dentro del avatar, cubre el 100%.
- `.Avatar--sm` / `.Avatar--lg` — modificadores de tamaño (`28px` / `56px`).

### Badge (`.Badge`)

Etiqueta pequeña, mismo lenguaje visual que `.Hero__tag`: borde duro,
mayúsculas, letter-spacing amplio.

- `.Badge` — `display: inline-block`, fondo `--color-bg`, texto `--color-fg`.
- `.Badge--inverted` — invierte fg/bg, mismo patrón que `.Button--secondary`.

### Accordion (`.Accordion`)

`<details>` + `<summary>` nativos de HTML5 reestilados — sin JS, el
toggle/estado abierto-cerrado y la accesibilidad de teclado los maneja el
navegador.

- `.Accordion` — el `<details>`; `width: 100%` para que apile verticalmente
  dentro de `.ComponentCard__row` (que es `flex-wrap`), y borde duro propio
  (no se fusiona con accordions vecinos — el layout que lo contiene puede
  tener gap, así que cada uno se mantiene autocontenido).
- `.Accordion__summary` — el `<summary>`; se le quita el marcador nativo
  (`list-style: none` + `::-webkit-details-marker: none`) y se reemplaza por
  un indicador `+`/`−` vía `::after`, controlado con el selector de atributo
  `[open]` en el `<details>` padre.
- `.Accordion__content` — `<div>` con el contenido, hijo del `<details>`
  (no puede ir dentro de `<summary>`); se muestra/oculta automáticamente por
  el navegador según el estado `open`.

### Table (`.Table`)

`<table>` nativa reestilada: `border-collapse: collapse`, sin líneas
verticales (solo bordes horizontales duros entre filas), consistente con el
resto del sistema donde la jerarquía se marca con borde y peso de fuente,
no con color de fondo alterno (zebra stripes).

- `.Table` — `width: 100%`, `border-collapse: collapse`.
- `.Table__head` — `<thead>`; borde inferior duro de 2px que separa el
  encabezado del cuerpo.
- `.Table__heading` — `<th>`; texto en mayúsculas, bold, alineado a la
  izquierda.
- `.Table__row` — `<tr>` del cuerpo; borde inferior duro de 2px, salvo la
  última fila (`:last-child`).
- `.Table__cell` — `<td>`.

### Spinner (`.Spinner`)

Indicador de carga en CSS puro (sin JS): un cuadrado (no círculo — consistente
con el resto del sistema, que evita `border-radius`) con un borde grueso donde
un lado (`border-top-color`) usa `--color-fg` y el resto `--color-muted`,
rotando con `@keyframes Spinner-spin`.

- `.Spinner` — `24×24` por defecto, `border-width: 3px`.
- `.Spinner--sm` / `.Spinner--lg` — modificadores de tamaño (`16px` / `40px`).
- Respeta `prefers-reduced-motion: reduce` ralentizando la animación en vez
  de quitarla del todo (sigue comunicando "cargando", pero sin el parpadeo
  agresivo de una rotación rápida).

### Alert (`.Alert`)

Caja de aviso con borde duro. Sigue el principio de "sin color de acento"
del sistema: la variante no se distingue por hue (rojo/verde/amarillo) sino
por contraste — `.Alert--inverted` invierte fg/bg, mismo patrón que
`.Button--secondary` / `.Badge--inverted` — y por el texto (`Alert__icon`,
`Alert__title`).

- `.Alert` — `display: flex`, icono + contenido; `width: 100%` para apilar
  dentro de `.ComponentCard__row` igual que `.Accordion`.
- `.Alert__icon` — símbolo o carácter (ej: `!`), bold.
- `.Alert__title` — encabezado corto, mayúsculas, bold.
- `.Alert__message` — cuerpo del mensaje, `--color-muted` (o
  `--color-gray-400` dentro de `.Alert--inverted`, ya que `--color-muted`
  no tiene suficiente contraste sobre fondo invertido).
- `.Alert--inverted` — invierte fg/bg.

### Card (`.Card`)

Contenedor genérico de contenido con borde duro — distinto de
`.ComponentCard`, que es específico de la grilla de `#components` y no
forma parte del sistema de componentes en sí.

- `.Card` — `display: flex; flex-direction: column`, borde duro,
  `width: 100%` para apilar dentro de `.ComponentCard__row`.
- `.Card__title` — encabezado, mayúsculas, extrabold.
- `.Card__description` — texto de cuerpo, `--color-muted`.
- `.Card__footer` — fila de acciones (ej: un `.Button`), con margen
  superior para separarla del contenido.

### FormDemo (`.FormDemo`)

Sección de ejemplo (`#form-demo`, en `index.html` después de `#components`)
que arma un formulario de registro real combinando los componentes del
sistema (`.Input`, `.Select`, `.Radio`, `.Slider`, `.Checkbox`, `.Button`) —
no es un componente nuevo del sistema, es un caso de uso compuesto que
demuestra cómo se ven juntos en un flujo real.

- `.FormDemo` — wrapper de la sección, mismo ancho máximo que `.Hero`.
- `.FormDemo__form` — `<form>`, `display: flex; flex-direction: column`,
  borde duro (mismo lenguaje visual que `.ComponentCard`).
- `.FormDemo__fieldset` / `.FormDemo__legend` — resetean el `<fieldset>`
  nativo (sin borde/padding) y estilizan el `<legend>` como un label más
  (mayúsculas, bold), usados para agrupar el radio "Plan".
- `.FormDemo__group` — fila con gap para agrupar inputs relacionados
  (radios, checkboxes).
- `.FormDemo__actions` — alinea los botones de acción a la derecha.

### TableDemo (`.TableDemo`)

Sección de ejemplo (`#table-demo`, en `index.html` después de `#form-demo`)
que arma una lista de usuarios combinando `.Table`, `.Avatar` y `.Badge` —
igual que `.FormDemo`, no es un componente nuevo del sistema sino un caso de
uso compuesto.

- `.TableDemo` — wrapper de la sección, mismo patrón que `.FormDemo`.
- `.TableDemo__wrap` — borde duro alrededor de la `.Table` (la tabla en sí
  no tiene borde exterior propio, solo divisores horizontales).
- `.TableDemo__user` — fila interna (`display: flex`) que combina
  `.Avatar--sm` + nombre dentro de una celda `.Table__cell`.

### Patrón: modal de preview + código

Cada `.ComponentCard` es clicable (y focuseable con teclado). Al activarla,
`app.js` abre el `<dialog>` nativo `#componentModal` (`.Modal`) con:

- un preview (clon del `.ComponentCard__row` de la card),
- el snippet HTML del componente, leído de un
  `<template class="ComponentCard__code">` dentro de la misma card,
- un botón `.Modal__copy` que copia el snippet al portapapeles.

Usa el elemento `<dialog>` de HTML5 (`showModal()` / `close()`), sin
librerías. Cerrar es nativo: click en el backdrop, `Esc`, o `.Modal__close`.
Al agregar un componente nuevo, su card debe incluir su propio `<template
class="ComponentCard__code">` con el snippet a mostrar.

## Convenciones de código

- Reset global `box-sizing: border-box` (`*, *::before, *::after`) para que
  padding y border no se sumen al ancho declarado de ningún componente.
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
