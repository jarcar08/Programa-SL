import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Categoria = sequelize.define(
    'Categoria', 
    {
        id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
            },
            nombre:{
                type:DataTypes.STRING(80),
                allowNull:false,
                validate:{
                    notNull:{msg: 'el nombre es obligatorio'},
                    notEmpty:{msg: 'el nombre no puede estar vacio'}

            }
    },
    descripcion: {type:DataTypes.STRING(255), allowNull:true}
},
    {
        tableName:'categorias'
    }

)
