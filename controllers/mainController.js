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
    indexLogin: (req,res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        return res.render ('index-login', {userSelect});
    },
    loginUser: (req, res) => {
        return res.render ('login');
    },
    registro: (req, res) => {
        return res.render ('register-user');
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
        res.render('registerOk-user');
    },
    userAccount: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        return res.render ('user-account', {userSelect})
    },
    userEditForm: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        return res.render ('user-edit-account', {userSelect})
    },
    userEditAccount: (req, res) => {
        const userId = req.params.idUser;
        const userSelectId = userDataBase.findIndex(p => p.idUser == userId)
        userDataBase[userSelectId] = { ...userDataBase[userSelectId] , ...req.body };
        userDataBase[userSelectId].avatar = '/img/avatars/'+req.file.filename;
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect ('/login/account/'+ userId);
    },
    userDelete: (req, res) => {
        const newUserDataBase = userDataBase.filter(u => u.idUser != req.params.idUser);
        fs.writeFileSync(userFilePath, JSON.stringify(newUserDataBase, null, 2));
        return res.redirect ('/')
    },
    userMyOrder: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == req.params.idUser && u.estado == 'confirmada');
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
    loginNegocio: (req, res) => {
        return res.render ('buisness-login');
    },
    indexBuisnessLogin: (req,res) => {
        const restaurantSelect = restaurantDataBase.find(u => u.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-index-login', {restaurantSelect});
    },
    registroRestaurante: (req, res) => {
        return res.render ('register-restaurant');
    },
    buisnessAccount: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(u => u.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-account', {restaurantSelect})
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
        res.render('registerOk-restaurant');
    },
    buisnessEditForm: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-edit-account', {restaurantSelect})
    },
    buisnessEditAccount: (req, res) => {
        const buisnessId = req.params.idRestaurant;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.idRestaurant == buisnessId)
        restaurantDataBase[buisnessSelectId] = { ...restaurantDataBase[buisnessSelectId] , ...req.body };
        restaurantDataBase[buisnessSelectId].avatar = '/img/avatars/'+req.file.filename;
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect ('/login/account-restaurant/'+ buisnessId);
    },
    buisnessDelete: (req, res) => {
        const newRestaurantDataBase = restaurantDataBase.filter(r => r.idRestaurant != req.params.idRestaurant);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(newRestaurantDataBase, null, 2));
        return res.redirect ('/')
    },
    buisnessOrders: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-orders-history', {restaurantSelect});
    },
    carrito: (req, res) => {
        
        return res.render ('carrito');
    }
}

module.exports = controller;    