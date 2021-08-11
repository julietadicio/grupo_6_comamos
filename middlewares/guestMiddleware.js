const { localsName } = require("ejs");

function guestMiddleware (req,res, next) {
    if (req.session.userLogged) {
        return res.redirect('/user/account');
    } else if ((req.session.userLogged && req.session.userLogged.perfil == 'negocio')){
        return res.redirect('/user/account-buisness');
    }
    next();
}

module.exports = guestMiddleware;