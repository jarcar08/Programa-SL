import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Prestamo = sequelize.define(
    'Prestamo', 
    {
        id: {type: DataTypes.INTEGER, 
            primaryKey:true, 
            autoIncrement:true
            },


            socio_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
              },

        libro_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
             },

            fecha_prestamo:{
                type:DataTypes.DATE,
                allowNull:false,
                validate:{
                notNull:{msg:'El fecha de prestamo es obligatoria'},
                isDate:{msg:'Debe ser una fecha válida'},

                isAfter:{
                    args:['1450-01-01'],
                    msg:'la fecha no puede ser tan antigua'

                },
    
                 isBefore: {
                        args:[new Date().toISOString()],
                        msg:'La fecha no puede ser mayor a la fecha actual'    
                    }, 
                }
                },

                fecha_limite:{
                type:DataTypes.DATE,
                allowNull:false,
                validate:{
                notNull:{msg:'El fecha limite es obligatoria'},
                isDate:{msg:'Debe ser una fecha válida'},
                isAfter:{
                    args:['1450-01-01'],
                    msg:'la fecha no puede ser tan antigua'

                }
                }
                },

                fecha_devolucion:{
                type:DataTypes.DATE,
                allowNull:false,
                validate:{
                notNull:{msg:'El fecha de prestamo es obligatoria'},
                isDate:{msg:'Debe ser una fecha válida'},

                isAfter:{
                    args:['1450-01-01'],
                    msg:'la fecha no puede ser tan antigua'

                }
                }
                },

             estado:{
                type:DataTypes.ENUM('ACTIVO','DEVUELTO','VENCIDO'),
                allowNull:false,
                validate:{
                    notNull:{msg: 'el estado es obligatorio'},
                    notEmpty:{msg: 'el estado no puede estar vacio'}

                    }
            },
},
    {
        tableName:'prestamos',
    }

)