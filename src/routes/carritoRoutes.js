import { Router } from 'express';
import { actualizarCarrito, crearCarrito, eliminarCarrito, obtenerCarritos,  } from '../controllers/carrito.js'

const router = new Router();

router.get('/', obtenerCarritos)
router.post('/', crearCarrito)
router.delete('/:id', eliminarCarrito)
router.put('/:id', actualizarCarrito)

export default router;