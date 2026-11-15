import {Op} from 'sequelize';
import {Prestamo} from '../models/index.js';
import {plano} from '../utils/plano.js';

export async function listar({q}={}) {
    const where = q ?{
        [Op.or]:[
            {estado:{[Op.like]:`%${q}%`}},
        ]
    }:{};

    return(await Prestamo.findAll({where, order:[['fecha_prestamo','ASC']]})).map(plano)
}

export async function buscarPorId(id) {
    return plano(await Prestamo.findByPk(id));
}

export async function crear(datos) {
    return plano(await Prestamo.create(datos));
}

export async function actualizar(id, datos) {
    const prestamo = await Prestamo.findByPk(id);
    if(!prestamo) return null;
    return plano(await prestamo.update(datos));
}

export async function eliminar(id) {
    return (await Prestamo.destroy({where:{id}}))> 0; 
}