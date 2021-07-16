function authBuisnessMiddleware (req,res, next) {
    if (!req.session.buisnessLogged) {
        return res.redirect('/user/login-buisness');
    }
    next();
}

module.exports = authBuisnessMiddleware;