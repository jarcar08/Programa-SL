import { Op } from 'sequelize';
import { Socio } from '../models/index.js';
import { plano } from '../utils/plano.js';

export async function listar({q}={}) {
    const where = q ?{
        [Op.or]:[
            {nombres:{[Op.like]:`%${q}%`}},
            {apellidos:{[Op.like]:`%${q}%`}},
        ]
    }:{};

    return(await Socio.findAll({where, order:[['apellidos','ASC']]})).map(plano)
}

export async function buscarPorId(id) {
    return plano(await Socio.findByPk(id));
}

export async function crear(datos) {
    return plano(await Socio.create(datos));
}

export async function buscarPorCampo(campo, valor, excluirId = null) {
    const where = { [campo]: valor };

    // Si estás actualizando un registro, excluye su propio ID de la búsqueda
    if (excluirId) {
        where.id = { [Op.ne]: excluirId };
    }

    const registro = await Socio.findOne({ where });
    return registro ? plano(registro) : null;
}


export async function actualizar(id, datos) {
    const socio = await Socio.findByPk(id);
    if(!socio) return null;
    return plano(await socio.update(datos));
}

export async function eliminar(id) {
    return (await Socio.destroy({where:{id}}))> 0; 
}
