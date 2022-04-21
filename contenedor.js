const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {

        this.fileName = nombreArchivo;
        this.contenido = [];

    //  obtengo el contenido del archivo
        this.leerArchivo();

    }

    async leerArchivo() {

        try {

            if (fs.existsSync(this.fileName)) {
                const data = await fs.promises.readFile(this.fileName, 'utf-8');
                const dataJson = JSON.parse(data);
                this.contenido.push(dataJson);
            }

        } catch (error) {
            console.log('Error al leer el archivo', error);
        }
    }

    async escribirArchivo(contenido) {

        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(contenido))
        } catch (error) {
            console.log('Error al escribir el archivo', error);
        }
    }

    getAll() {
        this.leerArchivo().then(data => {
            console.log(data)
        });
    }

    getById(id) {

        let producto = {}
        producto = this.contenido.find(element => element.id == id);
        if (!producto) {
            producto = null
        }
        return producto
    }

    async save(producto) {

        //  obtengo ultimo id + 1
        const id = this.contenido.length + 1;
        producto["id"] = id;
        //  actualizo el contenido con el nuevo producto
        this.contenido.push(producto);
        //  Grabo el archivo nuevamente
        await this.escribirArchivo(this.contenido);

        return `El id del objeto añadido es ${id}`
    }

    deleteById(id) {

        const contenidoNuevo = this.contenido.filter(element => element.id !== id)
        this.escribirArchivo(contenidoNuevo);

    }

    async deleteAll() {
        const contentido = [];
        this.contenido = contentido
        this.escribirArchivo(this.contenido);
    }

}

module.exports = Contenedor