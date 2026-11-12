import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Libro_Autor = sequelize.define(
    'Libro_Autor', 
    {
        libro_id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:false
            },

             autor_id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:false
            },

        },

    {
        tableName:'libro_autor'
    }

)
