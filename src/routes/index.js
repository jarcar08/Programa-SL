// Punto único donde se registran todos los recursos de la API
import { Router } from 'express';
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
});
//router.use('/libros', librosRoutes);
//router.use('/categorias', categoriasRoutes);
//router.use('/socios', sociosRoutes);
