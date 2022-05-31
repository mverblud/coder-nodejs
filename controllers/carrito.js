const { response, request } = require('express');

const Contenedor = require('../models/contenedor')
const contenedor = new Contenedor('carrito.json');

const obtenerCarritos = (req = request, res = response) => {

    const productos = contenedor.getAll();
    const total = productos.length;

    res.json({
        total,
        productos
    })

}

const obtenerCarrito = (req = request, res = response) => {

    const { id } = req.params;
    res.json(contenedor.getById(id))

}

const crearCarrito = (req, res = response) => {

    // obtengo del body solo lo que necesito.
    const { productos } = req.body;

    const carrito = {
        timestamp: new Date().getTime(),
        productos
    }

    res.status(201).json(contenedor.save(carrito))

}

const agregarProductoCarrito = (req, res = response) => {

    //  obtengo id de params
    const { id } = req.params;
    const { productos } = req.body;

    // obtengo el carrito
    const carritos = contenedor.getAll();

    if (carritos !== undefined) {

        carritos.forEach(carrito => {

            //  obtengo carrito al que tengo q agregarle el producto
            if (carrito.id === parseInt(id)) {

                productos.forEach(producto => {
                    carrito.productos.push(producto);
                })
            }

        });

        res.json(contenedor.update(carritos));

    } else {
        res.status(401).json({ msg: 'No existe el carrito' });
    }
}

const borrarCarrito = (req, res = response) => {

    //  obtengo id de params
    const { id } = req.params;
    res.json(contenedor.deleteById(id))

}

const borrarProductoCarrito = (req, res = response) => {

    //  obtengo id de params
    const { id, id_prod } = req.params;

    // obtengo el carrito
    const carritos = contenedor.getAll();

    if (carritos !== undefined) {

        carritos.forEach(carrito => {

            //  obtengo carrito al que tengo q quitarle el producto
            if (carrito.id === parseInt(id)) {

                const newCarritoProductos = carrito.productos.filter(producto => producto.id !== id_prod);
                console.log(newCarritoProductos);
                carrito.productos = newCarritoProductos
            }

        });

        res.json(contenedor.update(carritos));

    } else {
        res.status(401).json({ msg: 'No existe el carrito' });
    }

}

module.exports = {
    obtenerCarrito,
    obtenerCarritos,
    crearCarrito,
    agregarProductoCarrito,
    borrarCarrito,
    borrarProductoCarrito
}