const fs = require('fs');

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

        const contenido = this.contenido.find(element => element.id == id);
        return contenido ? contenido : { error: 'no se encontro el id' };

    }

    save(contenido) {

        //  obtengo ultimo id + 1
        const id = this.contenido.length + 1;
        contenido["id"] = id;

        //  actualizo el contenido con el nuevo producto
        this.contenido.push(contenido);

        //  Grabo el archivo nuevamente
        this.escribirArchivo(this.contenido);
        return { id };
    }

    updateById(id, body) {

        const { nombre, descripcion, codigo, foto, precio, stock } = body;

        // obtengo el index y luego actualizo
        const elementoIdx = this.contenido.findIndex((obj => obj.id === parseInt(id)));

        if (elementoIdx > 0) {
            // actualizo producto
            this.contenido[elementoIdx].nombre = nombre;
            this.contenido[elementoIdx].descripcion = descripcion;
            this.contenido[elementoIdx].codigo = codigo;
            this.contenido[elementoIdx].foto = foto;
            this.contenido[elementoIdx].precio = precio;
            this.contenido[elementoIdx].stock = stock;

            //  Grabo el archivo nuevamente
            this.escribirArchivo(this.contenido);
        }

        return elementoIdx > 0 ? { msg: `${id} Ha sido actualizado` } : { msg: `${id} No existe` };
    }

    update(contenidoNuevo) {

        //  Grabo el archivo nuevamente
        this.escribirArchivo(contenidoNuevo);
        return { msg: `Ha sido actualizado` };
    }

    deleteById(id) {

        //  Verifico si existe
        const encontre = this.contenido.find(e => e.id === parseInt(id));
        if (encontre === undefined) {
            return { msg: `${id} No existe` };
        }

        //  Si existe lo borro
        const contenidoNuevo = this.contenido.filter(element => element.id !== parseInt(id));
        this.escribirArchivo(contenidoNuevo);
        return { msg: `${id} Ha sido Eliminado` };
    }

    deleteAll() {
        this.escribirArchivo([]);
    }

}

module.exports = Contenedor