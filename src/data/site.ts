// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
/** Prenda de la sección `productos`. Todo escalar: `tallas` es una cadena "S; M; L" (o "Talla única"). */
export interface Producto {
  nombre: string;
  ref?: string;
  categoria?: string;   // igual que colecciones[].nombre para que filtre
  texto?: string;
  tallas?: string;
  precio?: string;      // "Consultar", vacío o una cifra como cadena ("89 €")
  estado?: string;      // "Nuevo" | "Rebajas" | ""
  imagen?: string;
}
/** Colección de la sección `colecciones` (nombre = productos[].categoria para que filtre). */
export interface Coleccion { nombre: string; texto?: string; imagen?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  productos: Producto[];
  colecciones: Coleccion[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).map((t) => ({ ...t, texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })) as Testimonio[],
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).map((h) => ({ ...h, dia: texto(h.dia), horas: texto(h.horas) })) as Horario[],
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    productos: lista<Crudo>(s.productos).map((p) => ({
      ...p,
      nombre: texto(p.nombre),
      ref: texto(p.ref),
      categoria: texto(p.categoria),
      texto: texto(p.texto),
      tallas: texto(p.tallas),
      precio: texto(p.precio),
      estado: texto(p.estado),
      imagen: texto(p.imagen),
    })) as Producto[],
    colecciones: lista<Crudo>(s.colecciones).map((c) => ({
      ...c,
      nombre: texto(c.nombre),
      texto: texto(c.texto),
      imagen: texto(c.imagen),
    })) as Coleccion[],
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#121212', acento: '#2b44d6', fondo: '#ffffff', texto: '#161616', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'ClothingStore',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);

/** Primera sección activa con ese id o con `tipo:` igual (cabecera, pie, formulario). Devuelve su id y sus datos. */
export function buscarSeccion(diseno: string): { id: string; s: Seccion } | null {
  const id = Object.keys(site.secciones).find((k) => site.secciones[k].activa && (k === diseno || site.secciones[k].tipo === diseno));
  return id ? { id, s: site.secciones[id] } : null;
}

/** Clave sin tildes ni espacios para filtros y anclas ("Ropa de mujer" → "ropa-de-mujer"). */
export const clave = (t = '') =>
  t.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** "XS; S; M" o "XS, S, M" → ['XS', 'S', 'M']. */
export const partes = (t = '') => t.split(/[;,]/).map((x) => x.trim()).filter(Boolean);

/** ¿El precio se puede enseñar? ("Consultar" o vacío, no). */
export const conPrecio = (p?: string) => !!p && !/^consultar$/i.test(p.trim());

/** Destino de un botón: su url o, si está vacía, la de respaldo (WhatsApp, formulario…). */
export const destino = (url: string | undefined, respaldo: string) => (url && url.trim() ? url.trim() : respaldo);
