class Contenedor {

    constructor() {
        this.contenido = [];
    }

    getAll() {
        return this.contenido;
    }

    getById(id) {

        const producto = this.contenido.find(element => element.id == id);
        if (producto) {
            return producto
        } else { 
            return {error: 'producto no encontrado'}
        }

    }

    save(producto) {

        //  obtengo ultimo id + 1
        const id = this.contenido.length + 1;
        producto["id"] = id;
        //  actualizo el contenido con el nuevo producto
        this.contenido.push(producto);
        return { id };
    }

    updateById(id, body) {

        const { nombre, precio, imagen } = body;

        //  obtengo el index y luego actualizo
        const elementoIdx = this.contenido.findIndex((obj => obj.id == id));

        this.contenido[elementoIdx].title = nombre;
        this.contenido[elementoIdx].price = precio;
        this.contenido[elementoIdx].thumbnail = imagen;

        return { msg: `${id} Ha sido actualizado` };

    }

    deleteById(id) {

        const contenidoNuevo = this.contenido.filter(element => element.id !== parseInt(id));
        this.contenido = contenidoNuevo;
        return { msg: `${id} Ha sido Eliminado` };
    }

    deleteAll() {
        const contentido = [];
        this.contenido = contentido
    }

}

module.exports = Contenedor