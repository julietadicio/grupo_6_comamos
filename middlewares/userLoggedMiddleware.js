const fs = require('fs');
const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	res.locals.tipeUser = false;

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = userDataBase.find(e => e.email == emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
		res.locals.tipeUser = true;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;