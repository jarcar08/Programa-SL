import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Socio = sequelize.define(
    'Socio', 
    {
        id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
            },
            dni:{
                type:DataTypes.CHAR(8),
                allowNull:false,
                unique:true,
                validate:{
                    notNull:{msg: 'el dni es obligatorio'},
                    notEmpty:{msg: 'el dni no puede estar vacio'}
            }
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

            email:{
                type:DataTypes.STRING(80),
                allowNull:true,
                validate:{
                    //notNull:{msg: 'el email es obligatorio'},
                    //notEmpty:{msg: 'el email no puede estar vacio'}

                    }
            },

             telefono:{
                type:DataTypes.STRING(15),
                allowNull:true,
                validate:{
                    //notNull:{msg: 'el telefono es obligatorio'},
                    //notEmpty:{msg: 'el telefono no puede estar vacio'}

                    }
            },

             tipo:{
                type:DataTypes.ENUM('ESTUDIANTE','DOCENTE','ADMINISTRATIVO'),
                allowNull:false,
                validate:{
                    notNull:{msg: 'el tipo es obligatorio'},
                    notEmpty:{msg: 'el tipo no puede estar vacio'}

                    }
            },

             activo:{
                type:DataTypes.BOOLEAN,
                allowNull:false,
                defaultValue:true,
                validate:{
                    notNull:{msg: 'el estado es obligatorio'},
                    }
            },
},
    {
        tableName:'socios',
    }

)