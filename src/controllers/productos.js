import { productosDao as api } from '../daos/index.js';
import logger from "../logger.js";

export const obtenerProductos = async (req, res) => {
    //  Paginado
    const { limite, desde } = req.query;

    try {
        const { total, objects: productos } = await api.getAll(limite, desde);
        res.json({
            total,
            productos
        });
    } catch (error) {
        console.log('Error Route', error);
        logger.warn(error);
    }
}

export const crearProducto = async (req, res) => {
    try {
        const createProducto = await api.create(req.body);
        res.json(createProducto);
    } catch (error) {
        console.log(error);
        logger.warn(error);
    }
}

export const actualizarProducto =  async (req, res) => {

    const { id } = req.params;

    try {
        const updateProducto = await api.updateById(id, req.body);
        res.json(updateProducto);
    } catch (error) {
        console.log(error);
        logger.warn(error);
    }
}

export const eliminarProducto = async (req, res) => {

    const { id } = req.params;

    try {
        const deleteProducto = await api.deleteById(id);
        res.json(deleteProducto);
    } catch (error) {
        console.log(error);
        logger.warn(error);
    }

}