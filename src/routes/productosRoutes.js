import { Router } from 'express';
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos } from '../controllers/productos.js';

const router = new Router();

router.get('/', obtenerProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;