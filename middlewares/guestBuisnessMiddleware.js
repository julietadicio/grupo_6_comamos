function guestBuisnessMiddleware (req,res, next) {
    if (req.session.buisnessLogged) {
        return res.redirect('/user/account-buisness');
    }
    next();
}

module.exports = guestBuisnessMiddleware;