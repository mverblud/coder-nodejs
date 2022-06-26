import { Router } from 'express';
import { carritoDao as api } from '../daos/index.js';

const router = new Router();

router.get('/', async (req, res) => {

    //  Paginado
    const { limite, desde } = req.query;

    try {
        const { total, objects: carritos } = await api.getAll(limite, desde);
        res.json({
            total,
            carritos
        });
    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req, res) => {

    try {

        const createCarrito = await api.create(req.body);
        res.json(createCarrito);

    } catch (error) {
        console.log('error route', error);
    }

})

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const deleteCarrito = await api.deleteById(id);
        res.json(deleteCarrito);
    } catch (error) {
        console.log(error);
    }

})

router.put('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const updateCarrito = await api.updateById(id, req.body);
        res.json(updateCarrito);
    } catch (error) {
        console.log(error);
    }

})

export default router;