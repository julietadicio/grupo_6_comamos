const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const e = require('express');

const db = require ('../database/models');
const { Op } = require("sequelize");


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
    userAccount: async (req, res) => {
        db.User.findOne({
            where: {email: req.session.userLogged.email}
        })
        .then(user => {
            return res.render('user-account', {user});
        })
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
            var defaultImageProfile = '/img/avatars/Usuario-registro.png'
            db.User.create ({
            nombre: req.body.nombre,   
            apellido: req.body.apellido,
            email: req.body.email,   
            password: bcrypt.hashSync(req.body.password, 10),
            perfil: 'usuario',
            avatar: defaultImageProfile,
        })
        res.render('user-registerOk');
        }
    },
    userEditForm: (req, res) => {
        return res.render ('user-edit-account', {user: req.session.userLogged})
    },
    userEditAccount: async (req, res) => {    
        if (req.file) {
            db.User.update({
            nombre: req.body.nombre,   
            apellido: req.body.apellido,
            email: req.body.email,   
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: '/img/avatars/'+req.file.filename
            },
            { where: {idUser: req.session.userLogged.idUser}
            })
            await res.redirect (303, '/user/account');
        } else {
            db.User.update({
                nombre: req.body.nombre,   
                apellido: req.body.apellido,
                email: req.body.email,   
                password: bcrypt.hashSync(req.body.password, 10),
            },
            { where: {idUser: req.session.userLogged.idUser}
            })
            await res.redirect (303, '/user/account');
        }
    },
    userDelete: async (req, res) => {
        db.User.destroy({
            where: {idUser: req.session.userLogged.idUser}
        })
        res.clearCookie('userEmail');
		req.session.destroy();
        await res.redirect ('/')
    },
    userMyOrder: async (req, res) => {
        db.Order.findAll({
            where: {
                id_user: req.session.userLogged.idUser,
                 [Op.or]: [{estado: 'Confirmada'}, {estado: 'Pendiente'}]
            },
            include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}]
        })
        .then(ordersUser=>{
            return res.render ('user-my-order', {user: req.session.userLogged, ordersUser})
        })
    },
    userOrder: async (req, res) => {
        db.Order.findByPk(req.params.idOrder, {include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}]})
        .then(orderSelect => {
            return res.render ('user-id-order', {user: req.session.userLogged, orderSelect})
        })
    },
    userMyOrderCancel: async (req, res) => {
        db.Order.update({
            estado: 'Cancelada'
        },
        {where: {idOrder: req.params.idOrder}})
        await res.redirect (303, '/user/account/my-order')
    },
    userOrders: (req, res) => {
        db.Order.findAll({
            where: {
                id_user: req.session.userLogged.idUser,
                 [Op.or]: [{estado: 'Completada'}, {estado: 'Cancelada'}]
            },
            include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}]
        })
        .then(ordersUser=>{
            return res.render ('user-orders-history', {user: req.session.userLogged, ordersUser})
        })
    },
    loginBuisness: (req, res) => {
        return res.render ('buisness-login');
    },
    loginProcessBuisness: (req, res) => {
        db.Restaurant.findOne ({
            where: {email: req.body.email}
        }).then (userToLogin => {
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
    buisnessAccount: async (req, res) => {
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
            var defaultImageProfile = '/img/avatars/user-buisness-avatar.jpg'
            db.Restaurant.create ({
                nombre: req.body.nombre,   
                direccion: req.body.direccion,
                capacidad: req.body.capacidad,
                email: req.body.email,   
                password: bcrypt.hashSync(req.body.password, 10),
                perfil: 'negocio',
                avatar: defaultImageProfile,
                mapa: ''
        });
        return res.render('buisness-registerOk');
        }
    },
    buisnessEditForm: (req, res) => {
        return res.render ('buisness-edit-account', {user: req.session.userLogged});
    },
    buisnessEditAccount: async (req, res) => {
        if (req.file) {
            db.Restaurant.update({
            nombre: req.body.nombre,   
            direccion: req.body.direccion,
            capacidad: req.body.capacidad,
            email: req.body.email,   
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: '/img/avatars/'+req.file.filename
        },
        { where: {idRestaurant: req.session.userLogged.idRestaurant}
        })
        } else {
            db.Restaurant.update({
                nombre: req.body.nombre,   
                direccion: req.body.direccion,
                capacidad: req.body.capacidad,
                email: req.body.email,   
                password: bcrypt.hashSync(req.body.password, 10),
            },
            { where: {idRestaurant: req.session.userLogged.idRestaurant}
            })
        }
        await res.redirect (303, '/user/account-buisness');
    },  
    buisnessDelete: async (req, res) => {
        db.Restaurant.destroy({
            where: {idRestaurant: req.session.userLogged.idRestaurant}
        })
        res.clearCookie('userEmail');
		req.session.destroy();
        await res.redirect ('/');
    },
    buisnessOrders: async (req, res) => {
        db.Order.findAll ({
            where: {
                id_restaurant: req.session.userLogged.idRestaurant,
                [Op.or]: [{estado: 'Confirmada'}, {estado: 'Pendiente'}]
            },
            include: [{association: 'users'}, {association: 'platos'}, {association: 'products'}]
        })
        .then (restaurantOrders => {
            return res.render ('buisness-standby-orders', {user: req.session.userLogged, restaurantOrders});
        })
    },
    buisnessEditOrders: async (req, res) => {
        if (req.body.estado == 'Cancelar Reserva') {
            db.Order.update({
                estado: 'Cancelada'
            },
            {where: {idOrder: req.params.idOrder}
            })
        } else {
            db.Order.update({
                estado: 'Confirmada'
            },
            {where: {idOrder: req.params.idOrder}
            })
        }
        await res.redirect (303, '/user/account-buisness/orders');
    },
    buisnessHistoryOrders: (req, res) => {
        db.Order.findAll ({
            where: {
                id_restaurant: req.session.userLogged.idRestaurant,
                [Op.or]: [{estado: 'Completada'}, {estado: 'Cancelada'}]
            },
            include: [{association: 'users'}, {association: 'platos'}, {association: 'products'}]
        })
        .then (restaurantOrders => {
            return res.render ('buisness-orders-history', {user: req.session.userLogged, restaurantOrders});
        })
    },
    buisnessProducts: async (req, res) => {
       db.Product.findAll ({
            where: {
                id_restaurant: req.session.userLogged.idRestaurant
            }
            /* include: [{association: 'users'}, {association: 'platos'}, {association: 'products'}] */
        })
        .then (productsRestaurant => {
            return res.render ('buisness-products-list', {user: req.session.userLogged, productsRestaurant});
        })
    },
    buisnessCapacity: async (req, res) => {
        db.Table.findAll ({
            where: {
                id_restaurant: req.session.userLogged.idRestaurant,
            }
        }).then(tables => {
            return res.render ('buisness-capacity', {user: req.session.userLogged, tables})
        })
        /* var tablesNotAsigned = 0;
        const tablesOpen = user.mesas.filter (m => m.estado == 'abierta');
        tablesOpen.forEach (n => {
        tablesNotAsigned += Number(n.capacidad);
        }); */
    },
    buisnessFormTables: async (req, res) => {
        db.Table.findOne ({
            where: {
                idTable: req.params.idMesa,
            }
        })
        .then (table => {
            return res.render ('buisness-edit-capacity', {user: req.session.userLogged, table});
        })
    },
    buisnessEditCapacity: async (req, res) => {
        db.Table.update({
            name: req.body.nombre,
            ubication: req.body.ubicacion,
            capacity: req.body.capacidad,
            status: req.body.estado,
        },
        {where: {idTable: req.params.idMesa}})
        await res.redirect (303, '/user/account-buisness/capacity');
    },
    tablesCreateForm: (req, res) => {
        return res.render ('buisness-create-tables', {user: req.session.userLogged});
    },
    createTable: async (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
			return res.render('buisness-create-tables', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                user: req.session.userLogged
			});
		} else {
            db.Table.create({
            name: req.body.nombre,
            ubication: req.body.ubicacion,
            capacity: req.body.capacidad,
            status: req.body.estado,
            id_restaurant: req.session.userLogged.idRestaurant
        })
        await res.redirect (303, '/user/account-buisness/capacity');
        }
    },
    TableDelete: async (req, res) => {
        db.Table.destroy({
            where: {idTable: req.params.idMesa}
        })
        await res.redirect('/user/account-buisness/capacity');
    },
    carrito: (req, res) => {
        
        return res.render ('carrito');
    }
}

module.exports = controller;    