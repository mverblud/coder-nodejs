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
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const productos = contenedor.getAll();

    console.log(productos);

    // obtengo el index y luego actualizo
    const elementoIdx = productos.findIndex((e => e.id === parseInt(id)));

    console.log(elementoIdx);

    if (elementoIdx > -1) {
        // actualizo producto
        productos[elementoIdx].nombre = nombre;
        productos[elementoIdx].descripcion = descripcion;
        productos[elementoIdx].codigo = codigo;
        productos[elementoIdx].foto = foto;
        productos[elementoIdx].precio = precio;
        productos[elementoIdx].stock = stock;

        //  Grabo el archivo nuevamente
        res.json(contenedor.update(productos));
    } else {
        res.json({ msg: `El ${id} no existe` });
    }

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