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

const controller = {
    index: (req,res) => {
        return res.render ('index');
    },
    registro: (req, res) => {
        return res.render ('register-user');
    },
    createUser: (req, res) => {
        const lastUserId = userDataBase[userDataBase.length -1].id;
        const newUserId = lastUserId +1;
        var defaultImageProfile = '/img/avatars/Usuario-registro.png'
        const userToCreate = {
            id: newUserId,
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
        const lastRestaurantId = restaurantDataBase[restaurantDataBase.length -1].id;
        const newRestaurantId = lastRestaurantId +1;
        var defaultImageProfile = '/img/avatars/user-buisness-avatar.jpeg'
        const restaurantCreate = {
            id: newRestaurantId,
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
        const userSelect = userDataBase.find(u => u.id == req.params.id);
        return res.render ('user-account', {userSelect})
    },
    userEditForm: (req, res) => {
        const userSelect = userDataBase.find(u => u.id == req.params.id);
        return res.render ('user-edit-account', {userSelect})
    },
    userEditAccount: (req, res) => {
        const userId = req.params.id;
        const userSelectId = userDataBase.findIndex(p => p.id == userId)
        userDataBase[userSelectId] = { ...userDataBase[userSelectId] , ...req.body };
        userDataBase[userSelectId].avatar = '/img/avatars/'+req.file.filename;
        fs.writeFileSync(userFilePath, JSON.stringify(userDataBase, null, 2));
        return res.redirect ('/login/account/'+ userId);
    },
    userOrders: (req, res) => {
        const userSelect = userDataBase.find(u => u.id == req.params.id);
        return res.render ('historial-reservas', {userSelect})
    },
    loginNegocio: (req, res) => {
        return res.render ('loginNegocio');
    },
    buisnessAccount: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(u => u.id == req.params.id);
        return res.render ('buisness-account', {restaurantSelect})
    },
    buisnessEditForm: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.id == req.params.id);
        return res.render ('buisness-edit-account', {restaurantSelect})
    },
    buisnessEditAccount: (req, res) => {
        const buisnessId = req.params.id;
        const buisnessSelectId = restaurantDataBase.findIndex(p => p.id == buisnessId)
        restaurantDataBase[buisnessSelectId] = { ...restaurantDataBase[buisnessSelectId] , ...req.body };
        restaurantDataBase[buisnessSelectId].avatar = '/img/avatars/'+req.file.filename;
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        return res.redirect ('/login/account-restaurant/'+ buisnessId);
    },
    carrito: (req, res) => {
        
        return res.render ('carrito');
    }
}

module.exports = controller;    