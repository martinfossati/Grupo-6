function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect('/infoUser')
    }
    next();
}

module.exports = guestMiddleware;