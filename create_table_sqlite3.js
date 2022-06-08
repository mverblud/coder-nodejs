const { options } = require('./database/config');
const knex = require('knex')(options.sqlite);

knex.schema.createTable('messages', table => {
    table.increments('id')
    table.string('author')
    table.integer('text')
})
    .then(() => console.log("table Created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });