const express = require('express');
const router = express.Router ();
const fs = require('fs');

const userFilePath = './userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        return res.render ('index');
    },
    registro: (req, res) => {
        return res.render ('register-user');
    },
    registroRestaurante: (req, res) => {
        return res.render ('register-restaurant');
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
        res.render('index');
    },
    loginUser: (req, res) => {
        return res.render ('login');
    },
    loginNegocio: (req, res) => {
        return res.render ('loginNegocio');
    },
    carrito: (req, res) => {
        return res.render ('carrito');
    }
}

module.exports = controller;    