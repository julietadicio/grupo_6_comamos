const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	let usuarioDb = db.User.findOne ({where: {email: emailInCookie}});
	let restauranteDb = db.Restaurant.findOne ({where: {email: emailInCookie}});
	Promise.all([usuarioDb, restauranteDb])
	.then(([usuario, restaurante]) => {
		if (usuario != null) {
			var userFromCookie = usuario;
		} else if (restaurante != null){
			userFromCookie = restaurante;
		}
	})
	.catch((error) => console.log(error))
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	} 
	if (req.session.userLogged){
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = userLoggedMiddleware;

/*  CODIGO ANTES DE IMPLEMENTAR SEQUELIZE
const fs = require('fs');
const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	if (emailInCookie) {
		if (userDataBase.find(e => e.email == emailInCookie)){
			var userFromCookie = userDataBase.find(e => e.email == emailInCookie);
		} else {
			userFromCookie = restaurantDataBase.find(e => e.email == emailInCookie);
		}
	}
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	} 
	if (req.session.userLogged){
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = userLoggedMiddleware; */