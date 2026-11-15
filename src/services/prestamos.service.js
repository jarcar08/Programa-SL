import * as repo from '../repositories/prestamo.repository.js';
import {noEncontrado, solicitudInvalida} from '../utils/http-error.js';
const CAMPOS=['socio_id', 'libro_id', 'fecha_prestamo', 'fecha_limite', 'fecha_devolucion', 'estado'];
const soloCampos = (d) =>Object.fromEntries(Object.entries(d).filter(([k])=>CAMPOS.includes(k)));

// function validar(d, parcial = false){
//     const errores = [];
//     if((!parcial || d.nombres!==undefined) && !d.nombres?.trim())
//         errores.push("El campo nombres es obligatorio");
//     if((!parcial || d.apellidos!==undefined) && !d.apellidos?.trim())
//         errores.push("El campo apellidos es obligatorio");
// }


// function validar(d, parcial = false){
//     if (!d || typeof d !== 'object') {
//         throw solicitudInvalida('El cuerpo de la petición es inválido o está vacío');
//     }

//     const errores = [];
//     if((!parcial || d.socio_id!==undefined) && !d.socio_id?.trim()){
//         errores.push("El campo nombres es obligatorio");
//     }
//     if((!parcial || d.libro_id!==undefined) && !d.libro_id?.trim()){
//         errores.push("El campo apellidos es obligatorio");
//     }
//      if (errores.length > 0) {
//         throw solicitudInvalida('Error de validación en los datos del autor', errores);
//     }

// }

function validar(d, parcial = false) {
    if (!d || typeof d !== 'object') {
        throw solicitudInvalida('El cuerpo de la petición es inválido o está vacío');
    }

    const errores = [];

    // Validar socio_id
    if (!parcial || d.socio_id !== undefined) {
        const socioIdNum = Number(d.socio_id);
        if (!d.socio_id || !Number.isInteger(socioIdNum) || socioIdNum <= 0) {
            errores.push("El campo socio_id es obligatorio y debe ser un número entero válido");
        }
    }

    // Validar libro_id
    if (!parcial || d.libro_id !== undefined) {
        const libroIdNum = Number(d.libro_id);
        if (!d.libro_id || !Number.isInteger(libroIdNum) || libroIdNum <= 0) {
            errores.push("El campo libro_id es obligatorio y debe ser un número entero válido");
        }
    }

    if (errores.length > 0) {
        throw solicitudInvalida('Error de validación en los datos del préstamo', errores);
    }
}

export const listar = (filtro) =>repo.listar(filtro);

export async function obtener(id) {
    const prestamo = await repo.buscarPorId(id);
    if(!prestamo) throw noEncontrado('Prestamo');
    return prestamo;
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