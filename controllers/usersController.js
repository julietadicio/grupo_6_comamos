const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const e = require('express');

const db = require ('../database/models')
const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    loginUser: (req, res) => {
        return res.render ('user-login');
    },
    loginProcess: (req, res) => {
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
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('user-register', {
                errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else {
            if (db.User.length >=1) {
               var lastUserId = db.User[db.User.length -1].idUser;
            } else {
                lastUserId = 0;
            }
            const newUserId = lastUserId +1;
            var defaultImageProfile = '/img/avatars/Usuario-registro.png'
            db.User.create ({
            idUser: newUserId,
            nombre: req.body.nombre,   
            apellido: req.body.apellido,
            email: req.body.email,   
            password: bcrypt.hashSync(req.body.password, 10),
            perfil: 'usuario',
            avatar: defaultImageProfile,
        });
        res.render('user-registerOk');
        }
    },
    userEditForm: (req, res) => {
        return res.render ('user-edit-account', {user: req.session.userLogged})
    },
    userEditAccount: (req, res) => {
        db.User.update({
            nombre: req.body.nombre,   
            apellido: req.body.apellido,
            email: req.body.email,   
            password: bcrypt.hashSync(req.body.password, 10)
        },
        { where: {idUser: req.session.userLogged.idUser}
        })
        return res.redirect (303, '/user/account');
    },
    userDelete: (req, res) => {
        db.User.destroy({
            where: {idUser: req.session.userLogged.idUser}
        })
        res.clearCookie('userEmail');
		req.session.destroy();
        return res.redirect ('/')
    },
    userMyOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.session.userLogged.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == userSelect.idUser && (u.estado == 'Confirmada' || u.estado == 'Pendiente'));
        /* db.Order.findAll({
            where: {
                {id_user: req.session.userLogged.idUser},
                {estado: 'Confirmada'}
            }
            
        }) */
        return res.render ('user-my-order', {user:userSelect, ordersUser, restaurantDataBase, productsDataBase})
    },
    userOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.session.userLogged.idUser);
        const orderSelect = ordersDataBase.find(u => u.idOrder == req.params.idOrder);
        return res.render ('user-id-order', {userSelect, orderSelect, restaurantDataBase, productsDataBase})
    },
    userMyOrderCancel: (req, res) => {
        const orderId = req.params.idOrder;
        const orderSelectId = ordersDataBase.findIndex(p => p.idOrder == orderId)
        ordersDataBase[orderSelectId].estado = 'Cancelada'
        fs.writeFileSync(ordersFilePath, JSON.stringify(ordersDataBase, null, 2));
        return res.redirect ('/user/account/my-order');
    },
    userOrders: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.session.userLogged.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == userSelect.idUser && (u.estado == 'Completada' || u.estado == 'Cancelada'));
        return res.render ('user-orders-history', {user: userSelect, ordersUser, restaurantDataBase, productsDataBase})
    },
    loginBuisness: (req, res) => {
        return res.render ('buisness-login');
    },
    loginProcessBuisness: (req, res) => {
        db.Restaurant.findOne ({
            where: {email: req.body.email}
        }).then ((userToLogin) => {
            if(userToLogin) {
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (isOkThePassword) {
                    
                    req.session.userLogged = userToLogin;
                    
                    if(req.body.recordarme) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    
                    return res.redirect('/user/account-buisness');
                } 
                return res.render('buisness-login', {
                    oldData: req.body,
                    errors: {
                        password: {
                            msg: 'Contraseña incorrecta'
                        }
                    }
                });
            }
            return res.render('buisness-login', {
                errors: {
                    email: {
                        msg: 'Revisá tu email'
                    }
                }
            });
        })
    },
    buisnessAccount: (req, res) => {
        db.Restaurant.findOne ({
            where: {email: req.session.userLogged.email}
        }).then((user) => {
            return res.render ('buisness-account', {user});
        })
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
		} else {
            if (db.Restaurant.length >=1) {
               var lastUserId = db.Restaurant[db.Restaurant.length -1].idRestaurant;
            } else {
                lastUserId = 0;
            }
            const newUserId = lastUserId +1;
            var defaultImageProfile = '/img/avatars/user-buisness-avatar.jpg'
            db.Restaurant.create ({
                idRestaurant: newUserId,
                nombre: req.body.nombre,   
                direccion: req.body.direccion,
                capacidad: req.body.capacidad,
                email: req.body.email,   
                password: bcrypt.hashSync(req.body.password, 10),
                perfil: 'negocio',
                avatar: defaultImageProfile,
                mapa: ''
        });
        res.render('buisness-registerOk');
        }
    },
    buisnessEditForm: (req, res) => {
        return res.render ('buisness-edit-account', {user: req.session.userLogged});
    },
    buisnessEditAccount: (req, res) => {
        const buisnessId = req.session.userLogged.idRestaurant;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
        if (!req.file) {
            restaurantDataBase[buisnessSelectId] = { ...restaurantDataBase[buisnessSelectId] , ...req.body };
            restaurantDataBase[buisnessSelectId].password = bcrypt.hashSync(req.body.password, 10)
        } else {
            restaurantDataBase[buisnessSelectId] = { ...restaurantDataBase[buisnessSelectId] , ...req.body };
            restaurantDataBase[buisnessSelectId].password = bcrypt.hashSync(req.body.password, 10);
            restaurantDataBase[buisnessSelectId].avatar = '/img/avatars/'+req.file.filename;
        }
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect (303, '/user/account-buisness');
    },  
    buisnessDelete: (req, res) => {
        const newRestaurantDataBase = restaurantDataBase.filter(r => r.idRestaurant != req.session.userLogged.idRestaurant);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(newRestaurantDataBase, null, 2));
        res.clearCookie('userEmail');
		req.session.destroy();
        return res.redirect ('/')
    },
    buisnessOrders: (req, res) => {
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const restaurantOrders = ordersDataBase.filter (o => o.idRestaurant == user.idRestaurant && (o.estado == 'Pendiente' || o.estado == 'Confirmada'));
        return res.render ('buisness-orders', {user, restaurantOrders, userDataBase,restaurantDataBase, productsDataBase});
    },
    buisnessEditOrders: (req, res) => {
        const orderId = req.params.idOrder;
        const orderSelectId = ordersDataBase.findIndex(p => p.idOrder == orderId)
        if (req.body.estado == 'Cancelar Reserva') {
            ordersDataBase[orderSelectId].estado = 'Cancelada'
        } else {
            ordersDataBase[orderSelectId].estado = 'Confirmada'
        }
        fs.writeFileSync(ordersFilePath, JSON.stringify(ordersDataBase, null, 2));
        return res.redirect ('/user/account-buisness/orders');
    },
    buisnessHistoryOrders: (req, res) => {
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const restaurantOrders = ordersDataBase.filter (o => o.idRestaurant == user.idRestaurant && (o.estado == 'Completada' || o.estado == 'Cancelada'));
        return res.render ('buisness-orders-history', {user, restaurantOrders, userDataBase,restaurantDataBase, productsDataBase});
    },
    buisnessProducts: (req, res) => {
        const productsRestaurant = productsDataBase.filter(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        return res.render ('buisness-products-list', {productsRestaurant, user: req.session.userLogged});
    },
    buisnessCapacity: (req, res) => {
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        var tablesNotAsigned = 0;
        const tablesOpen = user.mesas.filter (m => m.estado == 'abierta');
        tablesOpen.forEach (n => {
        tablesNotAsigned += Number(n.capacidad);
        });
        res.render ('buisness-capacity', {user, tablesNotAsigned});
    },
    buisnessFormTables: (req, res) => {
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const userTables = user.mesas;
        const table = userTables.find(r => r.idMesa == req.params.idMesa);
        res.render ('buisness-edit-capacity', {user, table});
    },
    buisnessEditCapacity: (req, res) => {
        const buisnessId = req.session.userLogged.idRestaurant;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
        const tableId = req.params.idMesa;
        const tableSelectId = restaurantDataBase[buisnessSelectId].mesas.findIndex(p => p.idMesa == tableId)
        restaurantDataBase[buisnessSelectId].mesas[tableSelectId] = { ...restaurantDataBase[buisnessSelectId].mesas[tableSelectId] , ...req.body };
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect ('/user/account-buisness/capacity');
    },
    tablesCreateForm: (req, res) => {
        return res.render ('buisness-create-tables', {user: req.session.userLogged});
    },
    createTable: (req, res) => {
        const resultValidation = validationResult(req);
        const buisnessId = req.session.userLogged.idRestaurant;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
        if (resultValidation.errors.length > 0) {
			return res.render('buisness-create-tables', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                user: req.session.userLogged
			});
		} else {
        if (restaurantDataBase[buisnessSelectId].mesas.length >= 1) {
             var lastTableId = restaurantDataBase[buisnessSelectId].mesas[restaurantDataBase[buisnessSelectId].mesas.length - 1].idMesa;
        } else {
            lastTableId = 0;
        }
        const newTableId = lastTableId +1;
        const TableCreate = {
            idMesa: newTableId,
            ...req.body
        };
        restaurantDataBase[buisnessSelectId].mesas.push(TableCreate);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect (303, '/user/account-buisness/capacity');
        }
    },
    TableDelete: (req, res) => {
        const buisnessId = req.session.userLogged.idRestaurant;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
        restaurantDataBase[buisnessSelectId].mesas = restaurantDataBase[buisnessSelectId].mesas.filter(p => p.idMesa != Number(req.params.idMesa));
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect('/user/account-buisness/capacity');
    },
    carrito: (req, res) => {
        
        return res.render ('carrito');
    }
}

module.exports = controller;    