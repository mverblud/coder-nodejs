import admin from "firebase-admin";
//import serviceAccount from './cursocodenode-firebase-adminsdk-s436i-de2bc2b4d7.json';

const dbConnection = async () => {

    try {

        admin.initializeApp({
            credential: admin.credential.cert({
                "type": "service_account",
                "project_id": "cursocodenode",
                "private_key_id": "de2bc2b4d765410aa06c6b1fc4aab29b3851fe7d",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgPohXqIrd2LS7\nVJLDZDLrnMC1lNr4klLo9TWdAOewUhQxwuIHmiOC/JP64O+oI7s/6qtNzNUPET1S\nsW10guuDFbyQKZMXzg+xZbNQHjWEbRBuLaTZh7K5YQM0iVXZb2w7e9ppjhYZx/fv\nGr38DFFPvseMxARtbVk49P0WsKG8dkhSsvcyVNvkREJv0aJNNrsgSYaap3nEV3Ie\nKKZrfKkHPNymXvBViVz2cXD07sj5w1QmleuuOZ/qp0zsG1Em2vO6Stfb00XFDSp1\nVmj2DErQ6aN3W20GPNd/0/1OUm627K581cx5bxhaX6mt2E9mUg0cRVF757m2cAtN\nNYL0ZtexAgMBAAECggEACGZJ53VV5PMZ603C2j8gadNAeVdpj60KHlVtBtlX/wfx\nX18hkKT/69yifbUQ6mHoQNUn9IKV1STRVg3KVUvAHvQLUPUVtZW6NcFi+D8hbw6X\ncnZoOd5g3fEZ1HfJIkYPrky4hNgAe5e8xuqKr5cV2/WqoNsIysExTzZcso223onC\nYNbca+N8hGlpvf4K3kSNqrDuuByNUjvqZeZh6BZ45xn3ZIMJsCgQZDojfbtbFCU3\nYPZiJXke7QhPygE1HderaLHg3hpwk12Y/5N423DwFWeKL/v4NQEAwbXLyyHd5qHd\nuJQtiRMz1EhpSkvmulq8C3sRgnSW0zfl6ofpK9g1LwKBgQD+7lvHHH9NhMpGKMG1\nAv8C8qVcrT3ZQUr/IOSFxVU1E7oMkMSY6T1rtBkQssFgrdhKuBq4EM0UnrkBpv9j\nYvpcMqtoPQNMuHV9X0Vgt5L6HPhfpyYfaU0gYdDFkpeOEuf7F/vdIOkTfRvViz7g\nVKAhTXMl6wGsFRzi/3dFoOF32wKBgQDhLzwrH4ZcuhtL/sfzYCSSoL4+gGPdFqfI\nrYvlKHg9Q5AKRvQyNUcj7aDvWYkcOKEqnCpEDfz4gDRbVNs5qU6jNNN3ngzkDmY+\nBd7uQGg6Oo9v1ggg02clQPWpEBQ+2BSVqU6VBtyVsvPjJdReg3AlUMO14QNlt9gj\n7mBCLv/aYwKBgQDGlg9Qb9aLIGIhfSZIR2k3dqVyKFIBp2cwjwL1Yd8aVZ+cojlD\nlI2QFN9hrp4NHd9bdUb7E7tt0Kb1ro1LcpLst1vm+4BSh26el1SIHviTdXXVrXN5\nDKJUE156SdNdjUTAyNIeU8C8ubyxAKOeRM3oo1iLtSG8V0YFXlQfHVAF+QKBgBaa\nGR3y8heIjojYL9Wbxs/41l+Ln3pndbvMv4fmwfrUNzbw3D3V3ygaB9c+U2bDwFl4\nhz2Bcey3YYnxQHfPKJd1C+yrrnuNfnGnQTMEv/FoQ1FkWDiDP40bsgygEogkRByp\ne7u1jppv9c7M0z4RT0ZPjvVIeoDRLR6eJIdAFGolAoGAMmUd5gXlvLnwOYFp/io+\n6dhftcWO8zGdqRhePHxGRxIVgFJVK9bojTcmEK3Qtos/ya+dEb3STbmeydCfGRrl\nywPJfDykqQbXMNDtq2/Q0YBQFUPAcXIcl6Lhrwe1QKM49gAk0OB+SkXy6+8Mt6+c\n6OANcXYLRV6FsJRlojlhRrs=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-s436i@cursocodenode.iam.gserviceaccount.com",
                "client_id": "110475932522460931171",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s436i%40cursocodenode.iam.gserviceaccount.com"
            })
        });

        console.log('conectado a firebase');
    } catch (error) {
        console.log(error);
    }

}

dbConnection();

const CRUD = async () => {

    const db = admin.firestore();
    const usuariosCol = db.collection('productos');

/*     try {

        await usuariosCol.doc().create({ nombre: 'Marcos', apellido: 'Gomez' });

    } catch (error) {
        console.log(error);
    } */

    try {

        const id = 'BqAac8KxRybtcVTHxrKm'

        const doc = usuariosCol.doc(`${id}`);
        const item = await doc.delete();
        console.log(item)
        //const deleteProducto = await doc.delete();
        return 'deleteProducto';

    } catch (error) {
        throw new Error('error', error)
    }

}

CRUD();
