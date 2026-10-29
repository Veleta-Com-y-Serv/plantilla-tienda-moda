# Plantilla NoExpertise · Tienda de moda

Web editorial en blanco, negro y cobalto para boutiques, tiendas de ropa, calzado y complementos. Sin carrito:
cada prenda lleva su botón «Pregunta por WhatsApp».

- Sectores: moda, boutique, ropa, calzado, complementos, tienda. Estilo: editorial. Plan mínimo: presencia. Orden 240.
- Secciones: hero, colecciones, sobre, productos, cita, lookbook, ventajas, tienda, opiniones, preguntas, cta, contacto (+ `texto` genérico).
- Campos propios: `colecciones[]` (nombre, texto, imagen), `productos[]` (nombre, ref, categoria, texto, tallas, precio, estado «Nuevo|Rebajas|», imagen), `productos.boton`, `cita.declaracion/autor`, `lookbook.galeria[]`, `tienda.horario[]` (dia, horas), `opiniones.testimonios[]` (texto, autor, nota).
- Ejemplo: «Sal i Lli», moda mediterránea en el casco antiguo de Palma (negocio ficticio).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD `ClothingStore` y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.
