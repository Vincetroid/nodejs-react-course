const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleStrategy = require('passport-google-oauth20'); //la nueva
const keys = require('./config/keys');

const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        }, (accessToken) => {
            console.log(accessToken);
        }
    )
);

app.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

const PORT = process.env.PORT || 5000;

console.log('app');

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// http://localhost:5000/auth/google/callback