const passport = require('passport'); //requerir la libreria passport que sirve de facilitador en la autenticacion de usuario en nodejs
const GoogleStrategy = require('passport-google-oauth20').Strategy; //libreria de autenticacion oauth de google
const mongoose = require('mongoose'); //requerir mongoose la cual facilita la transición entre mongoDB y el código
const keys = require('../config/keys'); //claves

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => done(null, user));
                    }
                }).catch(msg => {
                    console.log('MENSAJE');
                    console.log(msg);
                });
        }
    )
);