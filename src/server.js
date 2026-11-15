import app from './app.js';
import {env} from './config/env.js';
import { probarConexion } from './config/db.js';
try {
    const info = await probarConexion();
    console.log(`MySql Conectado: ${info.db} como ${info.usuario}`);
} catch (err) {
    console.error(`No se pudo conectar a MySql`);
    console.error(err.code, err.message);
}

app.listen(env.port,()=>{
    console.log(`API Biblioteca UNU en http://localhost:${env.port}/api`)
});