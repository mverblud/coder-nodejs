import MongoClass from '../../contenedores/MongoClass.js';
import productoModel from '../../models/producto.js'

export class MongoDBProductos extends MongoClass {

    constructor() {
        super(productoModel)
    }

}