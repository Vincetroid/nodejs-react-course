const passport = require('passport'); //importar libreria passport

module.exports = (app) => { //exportar un modulo nodejs con una app como parametro
    //get es una función middleware o intermedia de express que maneja las solicitudes GET
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        console.log('LOGOUT')
        req.logout();
        res.send(req.user);
    }); 

    app.get('/api/current_user', (req, res) => {
        console.log('current_user en autHRoutes');
        
        res.send(req.user);
    });
}

