const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database/models');

const controller = {
    index: (req,res) => {
    if (req.session.userLogged && req.session.userLogged.perfil == 'usuario') {
        var product = db.Product.findAll()
        var users = db.User.findOne({
            where: {email: req.session.userLogged.email}
        })
        Promise.all([product, users]).then(([products, user]) => {
            var index = [];
            while(index.length < 7){
            var r = Math.floor(Math.random() * products.length);
            if(index.indexOf(r) === -1) index.push(r);
            }
            var randomProducts = index.map (e => products[e]);
            return res.render ('index', {randomProducts, user});
        })
    } else if (req.session.userLogged && req.session.userLogged.perfil == 'negocio') {
        var product = db.Product.findAll()
        var users = db.Restaurant.findOne({
            where: {email: req.session.userLogged.email}
        })
        Promise.all([product, users]).then(([products, user]) => {
            var index = [];
            while(index.length < 7){
            var r = Math.floor(Math.random() * products.length);
            if(index.indexOf(r) === -1) index.push(r);
            }
            var randomProducts = index.map (e => products[e]);
            return res.render ('index', {randomProducts, user});
        })
    } else {
        db.Product.findAll()
        .then(products => {
            var index = [];
            while(index.length < 7){
            var r = Math.floor(Math.random() * products.length);
            if(index.indexOf(r) === -1) index.push(r);
            }
            var randomProducts = index.map (e => products[e]);
            return res.render ('index', {randomProducts});
        })
    }
    },
    listaRestaurantes: (req, res) => {
        
        return res.render('lista-restaurantes')
    },
    listaPlatos: (req, res) => {
        return res.render('lista-platos')
    }
}

module.exports = controller;    