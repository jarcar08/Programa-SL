// Punto único donde se registran todos los recursos de la API
import { Router } from 'express';
import autoresRoutes from './autores.routes.js';
import categoriaRoutes from './categorias.routes.js';
import socioRoutes from './socios.routes.js';
import libroRoutes from './libros.routes.js';
import prestamoRoutes from './prestamos.routes.js';
import { probarConexion } from '../config/db.js';

const router = Router();

router.get('/health', async (req, res) => {
  try {
    const infoDb = await probarConexion();
    
    res.status(200).json({
      estado: 'ok',
      servidor: 'activo',
      baseDatos: {
        conectado: true,
        nombre: infoDb.db,
        usuario: infoDb.usuario
      },
      fecha: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      estado: 'error',
      servidor: 'activo',
      baseDatos: {
        conectado: false,
        detalle: error.message
      },
      fecha: new Date().toISOString()
    });
  }
});

router.use('/autores', autoresRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/socios', socioRoutes);
router.use('/libros', libroRoutes);
router.use('/prestamos',prestamoRoutes);


export default router;




// Punto único donde se registran todos los recursos de la API
/*import { Router } from 'express';
import autoresRoutes from './autores.routes.js';

const router = Router();
router.use('/autores', autoresRoutes);

export default router;

router.get('/health', (req, res) => {
  res.json({
    estado: 'ok',
    origenDatos: 'memoria (arrays)',
    fecha: new Date().toISOString()
  });
});*/
//router.use('/libros', librosRoutes);
//router.use('/categorias', categoriasRoutes);
//router.use('/socios', sociosRoutes);
