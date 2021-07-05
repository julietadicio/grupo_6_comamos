const express = require('express');
const router = express.Router ();
const fs = require('fs');

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
        const lecturaDeArchivo = fs.readFileSync('./userDataFile.json');
        const UserList = JSON.parse(lecturaDeArchivo);
        const user = [
            {nombre: req.body.nombre},
            {apellido: req.body.apellido},
            {email: req.body.email},
            {password: req.body.password}
        ];
        UserList.push(user);
        const userJson = JSON.stringify(UserList);
        fs.appendFileSync('/userDataFile.json', userJson);
        res.render('/', {user: user});
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