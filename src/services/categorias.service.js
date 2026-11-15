import * as repo from '../repositories/categorias.repository.js';
import { noEncontrado, solicitudInvalida} from '../utils/http-error.js';
const CAMPOS=['nombre', 'descripcion'];
const soloCampos = (d) =>Object.fromEntries(Object.entries(d).filter(([k])=>CAMPOS.includes(k)));

// function validar(d, parcial = false){
//     const errores = [];
//     if((!parcial || d.nombre!==undefined) && !d.nombre?.trim())
//         errores.push("El campo nombres es obligatorio");
//     if((!parcial || d.descripcion!==undefined) && !d.descripcion?.trim())
//         errores.push("El campo apellidos es obligatorio");
// }

function validar(d, parcial = false){
    if (!d || typeof d !== 'object') {
        throw solicitudInvalida('El cuerpo de la petición es inválido o está vacío');
    }

    const errores = [];
    if((!parcial || d.nombre!==undefined) && !d.nombre?.trim()){
        errores.push("El campo nombre es obligatorio");
    }
    if((!parcial || d.descripcion!==undefined) && !d.descripcion?.trim()){
        errores.push("La descripción es obligatorio");
    }
     if (errores.length > 0) {
        throw solicitudInvalida('Error de validación en los datos de categoria', errores);
    }

}

export const listar = (filtro) => repo.listar(filtro);

export async function obtener(id) {
  const categoria = await repo.buscarPorId(id);
  if (!categoria) throw noEncontrado('Categoría');
  return categoria;
}

export async function crear(body) {
    validar(body);
    return repo.crear(soloCampos(body));
}

export async function actualizar(id, body) {
    await obtener(id);
    validar(body, true);
    return repo.actualizar(id, soloCampos(body));
}

export async function eliminar(id) {
    await obtener(id);
    return repo.eliminar(id);
}

