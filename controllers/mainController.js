const express = require('express');
const router = express.Router ();
const fs = require('fs');

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
        const userToCreate = {
            id: newUserId,
            nombre: req.body.nombre,    
            apellido: req.body.apellido,    
            email: req.body.email,    
            password: req.body.password,    
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
        const restaurantCreate = {
            id: newRestaurantId,
            nombre: req.body.nombre,    
            direccion: req.body.direccion,    
            capacidad: req.body.capacidad,    
            email: req.body.email,    
            password: req.body.password,    
        };
        restaurantDataBase.push(restaurantCreate);
        fs.writeFileSync(restaurantFilePath, JSON.stringify(restaurantDataBase, null, 2));
        res.render('registerOk-restaurant');
    },
    loginUser: (req, res) => {
        return res.render ('login');
    },
    userAccount: (req, res) => {
        return res.render ('user-account')
    },
    loginNegocio: (req, res) => {
        return res.render ('loginNegocio');
    },
    carrito: (req, res) => {
        return res.render ('carrito');
    }
}

module.exports = controller;    