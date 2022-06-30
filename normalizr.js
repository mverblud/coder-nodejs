const { normalize, schema } = require('normalizr');
const { inspect } = require('util');

const messages =
    [
        {
            id: "1000",
            author: {
                id: "marcosverblud@gmail.com",
                nombre: "Marcos",
                apellido: "Verblud",
                edad: "29",
                alias: "mverblud"
            },
            text: "Hola, como andas?"
        },
        {
            id: "1000",
            author: {
                id: "msverblud@gmail.com",
                nombre: "pedro",
                apellido: "funez",
                edad: "50",
                alias: "pedrof"
            },
            text: "Hola, como estas?"
        }
    ]

const chat = {
    id: "1",
    nombre: "Clase 22",
    descripcion: "probando normalizr",
    mensajes:
    {
        id: "1",
        mensaje: "Hola Pedro",
        autor: {
            id: 1,
            nombre: "marcos",
            apellido: "verblud",
            edad: "29",
            alias: "mverblud"

        },
        id: "2",
        mensaje: "Hola Marcos",
        autor: {
            id: 2,
            nombre: "pedro",
            apellido: "gomez",
            edad: "50",
            alias: "pgomes"
        }
    }
    ,
    autores:
        [
            {
                id: 1,
                nombre: "marcos",
                apellido: "verblud",
                edad: "29",
                alias: "mverblud"

            },
            {
                id: 2,
                nombre: "pedro",
                apellido: "gomez",
                edad: "50",
                alias: "pgomes"

            },
        ]
}

/* const empresa = {
    id: "1000",
    nombre: "titulo",
    gerente: {
        id: "2",
        nombre: "roberto",
        apellido : "pepe"
    },
    encargado: {
        id: "3",
        nombre: "pablo",
        apellido : "pepe"
    },
    empleados: [
        {
            id: "1",
            nombre: "juan",
            apellido : "pepe"
        },
        {
            id: "2",
            nombre: "roberto",
            apellido : "pepe"
        },
        {
            id: "3",
            nombre: "pablo",
            apellido : "pepe"
        },
    ]
}

const empleadosSchema = new schema.Entity('empleados');

const empresaSchema = new schema.Entity('empresa',{
    gerente: empleadosSchema,
    encargado : empleadosSchema,
    empleados : [empleadosSchema]
});

const empresaNormalized = normalize(empresa, empresaSchema);

console.log("data Inicial", JSON.stringify(empresa).length);
console.log("data Normalizada", JSON.stringify(empresaNormalized).length); */

// Definir los esquemas
// 1. author
// 2. message

const authorSchema = new schema.Entity('author');

const chatsSchema = new schema.Entity('chat',{
    author : authorSchema
});

const chatNormalized = normalize(messages, chatsSchema);

console.log("data Inicial", JSON.stringify(messages).length);
console.log("data Normalizada", JSON.stringify(chatNormalized).length);

const autoresSchema = new schema.Entity('autores');
const mensajesSchema = new schema.Entity('mensajes');

const chatSchema = new schema.Entity('chat', {
    autores: autoresSchema,
    mensajes: [mensajesSchema],
})

const messageNormalized = normalize(chat, chatSchema);

console.log("data Inicial", JSON.stringify(chat).length);
console.log("data Normalizada", JSON.stringify(chatSchema).length);

function print(objeto) {
    console.log(inspect(objeto, false, 12, true));
}

//print(messageNormalized);
print(chatNormalized);

/* print(messageNormalized); */
