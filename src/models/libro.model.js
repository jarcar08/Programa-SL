import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Libro = sequelize.define(
    'Libro', 
    {
        id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
            },
            isbn:{
                type:DataTypes.STRING(80),
                allowNull:false,
                validate:{
                    notNull:{msg: 'el isbn es obligatorio'},
                    notEmpty:{msg: 'el isbn no puede estar vacio'}
            }
    },
    titulo: {type:DataTypes.STRING(255), allowNull:true},


// anio:{
//     type:DataTypes.SMALLINT,
//     allowNull:false,
//     validate:{
//         msg:'El año es obligatorio'
//     },
//     IsInt: {
//         msg:'El año debe ser un numero entero'    
//     },
// },

anio: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                notNull: { msg: 'El año es obligatorio' },
                isInt: { msg: 'El año debe ser un número entero' }
            }
        },

categoria_id: {
    type:DataTypes.INTEGER,
    allowNull:false
},

stock_total:{
    type:DataTypes.INTEGER,
    allowNull:false,
    default:1,
    validate:{
        min:{args:[0],msg:'stock_total no puede ser negativo'}
    }
},

stock_disponible:{
    type:DataTypes.INTEGER,
    allowNull:false,
    default:1,
    validate:{
        min:{args:[0],msg:'stock_disponible no puede ser negativo'}
    }
}

},
    {
        tableName:'libros',
        validate:{
            stockValido(){
                if(this.stock_disponible>this.stock_total){
                    throw new Error('El stock disponible no puede ser mayor que el stock total')
                }

            }
        }
    }

)