import MongoClass from '../../contenedores/MongoClass.js';
import carritoModel from '../../models/carrito.js';

export class MongoDBCarritos extends MongoClass{

    constructor(){
        super(carritoModel)
    }

}