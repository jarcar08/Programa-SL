import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Autor = sequelize.define(
    'Autor', 
    {
        id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
            },
            nombres:{
                type:DataTypes.STRING(80),
                allowNull:false,
                validate:{
                    notNull:{msg: 'el nombre es obligatorio'},
                    notEmpty:{msg: 'el nombre no puede estar vacio'}

            }
    },

    apellidos:{
                type:DataTypes.STRING(80),
                allowNull:false,
                validate:{
                    notNull:{msg: 'el apellido es obligatorio'},
                    notEmpty:{msg: 'el apellido no puede estar vacio'}

            }
    },
    
    nacionalidad: {type:DataTypes.STRING(255), allowNull:true}
},
    {
        tableName:'autores'
    }

)
