function authBuisnessMiddleware (req,res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/user/login-buisness');
    }
    next();
}

module.exports = authBuisnessMiddleware;