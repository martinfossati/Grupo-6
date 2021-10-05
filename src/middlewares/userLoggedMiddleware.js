const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    let emailInCookie;

    if(req.cookies.userEmail == undefined){
        emailInCookie = "";
    } else {
        emailInCookie = req.cookies.userEmail;
    }
    db.Usuarios.findOne({
        where: {
            email: emailInCookie
        }
    }).then(resultado => {
        if(resultado) {
            req.session.userLogged = resultado;
        }
    })
    
    if(req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;