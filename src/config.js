export default {
    mongoDB: {
        URL: 'mongodb+srv://mverblud:OKsEHOlsWDvPBHej@mverblud.pawqn.mongodb.net/cursoCoder?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'curso_node'
        },
        pool: { min: 0, max: 7 }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './db.sqlite',
        },
        useNullAsDefault: true
    }
}