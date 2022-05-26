const { response, request } = require('express');

const Contenedor = require('../models/contenedor')
const contenedor = new Contenedor('productos.json');

const obtenerProductos = (req = request, res = response) => {

    const productos = contenedor.getAll();
    const total = productos.length;

    res.json({
        total,
        productos
    })

}

const obtenerProducto = (req = request, res = response) => {

    const { id } = req.params;
    res.json(contenedor.getById(id))

}

const crearProducto = (req, res = response) => {

    // obtengo del body solo lo que necesito.
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const producto = {
        timestamp: new Date().getTime(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    }

    res.status(201).json(contenedor.save(producto))

}

const actualizarProducto = (req, res = response) => {

    //  obtengo id de params
    const { id } = req.params;
    
    res.json(contenedor.updateById(id, req.body))
}

const borrarProducto = (req, res = response) => {

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