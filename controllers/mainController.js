const express = require('express');
const router = express.Router();
const fs = require('fs');
<<<<<<< HEAD

const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
    var index = [];
    while(index.length < 7){
    var r = Math.floor(Math.random() * productsDataBase.length);
    if(index.indexOf(r) === -1) index.push(r);
    }
    var indexArray = index.map (e => productsDataBase[e])
        return res.render ('index', {user: req.session.userLogged, indexArray, userDataBase, productsDataBase});
=======
const db = require('../database/models');

const controller = {
    index: async (req,res) => {
        const products = await db.Product.findAll()
        const index = [];
        while(index.length < 7){
        const r = Math.floor(Math.random() * products.length);
        if(index.indexOf(r) === -1) index.push(r);
        }
        const randomProducts = index.map (e => products[e]);
        if (req.session.userLogged && req.session.userLogged.perfil == 'usuario') {
            const user = await db.User.findOne({
                where: {email: req.session.userLogged.email}
            })    
            return res.render ('index', {randomProducts, user});
        } else if (req.session.userLogged && req.session.userLogged.perfil == 'negocio') {
            const user = await db.Restaurant.findOne({
                where: {email: req.session.userLogged.email}
            })    
            return res.render ('index', {randomProducts, user});
        } else {
            return res.render ('index', {randomProducts});
        }
>>>>>>> main
    },
    listaRestaurantes: (req, res) => {
        
        return res.render('lista-restaurantes')
    },
    listaPlatos: (req, res) => {
        return res.render('lista-platos')
    }
}

module.exports = controller;    