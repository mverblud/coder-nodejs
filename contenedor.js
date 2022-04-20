const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {

        this.fileName = nombreArchivo;
        this.contenido = [];

    //  obtengo el contenido del archivo
    //    this.leerArchivo();

    }

    async leerArchivo() {

        try {

            if (fs.existsSync(this.fileName)) {
                const data = await fs.promises.readFile(this.fileName,'utf-8');
                const dataJson = JSON.parse(data);
                this.contenido.push(dataJson);
            }else{
                this.escribirArchivo();
            }

        } catch (error) {
            console.log('Error al leer el archivo', error);
        }
    }

    async escribirArchivo() {

        try {
            console.log('contenido en escribir archivo',this.contenido);
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.contenido))
        } catch (error) {
            console.log('Error al escribir el archivo', error);
        }
    }

    getAll() {
        return this.contenido;
    }

    getById(id) {

        let producto = {}
        producto = this.contenido.find(element => element.id == id);
        if (!producto) {
            producto = null
        }
        return producto
    }

    save(producto) {

        console.log('contenido',this.contenido);

        //  obtengo ultimo id + 1
        const id = this.contenido.length + 1;
        producto["id"] = id;
        console.log('producto',producto);
        //  actualizo el contenido con el nuevo producto
        this.contenido.push(producto);
        console.log('contenido Producto',this.contenido);
        //  Grabo el archivo nuevamente
        this.escribirArchivo();

        return `El id del objeto añadido es ${id}`
    }

    deleteById(id) {

        console.log('contenido actual',this.contenido);

        let contenidoNuevo = []
        contenidoNuevo = this.contenido.filter(element => element.id !== id)
        console.log('nuevo contenido',contenidoNuevo);

        this.contenido = [];
        this.contenido = contenidoNuevo;
        console.log('contenido actual',this.contenido);

        this.escribirArchivo();
    }

    async deleteAll() {
        this.contentido = this.contenido.splice(0, this.contenido.length)
        this.escribirArchivo();
    }

}

module.exports = Contenedor