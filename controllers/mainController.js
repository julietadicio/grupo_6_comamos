const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');

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
    indexBuisnessLogin: (req,res) => {
        const restaurantSelect = restaurantDataBase.find(u => u.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-index-login', {restaurantSelect});
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
            nombre: req.body.nombre,    
            apellido: req.body.apellido,    
            email: req.body.email,    
            password: req.body.password,
            avatar: defaultImageProfile
        };
        userDataBase.push(userToCreate);
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        res.render('registerOk-user');
    },
    registroRestaurante: (req, res) => {
        return res.render ('register-restaurant');
    },
    createRestaurant: (req, res) => {
        const lastRestaurantId = restaurantDataBase[restaurantDataBase.length -1].idRestaurant;
        const newRestaurantId = lastRestaurantId +1;
        var defaultImageProfile = '/img/avatars/user-buisness-avatar.jpeg'
        const restaurantCreate = {
            idRestaurant: newRestaurantId,
            nombre: req.body.nombre,    
            direccion: req.body.direccion,    
            capacidad: req.body.capacidad,    
            email: req.body.email,    
            password: req.body.password,
            avatar: defaultImageProfile
        };
        restaurantDataBase.push(restaurantCreate);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        res.render('registerOk-restaurant');
    },
    loginUser: (req, res) => {
        return res.render ('login');
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
    userOrders: (req, res) => {
        const userSelect = userDataBase.find(u => u.idUser == req.params.idUser);
        const ordersUser = ordersDataBase.filter(u => u.idUser == req.params.idUser);

        return res.render ('historial-reservas', {userSelect, ordersUser, restaurantDataBase, productsDataBase})
    },
    loginNegocio: (req, res) => {
        return res.render ('loginNegocio');
    },
    buisnessAccount: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(u => u.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-account', {restaurantSelect})
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
    buisnessOrders: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-orders-history', {restaurantSelect});
    },
    carrito: (req, res) => {
        
        return res.render ('carrito');
    }
}

module.exports = controller;    