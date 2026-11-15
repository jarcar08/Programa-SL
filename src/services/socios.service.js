import * as repo from '../repositories/socios.repository.js';
import { noEncontrado, solicitudInvalida} from '../utils/http-error.js';
const TIPOS = ['ESTUDIANTE', 'DOCENTE', 'ADMINISTRATIVO'];
const CAMPOS = ['dni', 'nombres', 'apellidos', 'email', 'telefono', 'tipo', 'activo'];
const soloCampos = (d) =>Object.fromEntries(Object.entries(d).filter(([k])=>CAMPOS.includes(k)));

function validar(d, parcial = false) {
   if (!d || typeof d !== 'object') {
        throw solicitudInvalida('El cuerpo de la petición es inválido o está vacío');
    }

  const errores = [];
  if ((!parcial || d.dni !== undefined) && !/^\d{8}$/.test(d.dni ?? ''))
    errores.push('dni debe tener 8 dígitos');
  if ((!parcial || d.nombres !== undefined) && !d.nombres?.trim())
    errores.push('nombres es obligatorio');
  if ((!parcial || d.apellidos !== undefined) && !d.apellidos?.trim())
    errores.push('apellidos es obligatorio');
  if ((!parcial || d.email !== undefined) && !/^\S+@\S+\.\S+$/.test(d.email ?? ''))
    errores.push('email no es válido');
  if (d.tipo !== undefined && !TIPOS.includes(d.tipo))
    errores.push(`tipo debe ser ${TIPOS.join(', ')}`);
  if (errores.length>0) throw solicitudInvalida('Datos de socio no válidos', errores);
}


async function verificarUnicos(datos, id = null) {
  for (const campo of ['dni', 'email']) {
    if (datos[campo] === undefined) continue;
    const otro = await repo.buscarPorCampo(campo, datos[campo]);
    if (otro && otro.id !== id)
      throw conflicto(`Ya existe un socio con ese ${campo}`);
 }
}


export const listar = (filtro) => repo.listar(filtro);

export async function obtener(id) {
  const socio = await repo.buscarPorId(id);
  if (!socio) throw noEncontrado('Socio');
  return socio;
}
export async function crear(body) {
  validar(body);
  const datos = soloCampos(body);
  await verificarUnicos(datos);
  return repo.crear(datos);
}
export async function actualizar(id, body) {
  await obtener(id);
  validar(body, true);
  const datos = soloCampos(body);
  await verificarUnicos(datos, id);
  return repo.actualizar(id, datos);
}
export async function eliminar(id) {
  await obtener(id);
  await repo.eliminar(id);
}