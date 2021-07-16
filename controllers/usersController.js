const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');
const bcrypt = require('bcryptjs');



const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        return res.render ('index');
    },
    loginUser: (req, res) => {
        return res.render ('user-login');
    },
    loginProcess: (req, res) => {
        const userToLogin = userDataBase.find(u => u.email == req.body.email);
        if(userToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.recordarme) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/account');
			} 
			return res.render('user-login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('user-login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
    },
    userAccount: (req, res) => {
        return res.render('user-account', {user: req.session.userLogged});
    },
    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
    register: (req, res) => {
        return res.render ('user-register');
    },
    createUser: (req, res) => {
        const lastUserId = userDataBase[userDataBase.length -1].idUser;
        const newUserId = lastUserId +1;
        var defaultImageProfile = '/img/avatars/Usuario-registro.png'
        const userToCreate = {
            idUser: newUserId,
            ...req.body,   
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: defaultImageProfile
        };
        userDataBase.push(userToCreate);
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        res.render('user-registerOk');
    },
    userEditForm: (req, res) => {
        return res.render ('user-edit-account', {userSelect: req.session.userLogged})
    },
    userEditAccount: (req, res) => {
        const userId = req.params.idUser;
        const userSelectId = userDataBase.findIndex(p => p.idUser == userId)
        if (!req.file) {
            userDataBase[userSelectId] = { ...userDataBase[userSelectId] , ...req.body };
        } else {
            userDataBase[userSelectId] = { ...userDataBase[userSelectId] , ...req.body };
            userDataBase[userSelectId].avatar = '/img/avatars/'+req.file.filename;
        }
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect ('/user/account/');
    },
    userDelete: (req, res) => {
        const newUserDataBase = userDataBase.filter(u => u.idUser != req.params.idUser);
        fs.writeFileSync(userFilePath, JSON.stringify(newUserDataBase, null, 2));
        return res.redirect ('/')
    },
    userMyOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == req.params.idUser && u.estado == 'confirmada' || u.estado == 'pendiente');
        return res.render ('user-my-order', {userSelect, ordersUser, restaurantDataBase, productsDataBase})
    },
    userOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        const orderSelect = ordersDataBase.find(u => u.idOrder == req.params.idOrder);
        return res.render ('user-id-order', {userSelect, orderSelect, restaurantDataBase, productsDataBase})
    },
    userMyOrderDelete: (req, res) => {
        const newOrdersDataBase = ordersDataBase.filter(o => o.idOrder != req.params.idOrder);
        fs.writeFileSync(ordersFilePath, JSON.stringify(newOrdersDataBase, null, 2));
        return res.redirect ('user-my-order');
    },
    userOrders: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == req.params.idUser && u.estado == 'completada');
        return res.render ('user-orders-history', {userSelect, ordersUser, restaurantDataBase, productsDataBase})
    },
    loginBuisness: (req, res) => {
        return res.render ('buisness-login');
    },
    loginProcessBuisness: (req, res) => {
        const buisnessToLogin = restaurantDataBase.find(u => u.email == req.body.email);
        if(buisnessToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, buisnessToLogin.password);
			if (isOkThePassword) {
				delete buisnessToLogin.password;
				req.session.buisnessLogged = buisnessToLogin;
				if(req.body.recordarme) {
					res.cookie('buisnessEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
				return res.redirect('/user/account-buisness');
			} 
			return res.render('buisness-login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}
		return res.render('buisness-login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
    },
    logoutBuisness: (req, res) => {
        res.clearCookie('buisnessEmail');
		req.session.destroy();
		return res.redirect('/');
    },
    buisnessAccount: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.email == req.cookies.buisnessEmail);
        return res.render ('buisness-account', {user: req.session.buisnessEmail, restaurantSelect})
    },
    registerBuisness: (req, res) => {
        return res.render ('buisness-register');
    },
    createRestaurant: (req, res) => {
        const lastRestaurantId = restaurantDataBase[restaurantDataBase.length -1].idRestaurant;
        const newRestaurantId = lastRestaurantId +1;
        var defaultImageProfile = '/img/avatars/user-buisness-avatar.jpg'
        const restaurantCreate = {
            idRestaurant: newRestaurantId,
            ...req.body,    
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: defaultImageProfile
        };
        restaurantDataBase.push(restaurantCreate);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        res.render('buisness-registerOk');
    },
    buisnessEditForm: (req, res) => {
        return res.render ('buisness-edit-account', {restaurantSelect: req.session.userLogged});
    },
    buisnessEditAccount: (req, res) => {
        const buisnessId = req.params.idRestaurant;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
        if (!req.file) {
            restaurantDataBase[buisnessSelectId] = { ...restaurantDataBase[buisnessSelectId] , ...req.body };
        } else {
            restaurantDataBase[buisnessSelectId] = { ...restaurantDataBase[buisnessSelectId] , ...req.body };
            restaurantDataBase[buisnessSelectId].avatar = '/img/avatars/'+req.file.filename;
        }
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect ('/login/account-restaurant/'+ buisnessId);
    },
    buisnessDelete: (req, res) => {
        const newRestaurantDataBase = restaurantDataBase.filter(r => r.idRestaurant != req.session.userLogged);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(newRestaurantDataBase, null, 2));
        return res.redirect ('/')
    },
    buisnessOrders: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const restaurantOrders = ordersDataBase.filter (o => o.idRestaurant == req.session.userLogged.idRestaurant && o.estado == 'pendiente' || o.estado == 'confirmada');
        return res.render ('buisness-orders', {restaurantSelect, restaurantOrders, userDataBase,restaurantDataBase, productsDataBase});
    },
    buisnessHistoryOrders: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.params.idRestaurant);
        const restaurantOrders = ordersDataBase.filter (o => o.idRestaurant == req.params.idRestaurant && o.estado == 'completada' || o.estado == 'cancelada');
        return res.render ('buisness-orders-history', {restaurantSelect, restaurantOrders, userDataBase,restaurantDataBase, productsDataBase});
    },
    buisnessProducts: (req, res) => {
        const productsRestaurant = productsDataBase.filter(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        return res.render ('buisness-products-list', {productsRestaurant});
    },
    carrito: (req, res) => {
        
        return res.render ('carrito');
    },
    listaRestaurantes: (req, res) => {
        
        return res.render('lista-restaurantes')
    },
    listaPlatos: (req, res) => {
        return res.render('lista-platos')
    }
}

module.exports = controller;    