src/repositories/libros.repository.js
// CAPA DE ACCESO A DATOS (repositorio)
// Única capa que sabe DÓNDE están los datos. Hoy: array. Semana 3: MySQL.
// Todas las funciones son async para que la firma no cambie con MySQL.
import { libros } from '../data/datos.js';
import { siguienteId } from '../utils/ids.js';
export async function listar({ q, categoriaId } = {}) {
  let r = libros;
  if (q) r = r.filter((l) =>
    l.titulo.toLowerCase().includes(q.toLowerCase()));
  if (categoriaId) r = r.filter((l) =>
    l.categoria_id === Number(categoriaId));
  return structuredClone(r);              // copia: nadie modifica el array por fuera
}
export async function buscarPorId(id) {
  const libro = libros.find((l) => l.id === id);
  return libro ? structuredClone(libro) : null;
}
export async function buscarPorIsbn(isbn) {
  const libro = libros.find((l) => l.isbn === isbn);
  return libro ? structuredClone(libro) : null;
}
export async function crear(datos) {
  const nuevo = { id: siguienteId(libros), ...datos };   // simula AUTO_INCREMENT
  libros.push(nuevo);
  return structuredClone(nuevo);
}
export async function actualizar(id, datos) {
  const libro = libros.find((l) => l.id === id);
  if (!libro) return null;
  Object.assign(libro, datos);
  return structuredClone(libro);
}
export async function eliminar(id) {
  const i = libros.findIndex((l) => l.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}
