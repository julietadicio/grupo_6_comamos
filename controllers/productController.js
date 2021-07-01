const express = require('express');
const router = express.Router ();

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