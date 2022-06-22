import { Router } from 'express';
import { productosDao as api } from '../daos/index.js';

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const allProductos = await api.getAll();
        res.json(allProductos);
    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req, res) => {
    try {
        const createProducto = await api.create(req.body);
        res.json(createProducto);
    } catch (error) {
        console.log(error);
    }

})

router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateProducto = await api.updateById(id, req.body);
        res.json(updateProducto);
    } catch (error) {
        console.log(error);
    }

})

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const deleteProducto = await api.deleteById(id);
        res.json(deleteProducto);
    } catch (error) {
        console.log(error);
    }

})

export default router;