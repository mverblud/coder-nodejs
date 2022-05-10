const { Router } = require('express');
const { obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        crearProducto, 
        borrarProducto } = require('../controllers/productos');

const router = Router();

router.get('/',       obtenerProductos);
router.get('/:id',    obtenerProducto);
router.put('/:id',    actualizarProducto);
router.post('/',      crearProducto);
router.delete('/:id', borrarProducto);

module.exports = router;