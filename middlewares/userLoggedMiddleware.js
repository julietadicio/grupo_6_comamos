const fs = require('fs');
const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	

	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = userDataBase.find(e => e.email == emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}
	
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		/*if (userDataBase.find(u => u.email == req.session.userLogged.email)){
			res.locals.tipeUser = true;
		}*/
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;