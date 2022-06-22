import MongoClass from '../../contenedores/MongoClass.js';

export class MongoDBProductos extends MongoClass{

    constructor(){
        super('productos',{
            nombre: {
                type: String,
                required: [true, 'El Nombre es obligatorio']
            },
            descripcion: { type: String },
            codigo:{ type: String },
            img: [{
                type: String,
                default: ''
            }],
            precio: {
                type: Number,
                default: 0
            },
            stock: {
                type: Number,
                default: 0
            },            
        })
    }

}