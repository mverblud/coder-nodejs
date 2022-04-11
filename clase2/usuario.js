
class Usuario {

    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        console.log(`Nombre completo : ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        console.log(`cantidad de mascotas: ${this.mascotas.length}`);
    }

    addBook(nombre, autor) {

        const book = {
            nombre,
            autor
        }

        this.libros.push(book);
    }

    getBookNames() {

        const arrNombres = this.libros.map((book) => {
            return book.nombre
        });

        console.log(arrNombres)
    }
}

/* const user1 = new Usuario('marcos', 'verblud')
user1.getFullName();
user1.addMascota('perro');
user1.addMascota('gato');
user1.countMascotas();
user1.addBook('libro1', 'autor desconocido');
user1.addBook('libro2', 'autor desconocido');
user1.addBook('libro3', 'autor desconocido');
user1.getBookNames(); */

const usuarios = {
    nombre: 'marcos',
    apellido: 'verblud',
    libros: [{
        nombre: 'libro1',
        autor: 'autor 1'
    },
    {
        nombre: 'libro2',
        autor: 'autor 2'
    }
    ],
    mascotas: ['gato', 'perro', 'rata']
}

const user = new Usuario(usuarios.nombre,usuarios.apellido,usuarios.libros,usuarios.mascotas);
user.addMascota('conejo');
user.addBook('libro3', 'autor desconocido 3');
user.getFullName();
user.countMascotas();
user.getBookNames();
//console.log(user);

//console.log(user1);

/* const user2 = new Usuario('pepe', 'gomez')
console.log(user2);
user2.getFullName(); */