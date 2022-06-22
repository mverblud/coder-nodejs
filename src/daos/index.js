import dotenv from 'dotenv';
dotenv.config();

let productosDao;
let carritoDao;

    switch (process.env.DB_NAME) {

        case 'mongoDB':

            import('./productos/MongoDBProductos.js').then(({ MongoDBProductos }) => {
                productosDao = new MongoDBProductos();
            });

            import('./carrito/MongoDBCarritos.js').then(({ MongoDBCarritos }) => {
                carritoDao = new MongoDBCarritos();
            });

            break;

        case 'firebaseDB':
        
            import('./productos/FirebaseDBProductos.js').then(({ FirebaseDBProductos }) => {
                productosDao = new FirebaseDBProductos();
            });

            import('./carrito/FirebaseDBCarritos.js').then(({ FirebaseDBCarritos }) => {
                carritoDao = new FirebaseDBCarritos();
            });

            break;
        default:
            console.log('Esta en default');
            break;
    }


export {productosDao,carritoDao}