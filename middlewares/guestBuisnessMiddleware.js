function guestBuisnessMiddleware (req,res, next) {
    if (req.session.userLogged) {
        return res.redirect('/user/account-buisness');
    }
    next();
}

module.exports = guestBuisnessMiddleware;