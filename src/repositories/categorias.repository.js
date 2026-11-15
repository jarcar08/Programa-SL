import {Op} from 'sequelize';
import {Categoria} from '../models/index.js';
import { plano } from '../utils/plano.js';

export async function listar({q}={}) {
    const where = q ?{
        [Op.or]:[
            {nombre:{[Op.like]:`%${q}%`}},
        ]
    }:{};
    return(await Categoria.findAll({where, order:[['nombre','ASC']]})).map(plano)
}

// export async function contarLibros(id) {
//   return libros.filter((l) => l.categoria_id === id).length;
// }

export async function buscarPorId(id) {
    return plano(await Categoria.findByPk(id));
}

export async function crear(datos) {
    return plano(await Categoria.create(datos));
}

export async function actualizar(id, datos) {
    const categoria = await Categoria.findByPk(id);
    if(!categoria) return null;
    return plano(await categoria.update(datos));
}

export async function eliminar(id) {
    return (await Categoria.destroy({where:{id}}))> 0;
    
}
