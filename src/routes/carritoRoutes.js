import { Router } from 'express';
import { carritoDao as api } from '../daos/index.js';

const router = new Router();

router.get('/', async (req, res) => {
    try {
        const allCarritos = await api.getAll();
        res.json(allCarritos);
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

export default router;