import {Op} from 'sequelize';
import { Libro } from '../models/index.js';
import { plano } from '../utils/plano.js';

export async function listar({q}={}) {
    const where = q ?{
        [Op.or]:[
            {isbn:{[Op.like]:`%${q}%`}},
            {titulo:{[Op.like]:`%${q}%`}},
        ]
    }:{};

    return(await Libro.findAll({where, order:[['anio','ASC']]})).map(plano)
}

export async function buscarPorId(id) {
  return plano(await Libro.findByPk(id));
}

export async function buscarPorIsbn(campo, valor, excluirId = null) {
    // Si el valor no está definido o es nulo, evitamos la consulta para que no falle Sequelize
    if (valor === undefined || valor === null) {
        return null; 
    }

    const where = { [campo]: valor };

    // Si estás actualizando un registro, excluye su propio ID de la búsqueda
    if (excluirId) {
        where.id = { [Op.ne]: excluirId };
    }

    const registro = await Libro.findOne({ where });
    return registro ? plano(registro) : null;
}

export async function crear(datos) {
  return plano(await Libro.create(datos));
}

export async function actualizar(id, datos) {
  const libro = await Libro.findByPk(id);
  if(!libro) return null;
  return plano(await libro.update(datos));
}

export async function eliminar(id) {
  return (await Libro.destroy({where:{id}}))>0;
}
