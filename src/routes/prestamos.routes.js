import { Router } from 'express';
import * as controller from '../controllers/prestamos.controller.js';
import { validarId } from '../middlewares/validar-id.middleware.js';
const router = Router();

router.get('/', controller.listar);
router.get('/:id', validarId, controller.obtener);
router.post('/', controller.crear);
router.put('/:id', validarId, controller.actualizar);
router.delete('/:id', validarId, controller.eliminar);
export default router;