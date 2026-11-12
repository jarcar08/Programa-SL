import {Sequelize, QueryTypes} from 'sequelize';
import mysql from 'mysql2/promise';
import{env} from './env.js'


/*console.log('Configuración MySQL:');*/

/*console.log({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    database: env.db.database,
    passwordConfigurada: env.db.password.length > 0,
    connectionLimit: env.db.connectionLimit
});*/


export const sequelize = new Sequelize(
    env.db.database,
    env.db.user,
    env.db.password,
    {
        host: env.db.host,
        port: env.db.port,
        dialect:'mysql',
        logging: env.db.logging ? (sql) => console.log(`[SQL] ${sql}`):false,
        pool: { max: env.db.connectionLimit, min: 0, acquire: 30000, idle:10000},
        define:{
            freezeTableName: true,
            timestamps: false
        },
        dialectOptions: {decimalNumbers: true }
    }
)

export const pool = mysql.createPool({
    ...env.db,
    waitForConnections: true,
    queueLimit:0,
    dateStrings:true,
    namedPlaceholders:true
});

export async function probarConexion() {

    await sequelize.authenticate();
    const [info] = await sequelize.query('SELECT DATABASE() AS bd,'+
             'CURRENT_USER() as usuario, VERSION() as version', 
             {type: QueryTypes.SELECT});
  return info;
}

export const cerrarConexion = ()=> sequelize.close();

/*export async function cerrarPool() {
    await pool.end();
}*/