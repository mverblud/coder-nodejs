const { options } = require('./database/config');
const knex = require('knex')(options);

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('nombre')
    table.integer('precio')
    table.string('imagen')
})
    .then(() => console.log("table Created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });