import FirebaseClass from '../../contenedores/FirebaseClass.js';

export class FirebaseDBCarritos extends FirebaseClass{

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