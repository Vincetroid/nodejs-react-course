const express = require('express'); //importar librería express para manejar mejor la arquitectura de apps web escritas en nodejs
const mongoose = require('mongoose'); //importar librería mongoose para modelado elegante de objetos mongodb
const cookieSession = require('cookie-session'); //manejo de cookies
const passport = require('passport'); //intermediario de autenticación para apps en node.js
const keys = require('./config/keys'); //claves
require('./models/User'); //requerir el modelo User sin asignarlo a una variable, solo importarlo para usarlo aquí directamente
require('./services/passport'); // requerir el script passport para usarlo directamente aquí

mongoose.connect(keys.mongoURI);//de la instancia mongoose, usar el método connect para conectarse a la base de datos

const app = express(); //crear una instancia de la clase express. crear una app express

//use se ejecuta cada vez que la app recibe una solicitud
app.use(//usar el método use del objeto app de express. use es un enlace middleware entre el nivel de la app y el objeto app. es una función de middleware
    cookieSession({//generar cookie
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey], //asignar clave a cookie
    })
);

app.use(passport.initialize());//inicializar autenticación con passport 
app.use(passport.session());//

//pasar como parámetro la aplicación express a las rutas
require('./routes/authRoutes')(app); 

//decidir el puerto por el que correrá la aplicación
const PORT = process.env.PORT || 5000;

//que la app escuche/corra en el puerto seleccionado y notificarlo
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// http://localhost:5000/auth/google/callback