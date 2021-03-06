const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const db = require('../database/models');
const { Op } = require("sequelize");


const controller = {
    index: async (req, res) => {
        const products = await db.Product.findAll()
        const index = [];
            while (index.length < 8) {
                const r = Math.floor(Math.random() * products.length);
                if (index.indexOf(r) === -1) index.push(r);
            }
            const randomProducts = index.map (e => products[e]);

        const restaurants = await db.Restaurant.findAll();
        const arrayRestaurants = [];
        while(arrayRestaurants.length < 3){
        const r = Math.floor(Math.random() * restaurants.length);
        if(arrayRestaurants.indexOf(r) === -1) arrayRestaurants.push(r);
        }
        const randomRestaurants = arrayRestaurants.map (e => restaurants[e]);

        if (req.session.userLogged && req.session.userLogged.perfil == 'usuario') {
            const user = await db.User.findOne({
                where: {email: req.session.userLogged.email}
            })    
            return res.render ('index', {randomProducts, randomRestaurants, user});
        } else if (req.session.userLogged && req.session.userLogged.perfil == 'negocio') {
            const user = await db.Restaurant.findOne({
                where: {email: req.session.userLogged.email}
            })    
            return res.render ('index', {randomProducts, randomRestaurants, user});
        } else {
            return res.render ('index', {randomProducts, randomRestaurants});
        }
    },
    listaRestaurantes: async (req, res) => {
        const restaurantes = await db.Restaurant.findAll()
        return res.render('lista-restaurantes', {restaurantes, user:req.session.userLogged})
    },
    listaPlatos: async (req, res) => {
        const products = await db.Product.findAll()
        return res.render('lista-platos', {products, user:req.session.userLogged})
    },
    productsRestaurant: async (req, res) => {
        const products = await db.Product.findAll({
            where: {id_restaurant: req.params.idRestaurant}
        })
        const buisness = await db.Restaurant.findOne({
            where: {idRestaurant: req.params.idRestaurant}
        })
        return res.render('restaurant-detail', {products, user:req.session.userLogged, buisness})
    },
    searchBar: (req, res) => {
        /* const products = await (await fetch('http://localhost:8000/api/products/search')).json();
        console.log(products); */
        return res.render('lista-platos-search', {user:req.session.userLogged})
    }
    
}

module.exports = controller;