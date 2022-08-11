const { normalize, schema } = require('normalizr');
const { inspect } = require('util');
const { normalizarChat } = require('./utils/normalizarMessages');

const dataOriginal =
{
    id: 'Chat coderhouse',
    mensajes:
        [
            {
                id: 1,
                author: {
                    id: 'marcosverblud@gmail.com',
                    name: 'Marcos',
                    lastName: 'Verblud',
                    age: '29',
                    alias: 'mverblud',
                    avatar: 'https://robohash.org/cc6fe360380bc2961db36bebb6922228?set=set4&bgset=&size=400x400'
                },
                date: '4/6/2022 22:11:643',
                message: 'Holaaaa'
            },
            {
                id: 2,
                author: {
                    id: 'pedrogomes@gmail.com',
                    name: 'Pedro',
                    lastName: 'Gomez',
                    age: '52',
                    alias: 'pgomes',
                    avatar: 'https://robohash.org/fadfa9dc6d9bac8a3135d983c1b8f968?set=set4&bgset=&size=400x400'
                },
                date: '4/6/2022 22:13:161',
                message: 'Hola! como estas?'
            },
            {
                id: 3,
                author: {
                    id: 'marcosverblud@gmail.com',
                    name: 'Marcos',
                    lastName: 'Verblud',
                    age: '29',
                    alias: 'mverblud',
                    avatar: 'https://robohash.org/cc6fe360380bc2961db36bebb6922228?set=set4&bgset=&size=400x400'
                },
                date: '4/6/2022 22:14:834',
                message: 'Bien, vos?'
            },
            {
                id: 4,
                author: {
                    id: 'pedrogomes@gmail.com',
                    name: 'Pedro',
                    lastName: 'Gomez',
                    age: '52',
                    alias: 'pgomes',
                    avatar: 'https://robohash.org/fadfa9dc6d9bac8a3135d983c1b8f968?set=set4&bgset=&size=400x400'
                },
                date: '4/6/2022 22:18:582',
                message: 'Que bueno!! Yo tambien!!'
            }
        ]
}

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
const normalizedMessages = normalize(dataOriginal, chatSchema);
const difLong = JSON.stringify(dataOriginal).length - JSON.stringify(normalizedMessages).length;

console.log("Data Inicial", JSON.stringify(dataOriginal).length);
console.log("Data Normalizada", JSON.stringify(normalizedMessages).length);
console.log("Porcentaje" ,Math.round((difLong / JSON.stringify(dataOriginal).length) * 100));

function print(objeto) {
    console.log(inspect(objeto, false, 12, true));
}

print(normalizedMessages);

normalizarChat(dataOriginal).then;