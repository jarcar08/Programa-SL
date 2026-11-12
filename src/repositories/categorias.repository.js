src/repositories/categorias.repository.js
import { categorias, libros } from '../data/datos.js';
import { siguienteId } from '../utils/ids.js';
export async function listar() {
  return structuredClone(categorias);
}
export async function buscarPorId(id) {
  const c = categorias.find((x) => x.id === id);
  return c ? structuredClone(c) : null;
}
export async function buscarPorNombre(nombre) {
  const c = categorias.find((x) => x.nombre.toLowerCase() === nombre.toLowerCase());
  return c ? structuredClone(c) : null;
}
export async function contarLibros(id) {
  return libros.filter((l) => l.categoria_id === id).length;
}
export async function crear(datos) {
  const nueva = {
    id: siguienteId(categorias),
    ...datos,
    descripcion: datos.descripcion ?? null
  };
  categorias.push(nueva);
  return structuredClone(nueva);
}
export async function actualizar(id, datos) {
  const c = categorias.find((x) => x.id === id);
  if (!c) return null;
  Object.assign(c, datos);
  return structuredClone(c);
}
export async function eliminar(id) {
  const i = categorias.findIndex((x) => x.id === id);
  if (i === -1) return false;
  categorias.splice(i, 1);
  return true;
}
