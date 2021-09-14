const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database/models');

const controller = {
    index: async (req, res) => {
        const products = await db.Product.findAll()
        const index = [];
        while (index.length < 7) {
            const r = Math.floor(Math.random() * products.length);
            if (index.indexOf(r) === -1) index.push(r);
        }
        const randomProducts = index.map(e => products[e]);
        if (req.session.userLogged && req.session.userLogged.perfil == 'usuario') {
            const user = await db.User.findOne({
                where: { email: req.session.userLogged.email }
            })
            return res.render('index', { randomProducts, user });
        } else if (req.session.userLogged && req.session.userLogged.perfil == 'negocio') {
            const user = await db.Restaurant.findOne({
                where: { email: req.session.userLogged.email }
            })
            return res.render('index', { randomProducts, user });
        } else {
            return res.render('index', { randomProducts });
        }
    },
    listaRestaurantes: async (req, res) => {
        const restaurantes = await db.Restaurant.findAll()
        return res.render('lista-restaurantes', {restaurantes})
    },
    listaPlatos: async (req, res) => {
        const products = await db.Product.findAll()
        return res.render('lista-platos', {products})
    }
}

module.exports = controller;