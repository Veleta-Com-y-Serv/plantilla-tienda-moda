# Plantilla «Tienda de moda» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **editorial**
(revista de temporada: bandas a sangre en blanco, negro tinta y azul cobalto, serif fina enorme para los títulos,
antetítulos en mayúsculas muy espaciadas con una línea de color, fotos verticales de borde a borde, esquinas rectas).
Todo en castellano de España, frases cortas, sin jerga. Brief de diseño completo en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (también `colecciones` y `tallas`); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = negro tinta de bandas y botones, acento = cobalto, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los derivados (`--c-papel`, `--c-linea`, `--c-suave`, `--c-oscuro`, `--c-sobre-oscuro`, `--c-acento-claro`) salen con `color-mix` en `src/styles/global.css`. El texto sobre el acento es blanco (`--c-sobre-acento`): si el cliente pone un acento claro, cambia esa variable a un tono oscuro.
- **Tipografías y aspecto**: `src/styles/global.css` (`--fuente-titulos` serif Didot/Bodoni del sistema, `--fuente-texto` sans neutra; bandas `.banda-clara`, `.banda-papel`, `.banda-oscura`, `.banda-acento`; botones `.btn` negro, `.btn--claro` blanco, `.btn-sec` contorno, `.enlace-flecha`; `.antetitulo`, `.titulo-seccion`, `.estado`, `.filtro`, formulario de líneas). Sin fuentes externas.
- **Cabecera** (`src/components/Header.astro`): fija a todo el ancho; menú a la izquierda, nombre en el centro y `boton_cabecera` a la derecha (en móvil, nombre + menú plegable). Transparente sobre la portada si es la primera sección y tiene foto; blanca al bajar.
- **Pie** (`src/components/Footer.astro`): negro, columnas (marca y redes, colecciones, menú, visítanos), nombre enorme en serif y línea legal. Botón flotante de WhatsApp si hay `contacto.whatsapp`.
- **Imágenes**: fotos en `public/fotos/` (se generan desde `fotos.json`); respaldo en `public/placeholders/` (`hero.svg`, `coleccion.svg`, `prenda.svg`, `foto.svg`, `persona.svg`). En `site.yaml` con ruta absoluta (`/fotos/producto-1.jpg`). Fotos de prendas verticales 3:4.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en serif y mayúsculas.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (se oculta solo con `false`).

## Secciones
Cada sección se pinta solo si `secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `secciones/hero.astro` · foto a sangre a pantalla completa, título serif enorme, texto y dos botones.
- `colecciones` → `secciones/colecciones.astro` · colecciones de borde a borde con foto vertical; al pulsar filtran las novedades.
- `sobre` → `secciones/sobre.astro` · foto 50/50 a sangre + historia con letra capital.
- `productos` → `secciones/productos.astro` · rejilla de prendas con estado, tallas, precio y «Pregunta por WhatsApp»; filtro por colección.
- `cita` → `secciones/cita.astro` · banda cobalto con frase en serif cursiva enorme.
- `lookbook` → `secciones/lookbook.astro` · banda negra + mosaico de fotos de borde a borde sin margen.
- `ventajas` → `secciones/ventajas.astro` · servicios de la tienda en columnas con número grande.
- `tienda` → `secciones/tienda.astro` · banda negra con dirección, horario y «Cómo llegar» + foto a sangre.
- `opiniones` → `secciones/opiniones.astro` · frases en serif en columnas (no se pinta vacía).
- `preguntas` → `secciones/preguntas.astro` · acordeón `details/summary` (no se pinta vacía).
- `cta` → `secciones/cta.astro` · banda cobalto «Pregunta por WhatsApp» con dos botones.
- `contacto` → `secciones/contacto.astro` · datos + formulario `mailto` con «Prenda de interés» y talla.
- `texto` → `secciones/texto.astro` · apartado genérico (`tipo: texto`), con o sin foto a sangre.

## Campos propios de esta plantilla (además del esquema común)
- `colecciones.colecciones[]`: `{ nombre, texto, imagen }`. El `nombre` debe coincidir con `productos[].categoria` para que filtre.
- `productos.productos[]`: `{ nombre, ref, categoria, texto, tallas, precio, estado, imagen }`.
  - `tallas`: **una cadena** con «;» o comas (`"S; M; L"`, `"Talla única"`). Nunca una lista.
  - `precio`: **cadena** (`"89 €"`). Vacío o `"Consultar"` = no se muestra. Nunca inventes precios.
  - `estado`: `"Nuevo"`, `"Rebajas"` o `""` (vacío = sin etiqueta).
  - `ref`: referencia; vacía = no sale.
  - El botón abre WhatsApp con el nombre y la referencia; sin WhatsApp, lleva al formulario con la prenda elegida.
- `productos.boton`: texto del botón de cada prenda (por defecto «Pregunta por WhatsApp»). `productos.cta`: botón bajo la rejilla.
- `cita.declaracion` (frase) y `cita.autor` (firma). Sin frase, no se pinta.
- `lookbook.galeria[]`: rutas de fotos (mosaico); `lookbook.cta` opcional (p. ej. Instagram).
- `ventajas.items[]`: `{ titulo, texto, icono }` (iconos: tijeras, percha, bolsa, whatsapp, espejo, aguja, regalo, camion, etiqueta…, ver `src/components/ui/Icono.astro`).
- `tienda.horario[]`: `{ dia, horas }` (sale en la tabla y en el JSON-LD). Sin horario, `contacto.horario`. `tienda.cta` opcional sustituye a «Cómo llegar» (mapa de `contacto.direccion`).
- `opiniones.testimonios[]`: `{ texto, autor, nota }`. No inventes opiniones.
- `cta.cta`: si su `url` está vacía, va al WhatsApp de `contacto` (o al formulario). `cta.cta_secundario` solo con url.
- `preguntas.preguntas[]`: `{ pregunta, respuesta }`.

## Reglas para órdenes
1. **Activar o quitar una sección**: `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, fotos, prendas**: solo en `site.yaml`. Si un texto lleva comas o «: » dentro de `{ … }`, entre comillas.
4. **Listas planas**: ningún elemento de lista lleva otra lista dentro. Máximo 24 elementos por lista.
5. **Página nueva**: `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor con `tipo:` (`tipo: texto`, `tipo: productos`, `tipo: cita`…) y un id propio. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y una banda a todo el ancho (`banda-*`), contenido en `.contenedor`.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` no se cambian. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts` (SEO de base, igual en todas las plantillas). `seo.url` y `seo.indexable` los pone la plataforma.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), JavaScript mínimo (menú, cabecera al bajar, filtro y asunto del formulario), 16 px de margen lateral del texto (`.contenedor`), fotos y fondos de borde a borde, sin scroll horizontal en móvil, botones de 44 px. `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion`); decorativas con `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
