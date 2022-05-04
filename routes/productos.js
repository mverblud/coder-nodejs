const { Router } = require('express');
const Contenedor = require('../clase4/contenedor')

const contenedor = new Contenedor('./productos.json');
const router = Router();

/* const productoRandom = () => {

    const productos = contenedor.getAll();
    const idRandom = Math.floor(Math.random() * (productos.length - 1)) + 1;
    return contenedor.getById(idRandom);

router.get('/random', (req, res) => {
    res.json(productoRandom())
});
} */

router.get('/', (req, res) => {
    res.json(contenedor.getAll())
});

router.get('/:id', (req, res) => {

    //  obtengo id de params
    const { id } = req.params;
    res.json(contenedor.getById(id))
});

router.put('/:id', (req, res) => {
    //  obtengo id de params
    const { id } = req.params;
    // obtengo del body solo lo que necesito
    const body = req.body;
    res.json(contenedor.updateById(id,body))
});

router.post('/', (req, res) => {

    // obtengo del body solo lo que necesito
    const { nombre, precio, imagen } = req.body;
    
    /* REVISAR CUANDO INVOCO DEL INDEX.HTML LLEGA TODO VACIO*/

    const producto = {
        title: nombre,
        price: precio,
        thumbnail: imagen
    }

    res.status(201).json(contenedor.save(producto))
});

router.delete('/:id', (req, res) => {

    //  obtengo id de params
    const { id } = req.params;
    res.json(contenedor.deleteById(id))
});



module.exports = router;