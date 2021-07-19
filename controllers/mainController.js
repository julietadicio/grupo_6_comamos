const express = require('express');
const router = express.Router();



const controller = {
    index: (req,res) => {
        return res.render ('index', {user: req.session.userLogged});
    },
    listaRestaurantes: (req, res) => {
        
        return res.render('lista-restaurantes')
    },
    listaPlatos: (req, res) => {
        return res.render('lista-platos')
    }
}

module.exports = controller;    