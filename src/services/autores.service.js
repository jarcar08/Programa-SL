import * as repo from '../repositories/autores.repository.js';
import {noEncontrado, solicitudInvalida} from '../utils/http-error.js';
const CAMPOS=['nombres', 'apellidos', 'nacionalidad'];
const soloCampos = (d) =>Object.fromEntries(Object.entries(d).filter(([k])=>CAMPOS.includes(k)));

function validar(d, parcial = false){
    const errores = [];
    if((!parcial || d.nombres!==undefined) && !d.nombres?.trim())
        errores.push("El campo nombres es obligatorio");
    if((!parcial || d.apellidos!==undefined) && !d.apellidos?.trim())
        errores.push("El campo apellidos es obligatorio");
}

export const listar = (filtro) =>repo.listar(filtro);

export async function obtener(id) {
    const autor = await repo.buscarPorId(id);
    if(!autor) throw noEncontrado('Autor');
    return autor;
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