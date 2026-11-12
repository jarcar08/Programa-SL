import 'dotenv/config';
import {probarConexion, cerrarConexion} from './src/config/db.js';
try {
    const info = await probarConexion();
    console.log('Conexion Mysql exitosa');
    console.table(info);
} catch (err) {
    console.error('No se pudo Conectar')
    console.error(`Error: ${err.code ?? '-'}`);
    console.error(`Mensaje: ${err.message}`);

}
finally{
    await cerrarConexion();
}