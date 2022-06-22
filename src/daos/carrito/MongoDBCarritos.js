import MongoClass from '../../contenedores/MongoClass.js';

export class MongoDBCarritos extends MongoClass{

    constructor(){
        super('carritos',{
            timestamp: {
                type: Date,
                default : Date.now 
            },
            productos: [{
                type: Array
            }],         
        })
    }

}