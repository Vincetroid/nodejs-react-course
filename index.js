const express = require('express'); //importar librería express para manejar mejor la arquitectura de apps web escritas en nodejs
const mongoose = require('mongoose'); //importar librería mongoose para modelado elegante de objetos mongodb
const cookieSession = require('cookie-session'); //manejo de cookies
const passport = require('passport'); //intermediario de autenticación para apps en node.js
const keys = require('./config/keys'); //claves
require('./models/User'); //requerir el modelo User sin asignarlo a una variable, solo importarlo para usarlo aquí directamente
require('./services/passport'); // requerir el script passport para usarlo directamente aquí

mongoose.connect(keys.mongoURI);//de la instancia mongoose, usar el método connect para conectarse a la base de datos

const app = express(); //crear una instancia de la clase express. crear una app express

app.use(//
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

console.log('app');

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// http://localhost:5000/auth/google/callback