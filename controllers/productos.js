const { response, request } = require('express');

const Contenedor = require('../models/contenedor')
const contenedor = new Contenedor();

const obtenerProductos = async (req = request, res = response) => {

    const productos = contenedor.getAll();
    const total = productos.length;

    res.json({
        total,
        productos
    })

}

const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;
    res.json(contenedor.getById(id))

}

const crearProducto = async (req, res = response) => {

    // obtengo del body solo lo que necesito
    const { nombre, precio, imagen } = req.body;

    /* REVISAR CUANDO INVOCO DEL INDEX.HTML LLEGA TODO VACIO*/

    const producto = {
        title: nombre,
        price: precio,
        thumbnail: imagen
    }

    res.status(201).json(contenedor.save(producto))

}

const actualizarProducto = async (req, res = response) => {

    //  obtengo id de params
    const { id } = req.params;
    // obtengo del body solo lo que necesito
    const body = req.body;
    res.json(contenedor.updateById(id, body))
}

const borrarProducto = async (req, res = response) => {

    //  obtengo id de params
    const { id } = req.params;
    res.json(contenedor.deleteById(id))

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}