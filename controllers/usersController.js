const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const e = require('express');

<<<<<<< HEAD
const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
=======
const db = require ('../database/models');
const { Op } = require("sequelize");

>>>>>>> main

const controller = {
    loginUser: (req, res) => {
        return res.render ('user-login');
    },
    loginProcess: (req, res) => {
<<<<<<< HEAD
        const userToLogin = userDataBase.find(u => u.email == req.body.email && u.perfil == 'usuario');
        if(userToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				
				req.session.userLogged = userToLogin;

				if(req.body.recordarme) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
                res.locals.tipeUser = true;
				return res.redirect('/user/account');
			} 
			return res.render('user-login', {
                oldData: req.body,
				errors: {
					password: {
						msg: 'Contraseña incorrecta'
					}
				}
			});
		}
		return res.render('user-login', {
			errors: {
				email: {
					msg: 'Revisá tu email'
				}
			}
		});
    },
    userAccount: (req, res) => {
        return res.render('user-account', {user: req.session.userLogged, userDataBase});
    },
    logout: (req, res) => {
=======
        db.User.findOne ({
            where: {email: req.body.email}
        }).then ((userToLogin) => {
            if(userToLogin) {
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (isOkThePassword) {
                    
                    req.session.userLogged = userToLogin;
                    
                    if(req.body.recordarme) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    
                    return res.redirect('/user/account');
                } 
                return res.render('user-login', {
                    oldData: req.body,
                    errors: {
                        password: {
                            msg: 'Contraseña incorrecta'
                        }
                    }
                });
            }
            return res.render('user-login', {
                errors: {
                    email: {
                        msg: 'Revisá tu email'
                    }
                }
            });
        })
    },
    userAccount: async (req, res) => {
        const user = await db.User.findOne({
            where: {email: req.session.userLogged.email}
        })
        return res.render('user-account', {user});
    },
    logoutUser: (req, res) => {
>>>>>>> main
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
    register: (req, res) => {
        return res.render ('user-register');
    },
    createUser: async (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('user-register', {
                errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else {
<<<<<<< HEAD
            if (userDataBase[userDataBase.length] >=1) {
                var lastUser = userDataBase.filter (u => u.perfil == 'usuario');
                var lastUserId = lastUser[lastUser.length -1].idUser;
            } else {
                lastUserId = 0;
            }
            const newUserId = lastUserId +1;
            var defaultImageProfile = '/img/avatars/Usuario-registro.png'
            const userToCreate = {
            idUser: newUserId,
            ...req.body,   
=======
            if (await db.User.findOne({
            where: {email: req.body.email}
        })) {
            return res.render('user-register', {
                oldData: req.body,
                errors: {
                    email: {
                        msg: 'El email ya se encuentra registrado'
                    }
                }
            });
        } else {
            const defaultImageProfile = '/img/avatars/Usuario-registro.png'
            await db.User.create ({
            nombre: req.body.nombre,   
            apellido: req.body.apellido,
            email: req.body.email,   
>>>>>>> main
            password: bcrypt.hashSync(req.body.password, 10),
            perfil: 'usuario',
            avatar: defaultImageProfile,
        })
            res.render('user-registerOk');
        }
        }
    },
    userEditForm: (req, res) => {
        return res.render ('user-edit-account', {user: req.session.userLogged})
    },
    userEditAccount: async (req, res) => {    
        if (req.file) {
            await db.User.update({
            nombre: req.body.nombre,   
            apellido: req.body.apellido,
            email: req.body.email,   
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: '/img/avatars/'+req.file.filename
            },
            { where: {idUser: req.session.userLogged.idUser}
            })
            return res.redirect (303, '/user/account');
        } else {
            await db.User.update({
                nombre: req.body.nombre,   
                apellido: req.body.apellido,
                email: req.body.email,   
                password: bcrypt.hashSync(req.body.password, 10),
            },
            { where: {idUser: req.session.userLogged.idUser}
            })
            return res.redirect (303, '/user/account');
        }
    },
    userDelete: async (req, res) => {
        await db.User.destroy({
            where: {idUser: req.session.userLogged.idUser}
        })
        res.clearCookie('userEmail');
		req.session.destroy();
        return res.redirect ('/')
    },
<<<<<<< HEAD
    userMyOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.session.userLogged.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == userSelect.idUser && (u.estado == 'Confirmada' || u.estado == 'Pendiente'));
        return res.render ('user-my-order', {user:userSelect, ordersUser, userDataBase, productsDataBase})
    },
    userOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.session.userLogged.idUser);
        const orderSelect = ordersDataBase.find(u => u.idOrder == req.params.idOrder);
        return res.render ('user-id-order', {userSelect, orderSelect, userDataBase, productsDataBase})
    },
    userMyOrderDelete: (req, res) => {
        const newOrdersDataBase = ordersDataBase.filter(o => o.idOrder != req.params.idOrder);
        fs.writeFileSync(ordersFilePath, JSON.stringify(newOrdersDataBase, null, 2));
        return res.redirect ('user-my-order', { user: req.session.userLogged });
    },
    userOrders: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.session.userLogged.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == userSelect.idUser && (u.estado == 'Completada' || u.estado == 'Cancelada'));
        return res.render ('user-orders-history', {user: userSelect, ordersUser, userDataBase, productsDataBase})
    },
    loginBuisness: (req, res) => {
        return res.render ('buisness-login');
    },
    loginProcessBuisness: (req, res) => {
        const buisnessToLogin = userDataBase.find(u => u.email == req.body.email && u.perfil == 'negocio');
        if(buisnessToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, buisnessToLogin.password);
			if (isOkThePassword) {
				req.session.userLogged = buisnessToLogin;
				if(req.body.recordarme) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
                res.locals.tipeBuisness = true;
				return res.redirect('/user/account-buisness');
			} 
			return res.render('buisness-login', {
				errors: {
					password: {
						msg: 'Contraseña incorrecta'
					}
				}
			});
		}
		return res.render('user-login', {
			errors: {
				email: {
					msg: 'Revisá tu email'
				}
			}
		});
    },
    logoutBuisness: (req, res) => {
        res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
    },
    buisnessAccount: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        return res.render ('buisness-account', {user})
    },
    registerBuisness: (req, res) => {
        return res.render ('buisness-register');
    },
    createBuisness: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
			return res.render('buisness-register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} 
        var lastRestaurantId = userDataBase[userDataBase.length -1].idUser;
        const newRestaurantId = lastRestaurantId +1;
        var defaultImageProfile = '/img/avatars/user-buisness-avatar.jpg'
        const restaurantCreate = {
            idUser: newRestaurantId,
            ...req.body,    
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: defaultImageProfile,
            mapa: "",
            mesas: []
        };
        userDataBase.push(restaurantCreate);
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        res.render('buisness-registerOk');
    },
    buisnessEditForm: (req, res) => {
        return res.render ('buisness-edit-account', {user: req.session.userLogged});
    },
    buisnessEditAccount: (req, res) => {
        const buisnessId = req.session.userLogged.idUser;
        const buisnessSelectId = userDataBase.findIndex(p => p.idUser == buisnessId)
        if (!req.file) {
            userDataBase[buisnessSelectId] = { ...userDataBase[buisnessSelectId] , ...req.body };
            userDataBase[buisnessSelectId].password = bcrypt.hashSync(req.body.password, 10)
        } else {
            userDataBase[buisnessSelectId] = { ...userDataBase[buisnessSelectId] , ...req.body };
            userDataBase[buisnessSelectId].avatar = '/img/avatars/'+req.file.filename;
            userDataBase[buisnessSelectId].password = bcrypt.hashSync(req.body.password, 10)
        }
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect (303, '/user/account-buisness');
    },  
    buisnessDelete: (req, res) => {
        const newuserDataBase = userDataBase.filter(r => r.idUser != req.session.userLogged.idUser);
        fs.writeFileSync(userFilePath, JSON.stringify(newuserDataBase, null, 2));
        res.clearCookie('buisnessEmail');
		req.session.destroy();
        return res.redirect ('/')
    },
    buisnessOrders: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        const restaurantOrders = ordersDataBase.filter (o => o.idUser == user.idUser && (o.estado == 'Pendiente' || o.estado == 'Confirmada'));
        return res.render ('buisness-orders', {user, restaurantOrders, userDataBase, productsDataBase});
    },
    buisnessHistoryOrders: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        const restaurantOrders = ordersDataBase.filter (o => o.idUser == user.idUser && (o.estado == 'Completada' || o.estado == 'Cancelada'));
        return res.render ('buisness-orders-history', {user, restaurantOrders, userDataBase, productsDataBase});
    },
    buisnessProducts: (req, res) => {
        const productsRestaurant = productsDataBase.filter(r => r.idUser == req.session.userLogged.idUser);
        return res.render ('buisness-products-list', {productsRestaurant, user: req.session.userLogged});
    },
    buisnessCapacity: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        var tablesNotAsigned = 0;
        const tablesOpen = user.mesas.filter (m => m.estado == 'abierta');
        tablesOpen.forEach (n => {
        tablesNotAsigned += Number(n.capacidad);
        });
        res.render ('buisness-capacity', {user, tablesNotAsigned});
    },
    buisnessFormTables: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        const userTables = user.mesas;
        const table = userTables.find(r => r.idMesa == req.params.idMesa);
        res.render ('buisness-edit-capacity', {user, table});
    },
    buisnessEditCapacity: (req, res) => {
        const buisnessId = req.session.userLogged.idUser;
        const buisnessSelectId = userDataBase.findIndex(p => p.idUser == buisnessId)
        const tableId = req.params.idMesa;
        const tableSelectId = userDataBase[buisnessSelectId].mesas.findIndex(p => p.idMesa == tableId)
        userDataBase[buisnessSelectId].mesas[tableSelectId] = { ...userDataBase[buisnessSelectId].mesas[tableSelectId] , ...req.body };
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect ('/user/account-buisness/capacity');
    },
    tablesCreateForm: (req, res) => {
        return res.render ('buisness-create-tables', {user: req.session.userLogged});
    },
    createTable: (req, res) => {
        const resultValidation = validationResult(req);
        const buisnessId = req.session.userLogged.idUser;
        const buisnessSelectId = userDataBase.findIndex(p => p.idUser == buisnessId)
        if (resultValidation.errors.length > 0) {
			return res.render('buisness-create-tables', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                user: req.session.userLogged
			});
		} else {
        if (userDataBase[buisnessSelectId].mesas.length >= 1) {
             var lastTableId = userDataBase[buisnessSelectId].mesas[userDataBase[buisnessSelectId].mesas.length - 1].idMesa;
        } else {
            lastTableId = 0;
        }
        const newTableId = lastTableId +1;
        const TableCreate = {
            idMesa: newTableId,
            ...req.body
        };
        userDataBase[buisnessSelectId].mesas.push(TableCreate);
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect (303, '/user/account-buisness/capacity');
        }
    },
    TableDelete: (req, res) => {
        const buisnessId = req.session.userLogged.idUser;
        const buisnessSelectId = userDataBase.findIndex(p => p.idUser == buisnessId)
        userDataBase[buisnessSelectId].mesas = userDataBase[buisnessSelectId].mesas.filter(p => p.idMesa != Number(req.params.idMesa));
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect('/user/account-buisness/capacity');
=======
    userMyOrder: async (req, res) => {
        const ordersUser = await db.Order.findAll({
            where: {
                id_user: req.session.userLogged.idUser,
                 [Op.or]: [{estado: 'Confirmada'}, {estado: 'Pendiente'}]
            },
            include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}]
        })
        return res.render ('user-my-order', {user: req.session.userLogged, ordersUser})
    },
    userOrder: async (req, res) => {
        const orderSelect = await db.Order.findByPk(
            req.params.idOrder, 
            {include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}]}
            )
        return res.render ('user-id-order', {user: req.session.userLogged, orderSelect})
    },
    userMyOrderCancel: async (req, res) => {
        await db.Order.update({
            estado: 'Cancelada'
        },
        {where: {idOrder: req.params.idOrder}})
        return res.redirect (303, '/user/account/my-order')
    },
    userOrders: async (req, res) => {
        const ordersUser = await db.Order.findAll({
            where: {
                id_user: req.session.userLogged.idUser,
                 [Op.or]: [{estado: 'Completada'}, {estado: 'Cancelada'}]
            },
            include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}]
        })
        return res.render ('user-orders-history', {user: req.session.userLogged, ordersUser})
>>>>>>> main
    },
    carrito: (req, res) => {
        
        return res.render ('user-shop');
    }
}

module.exports = controller;    