import * as repo from '../repositories/libros.repository.js';
import * as categoriasRepo from '../repositories/categorias.repository.js';
import { noEncontrado, solicitudInvalida, conflicto} from '../utils/http-error.js';

const ISBN_REGEX = /^(97[89])-?\d{10}$/;
const CAMPOS = [
  'isbn',
  'titulo',
  'anio',
  'categoria_id',
  'stock_total',
  'stock_disponible'
];
const soloCampos = (datos) =>Object.fromEntries(Object.entries(datos).filter(([k])=>CAMPOS.includes(k)));

function validar(datos, { parcial = false } = {}) {
  const errores = [];
  if (!parcial || datos.isbn !== undefined) {
    if (!ISBN_REGEX.test(datos.isbn ?? ''))
      errores.push('isbn debe tener el formato 978-XXXXXXXXXX');
  }
  if (!parcial || datos.titulo !== undefined) {
    if (!datos.titulo?.trim()) errores.push('titulo es obligatorio');
  }
  if (datos.anio !== undefined && datos.anio !== null) {
    const anio = Number(datos.anio);
    if (!Number.isInteger(anio) || anio < 1450 || anio > new Date().getFullYear()) {
      errores.push('anio no es válido');
  }
  }
  if (!parcial || datos.categoria_id !== undefined) {
    if (!Number.isInteger(Number(datos.categoria_id)))
      errores.push('categoria_id es obligatorio');
  }
  if (errores.length>0) {
    throw solicitudInvalida('Datos de libro no válidos', errores);
}}

// Misma regla que el CHECK ck_libros_stock de MySQL
function validarStock(total, disponible) {
  if (total < 0 || disponible < 0 || disponible > total) {
    throw solicitudInvalida(
      'El stock disponible debe estar entre 0 y el stock total'
    );
  }
}

export const listar = (filtro) =>repo.listar(filtro);

export async function obtener(id) {
  const libro = await repo.buscarPorId(id);
  if (!libro) throw noEncontrado('Libro'); // 404
  return libro;
}
// Deja solo las columnas conocidas, con sus tipos y valores por defecto
function normalizar(body) {
  const datos = soloCampos(body);
  datos.categoria_id = Number(datos.categoria_id);
  datos.stock_total = Number(datos.stock_total ?? 1);
  datos.stock_disponible = Number(datos.stock_disponible ?? datos.stock_total);
  datos.anio = datos.anio ? Number(datos.anio) : null;
  return datos;
}

export async function crear(body) {
  validar(body); // 400
  const datos = normalizar(body);
  validarStock(datos.stock_total, datos.stock_disponible); // 400
  if (await repo.buscarPorIsbn(datos.isbn))
    throw conflicto('Ya existe un libro con ese ISBN'); // 409
  if (!(await categoriasRepo.buscarPorId(datos.categoria_id)))
    throw solicitudInvalida('La categoría no existe'); // 400
  return repo.crear(datos);
}
export async function actualizar(id, body) {
  const actual = await obtener(id);
  validar(body, { parcial: true });
  const datos = soloCampos(body);
  if (
    datos.isbn &&
      datos.isbn !== actual.isbn &&
    (await repo.buscarPorIsbn(datos.isbn))
  ) {
    throw conflicto('Ya existe un libro con ese ISBN');
  }
  if (datos.categoria_id !== undefined) {
    datos.categoria_id = Number(datos.categoria_id);
    if (!(await categoriasRepo.buscarPorId(datos.categoria_id)))
      throw solicitudInvalida('La categoría no existe');
  }
  const total = Number(datos.stock_total ?? actual.stock_total);
  const disponible = Number(datos.stock_disponible ?? actual.stock_disponible);
  validarStock(total, disponible);
  if (datos.stock_total !== undefined) datos.stock_total = total;
  if (datos.stock_disponible !== undefined) datos.stock_disponible = disponible;
  return repo.actualizar(id, datos);
}

export async function eliminar(id) {
  const libro = await obtener(id);
  if (libro.stock_disponible < libro.stock_total) {
    throw conflicto('No se puede eliminar: el libro tiene ejemplares prestados');
  }
  await repo.eliminar(id);
}
