const mongoose = require('mongoose'); //requerir o importar libreria mongoose
const { Schema } = mongoose; //obtener de mongoose un esquema

const userSchema = new Schema({ //crear un objeto esquema usuario de tipo esquema de mongoose
    googleId: String //este esquema especifíca que se va a obtener el googleId de alguien y va a ser de tipo string
});

mongoose.model('users', userSchema);//usamos directamente la libreria mongoose. de un objeto mongoose utilizar 
//modelo llamado 'users' el cual es equivalente a una coleccion en mongodb que se llama 'users'
