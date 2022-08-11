const { normalize, schema } = require('normalizr');

const normalizarChat =  async (dataOriginal) => {

    const authorSchema = new schema.Entity('authors');

    const messageSchema = new schema.Entity('messages');

    const messagesSchema = new schema.Entity('messages', {
        author: authorSchema,
        message: messageSchema
    });

    const chatSchema = new schema.Entity('chat', {
        mensajes: [messagesSchema]
    });

    //Normalizo
    const dataNormalizada = normalize(dataOriginal, chatSchema);

    return dataNormalizada;

}

module.exports = {
    normalizarChat
}

/* const difLong = JSON.stringify(dataOriginal).length - JSON.stringify(normalizedMessages).length;

console.log("Data Inicial", JSON.stringify(dataOriginal).length);
console.log("Data Normalizada", JSON.stringify(normalizedMessages).length);
console.log("Porcentaje", Math.round((difLong / JSON.stringify(dataOriginal).length) * 100));



function print(objeto) {
    console.log(inspect(objeto, false, 12, true));
}

print(normalizedMessages); */