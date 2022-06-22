
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

const dbConnection = async () => {

    try {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log('conectado a firebase');
    } catch (error) {
        console.log(error);
    }

}

dbConnection();

const CRUD = async () => {
    const db = admin.firestore();
    const usuariosCol = db.collection('usuarios');

    try {

        await usuariosCol.doc().create({ nombre: 'Marcos', apellido: 'Gomez' });

    } catch (error) {
        console.log(error);
    }

}

CRUD();
