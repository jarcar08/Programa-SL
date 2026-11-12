src/repositories/socios.repository.js
import { socios } from '../data/datos.js';
import { siguienteId } from '../utils/ids.js';
export async function listar() {
  return structuredClone(socios);
}
export async function buscarPorId(id) {
  const s = socios.find((x) => x.id === id);
  return s ? structuredClone(s) : null;
}
export async function buscarPorCampo(campo, valor) {
  const s = socios.find((x) => x[campo] === valor);
  return s ? structuredClone(s) : null;
}
export async function crear(datos) {
  const nuevo = {
    id: siguienteId(socios),
    ...datos,
    telefono: datos.telefono ?? null,
    tipo: datos.tipo ?? 'ESTUDIANTE',
    activo: datos.activo ?? true
  };
  socios.push(nuevo);
  return structuredClone(nuevo);
}
export async function actualizar(id, datos) {
  const s = socios.find((x) => x.id === id);
  if (!s) return null;
  Object.assign(s, datos);
  return structuredClone(s);
}
export async function eliminar(id) {
  const i = socios.findIndex((x) => x.id === id);
  if (i === -1) return false;
  socios.splice(i, 1);
  return true;
}
