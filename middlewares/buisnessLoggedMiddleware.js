const fs = require('fs');
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));

function buisnessLoggedMiddleware(req, res, next) {
	res.locals.buisnessEmail = false;

	let buisnessEmail = req.cookies.buisnessEmail;
	let buisnessFromCookie = restaurantDataBase.find(e => e.email == buisnessEmail);

	if (buisnessFromCookie) {
		req.session.buisnessLogged = buisnessFromCookie;
	}

	if (req.session.buisnessLogged) {
		res.locals.isLogged = true;
		res.locals.buisnessLogged = req.session.buisnessLogged;
	}

	next();
}

module.exports = buisnessLoggedMiddleware;