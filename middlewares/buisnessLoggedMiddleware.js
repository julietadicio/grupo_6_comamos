const fs = require('fs');
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));

function buisnessLoggedMiddleware(req, res, next) {
	res.locals.userLogged = false;

	let userEmail = req.cookies.userEmail;
	let userFromCookie = restaurantDataBase.find(e => e.email == userEmail);

	if (userFromCookie) {
		req.session.buisnessLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = buisnessLoggedMiddleware;