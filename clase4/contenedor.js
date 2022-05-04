const fs = require('fs');

// Clase donde se realiza lectura por unica vez cuando se instancia la clase.

class Contenedor {

    constructor(nombreArchivo) {

        this.fileName = nombreArchivo;
        this.contenido = [];

        //  obtengo el contenido del archivo al instanciar la clase
        this.leerArchivo()

    }

    leerArchivo() {

        try {

            if (fs.existsSync(this.fileName)) {
                const data = fs.readFileSync(this.fileName, 'utf-8');
                this.contenido = JSON.parse(data);
            }

        } catch (error) {
            console.log('Error al leer el archivo', error);
        }
    }

    escribirArchivo(contenido) {

        try {
            fs.writeFileSync(this.fileName, JSON.stringify(contenido))
        } catch (error) {
            console.log('Error al escribir el archivo', error);
        }
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
        //  Grabo el archivo nuevamente
        this.escribirArchivo(this.contenido);
        return { id };
    }

    updateById(id, body) {

        const { nombre, precio, imagen } = body;

        //  obtengo el index y luego actualizo
        const elementoIdx = this.contenido.findIndex((obj => obj.id == id));

        this.contenido[elementoIdx].title = nombre;
        this.contenido[elementoIdx].price = precio;
        this.contenido[elementoIdx].thumbnail = imagen;

        this.escribirArchivo(this.contenido);

        return { msg: `${id} Ha sido actualizado` };

    }

    deleteById(id) {

        const contenidoNuevo = this.contenido.filter(element => element.id !== parseInt(id))
        this.escribirArchivo(contenidoNuevo);
        return { msg: `${id} Ha sido Eliminado` };
    }

    deleteAll() {
        const contentido = [];
        this.contenido = contentido
        this.escribirArchivo(this.contenido);
    }

}

module.exports = Contenedor