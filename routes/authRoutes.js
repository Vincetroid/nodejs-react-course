const passport = require('passport'); //importar libreria passport

module.exports = (app) => { //exportar un modulo nodejs con una app como parametro
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    }); 

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}

