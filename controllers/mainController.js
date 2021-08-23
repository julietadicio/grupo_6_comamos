const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database/models');

const controller = {
    index: (req,res) => {
    var index = [];
    while(index.length < 7){
    var r = Math.floor(Math.random() * productsDataBase.length);
    if(index.indexOf(r) === -1) index.push(r);
    }
    if (req.session.userLogged && req.session.userLogged.perfil == 'usuario') {
        db.User.findOne({
            where: {email: req.session.userLogged.email}
        })
        .then(user => {
            db.Product.findAll()
            .then(products => {
                index.map (e => products[e]);
                return res.render ('index', {user, products});
            })
        })
    } else if (req.session.userLogged && req.session.userLogged.perfil == 'negocio') {
        db.Restaurant.findOne({
            where: {email: req.session.userLogged.email}
        })
        .then(user => {
            db.Product.findAll()
            .then(products => {
                index.map (e => products[e]);
                return res.render ('index', {user, products});
            })
        })
    } else {
        db.Product.findAll()
        .then(products => {
            index.map (e => products[e]);
            return res.render ('index', {products});
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