const { localsName } = require("ejs");

function guestMiddleware (req,res, next) {
<<<<<<< HEAD
    if (req.session.userLogged) {
        return res.redirect('/user/account');
    } else if ((req.session.userLogged)){
=======
    if (req.session.userLogged && req.session.userLogged.perfil == 'usuario') {
        return res.redirect('/user/account');
    } else if ((req.session.userLogged && req.session.userLogged.perfil == 'negocio')){
>>>>>>> main
        return res.redirect('/user/account-buisness');
    }
    next();
}

module.exports = guestMiddleware;