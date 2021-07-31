const fs = require('fs');
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));

function buisnessLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	res.locals.tipeBuisness = false;

	let emailInCookie = req.cookies.buisnessEmail;
	let buisnessFromCookie = restaurantDataBase.find(e => e.email == emailInCookie);

	if (buisnessFromCookie) {
		req.session.userLogged = buisnessFromCookie;
		res.locals.tipeBuisness = true;
		res.locals.tipeUser = false;
	}
	
	if (req.session.userLogged && restaurantDataBase.find(u => u.email == req.session.userLogged.email)) {
		res.locals.isLogged = true;
		res.locals.tipeBuisness = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = buisnessLoggedMiddleware;