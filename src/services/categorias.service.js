src/services/categorias.service.js
import * as repo from '../repositories/categorias.repository.js';
import { noEncontrado, solicitudInvalida, conflicto } from '../utils/http-error.js';
export const listar = () => repo.listar();
export async function obtener(id) {
  const c = await repo.buscarPorId(id);
  if (!c) throw noEncontrado('Categoría');
  return c;
}
export async function crear({ nombre, descripcion }) {
  if (!nombre?.trim()) throw solicitudInvalida('nombre es obligatorio');
  if (await repo.buscarPorNombre(nombre.trim()))
    throw conflicto('La categoría ya existe');
  return repo.crear({ nombre: nombre.trim(), descripcion: descripcion ?? null });
}
export async function actualizar(id, { nombre, descripcion }) {
  await obtener(id);
  const datos = {};
  if (nombre !== undefined) {
    if (!nombre.trim()) throw solicitudInvalida('nombre no puede estar vacío');
    const otra = await repo.buscarPorNombre(nombre.trim());
    if (otra && otra.id !== id) throw conflicto('La categoría ya existe');
    datos.nombre = nombre.trim();
  }
  if (descripcion !== undefined) datos.descripcion = descripcion;
  return repo.actualizar(id, datos);
}

export async function eliminar(id) {
  await obtener(id);
  if ((await repo.contarLibros(id)) > 0) {
    throw conflicto('No se puede eliminar: la categoría tiene libros asociados');
  }
  await repo.eliminar(id);
}

