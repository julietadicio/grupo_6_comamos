const db = require('../database/models');

function buisnessLoggedMiddleware (req, res, next) {
	var emailInCookie = req.cookies.userEmail;
	if (emailInCookie) {
		db.Restaurant.findOne ({
			where: {email: emailInCookie}
		}).then(user => {
			req.session.userLogged = user;
			res.locals.userLogged = req.session.userLogged;	
			console.log('Estoy logeado por una cookie de NEGOCIO');
		})
	} else if (req.session.userLogged && req.session.userLogged.perfil == 'negocio') {
		res.locals.userLogged = req.session.userLogged;
		console.log('No hay cookie pero reconozco la session de NEGOCIO');
	} else {
		console.log('no hay sesion de NEGOCIO');
	}
	next();
}
module.exports = buisnessLoggedMiddleware;


/* res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	if (emailInCookie) {
		db.User.findOne ({
			where: {email: emailInCookie}
		}).then(user => {
			if(user == null) {
				db.Restaurant.findOne ({
					where: {email: emailInCookie}
				}).then(restaurant => {
					if(restaurant == null) {
						if (req.session.userLogged){
							res.locals.isLogged = true;
							res.locals.userLogged = req.session.userLogged;
						}
					} else {
						req.session.userLogged = restaurant;
					}
				})
				.catch(error => {console.log(error);})
			} else {
				req.session.userLogged = user;
				if (req.session.userLogged){
					res.locals.isLogged = true;
					res.locals.userLogged = req.session.userLogged;
				}
			}
		}).catch(error => {console.log(error);})
	} */



/* //  CODIGO ANTES DE IMPLEMENTAR SEQUELIZE
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