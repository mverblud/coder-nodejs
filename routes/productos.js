const { Router } = require('express');
const Contenedor = require('../clase4/contenedor')

const contenedor = new Contenedor('./productos.json');
const router = Router();

const productoRandom = () => {

    const productos = contenedor.getAll();
    const idRandom = Math.floor(Math.random() * (productos.length - 1)) + 1;
    return contenedor.getById(idRandom);
}

// Desafio Clase 6
/* router.get('/', (req, res) => {
    res.json(contenedor.getAll())
});

router.get('/random', (req, res) => {
    res.json(productoRandom())
}); */

router.post('/', (req, res) => {

    const body = req.body;
    console.log(body);

    res.json(body)
});

module.exports = router;