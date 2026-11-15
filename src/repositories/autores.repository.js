import {Op} from 'sequelize';
import {Autor} from '../models/index.js';
import {plano} from '../utils/plano.js';

export async function listar({q}={}) {
    const where = q ?{
        [Op.or]:[
            {nombres:{[Op.like]:`%${q}%`}},
            {apellidos:{[Op.like]:`%${q}%`}},
        ]
    }:{};

    return(await Autor.findAll({where, order:[['apellidos','ASC']]})).map(plano)
}

export async function buscarPorId(id) {
    return plano(await Autor.findByPk(id));
}

export async function crear(datos) {
    return plano(await Autor.create(datos));
}

export async function actualizar(id, datos) {
    const autor = await Autor.findByPk(id);
    if(!autor) return null;
    return plano(await autor.update(datos));
}

export async function eliminar(id) {
    return (await Autor.destroy({where:{id}}))> 0; 
}