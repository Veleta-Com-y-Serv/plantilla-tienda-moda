# Tienda de moda: brief de diseño

Plantilla `tienda-moda` creada el 29/10/2026 a partir de `catalogo-productos` con `php artisan plantillas:nueva` y
rediseñada entera (tanda «ancho completo», fila 8 del brief). Este fichero se queda en el repo: es lo que lee quien
(persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: boutiques, tiendas de ropa de mujer y hombre, zapaterías y tiendas de complementos de barrio o de
  casco antiguo (`moda, boutique, ropa, calzado, complementos, tienda`). Quien entra quiere ver qué hay esta temporada,
  si lo tienen en su talla, cuánto cuesta y dónde está la tienda.
- **Qué tiene que conseguir la web**: que pregunten por una prenda por WhatsApp (botón en cada prenda, banda `cta` y
  botón flotante) o que vayan a la tienda (sección `tienda` con dirección, horario y «Cómo llegar»). Sin carrito.
- **Tono y estilo** (`editorial`): sereno, elegante, de revista. Sí: una revista de moda de temporada, páginas a
  sangre, mucho blanco y negro. No: tienda online de cajas con sombras, ni «caja centrada estrecha con tarjetas».
- **Concepto**: «revista de temporada». La portada es una cubierta (foto a sangre a pantalla completa, título serif
  enorme abajo); las secciones son bandas a todo el ancho que alternan blanco, papel, negro tinta y cobalto; las
  fotos verticales tocan los bordes de la ventana; el pie firma con el nombre en serif gigante.
- **Paleta de ejemplo**: primario `#121212` (negro tinta: bandas oscuras y botones), acento `#2b44d6` (azul cobalto:
  bandas de color, líneas de antetítulo, etiqueta «Rebajas», números), fondo `#ffffff`, texto `#161616`. Derivados
  con `color-mix` (papel, líneas, texto suave, cobalto claro sobre negro). Texto sobre el acento: blanco.
- **Tipografía** (del sistema, sin descargas): títulos en serif fina de contraste alto (Didot, Bodoni 72, Bodoni MT…,
  Times de respaldo) a peso 400, de 2,4-3 rem en móvil a 5,5-8,75 rem en escritorio; texto en sans neutra (Helvetica
  Neue, Segoe UI, Arial); antetítulos, botones y etiquetas en mayúsculas de 0,7 rem con 0,22-0,32 em de interletrado.
- **Ritmo de bandas** (ejemplo): portada foto oscura → colecciones blanca + fotos a sangre → la casa papel 50/50 →
  novedades blanca → cita cobalto → lookbook negra con mosaico → servicios blanca → la tienda negra + foto 50/50 →
  opiniones papel → preguntas blanca → cta cobalto → contacto blanca → pie negro.
- **Apartados** en orden:
  1. `hero`: foto a sangre (85 svh en móvil, 100 svh en escritorio), velo oscuro abajo, antetítulo con línea, título
     enorme, texto y dos botones (claro y contorno). Cabecera transparente encima.
  2. `colecciones` (`colecciones: [{nombre, texto, imagen}]`): titular partido y colecciones de borde a borde sin
     margen, foto vertical con nombre en serif encima; filtran las novedades.
  3. `sobre`: foto 50/50 tocando el borde izquierdo + historia con letra capital y enlace.
  4. `productos` (`productos: [{nombre, ref, categoria, texto, tallas, precio, estado, imagen}]`): rejilla 2/3/4
     columnas (3 si van de tres en tres) sin tarjetas, foto 3:4, estado en la esquina, tallas en casillas, precio y
     «Pregunta por WhatsApp» con el nombre y la referencia; filtro subrayado por colección.
  5. `cita` (`declaracion`, `autor`): banda cobalto con frase en cursiva enorme y comillas gigantes.
  6. `lookbook` (`galeria`): banda negra + mosaico de borde a borde (2×2, 2×1, 1×1, 1×1 en escritorio).
  7. `ventajas` (`items`: titulo, texto, icono): servicios en 4 columnas con número serif cobalto y líneas finas.
  8. `tienda` (`horario: [{dia, horas}]`): banda negra con la dirección en grande, tabla de horario y botones +
     foto a sangre a la derecha.
  9. `opiniones` (`testimonios: [{texto, autor, nota}]`): frases en serif en 3 columnas con línea arriba.
  10. `preguntas`: titular fijo a la izquierda y acordeón de líneas a la derecha.
  11. `cta`: banda cobalto «Pregúntanos por WhatsApp» con dos botones.
  12. `contacto`: datos en líneas finas + formulario de líneas sobre papel (prenda de interés y talla).
- **Fotos** (`fotos.json`, 16): moda mediterránea con luz cálida: prendas de lino colgadas en paredes encaladas,
  modelos de espaldas o encuadradas sin rostro, bodegones de complementos, fotos de producto verticales sobre fondo
  liso, interior y entrada de una tienda en un casco antiguo. Sin texto legible, sin logotipos, sin personas
  reconocibles.
- **Qué no hacer**: tarjetas blancas con sombra, columnas estrechas centradas, esquinas redondeadas (salvo el botón
  flotante y el «+» de las preguntas), colores chillones o más de un acento; no parecerse a `catalogo-productos`
  (técnico, tablas, monoespaciada) ni a `arquitectura-interiorismo` (sans ligera y terracota).

## Hecho

- [x] `site.yaml` de ejemplo (Sal i Lli, Palma), todo activo, al menos un elemento por lista, precios entre comillas.
- [x] Secciones nuevas y `texto.astro` con el diseño; `index.astro` sin tocar.
- [x] `template.yaml` con sectores `[{id, nombre}]`, secciones, estilo, orden y guion `asistente:` (11 pasos).
- [x] `fotos.json` (16) y placeholders.
- [x] `README.md`, `CLAUDE.md`, `aviso-legal.astro` y `404.astro` con el diseño.
- [ ] Fotos y previews (`preview/card.jpg`, `preview/full.jpg`): las genera el paso de fotos.
