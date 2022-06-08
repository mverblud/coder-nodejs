const options = {
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

module.exports = {
    options
}