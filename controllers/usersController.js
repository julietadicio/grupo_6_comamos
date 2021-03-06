const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const moment = require('moment');

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
        const user = await db.User.findOne({
            where: {email: req.session.userLogged.email}
        })
        return res.render('user-account', {user});
    },
    logoutUser: (req, res) => {
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
            {include: [{association: 'restaurant'}, {association: 'platos'}, {association: 'products'}, {association: 'table'}]}
            )
        return res.render ('user-id-order', {user: req.session.userLogged, orderSelect, moment})
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
    },
    carrito: (req, res) => {
        return res.render ('user-shop', {user: req.session.userLogged});
    },
    buyProcess: async (req, res) => {
        await (await fetch('http://localhost:8000/api/orders')).json();
        console.log(req.body);
    }
}

module.exports = controller;    