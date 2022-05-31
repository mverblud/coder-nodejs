const { Router } = require('express');
const { obtenerCarrito, obtenerCarritos, crearCarrito, agregarProductoCarrito, borrarCarrito, borrarProductoCarrito } = require('../controllers/carrito');
const router = Router();

router.get('/',    obtenerCarritos);
router.get('/:id', obtenerCarrito);
router.post('/', crearCarrito);
router.post('/:id',   agregarProductoCarrito);
router.delete('/:id', borrarCarrito);
router.delete('/:id/:id_prod', borrarProductoCarrito);

module.exports = router;