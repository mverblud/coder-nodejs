import dotenv from 'dotenv';
dotenv.config();

let productosDao;

    switch (process.env.DB_NAME) {

        case 'mongoDB':

            import('./productos/MongoDBProductos.js').then(({ MongoDBProductos }) => {
                productosDao = new MongoDBProductos();
            });

            break;
            
        default:
            console.log('Esta en default');
            break;
    }


export {productosDao}