// Configura Express: middlewares globales, rutas y manejo de errores
import express from 'express';
import rutas from './routes/index.js';
import { rutaNoEncontrada, manejadorErrores } from './middlewares/error.middleware.js';
const app = express();
app.use(express.json());
app.use((req, res, next)=>{
    res.on('finish',()=>{
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    })
    next();
});
app.use('/api', rutas);
app.use(rutaNoEncontrada);
app.use(manejadorErrores);
export default app;



//import morgan from 'morgan';
//import rutas from './routes/index.js';
//app.use(cors());
//app.use(morgan('dev'));
