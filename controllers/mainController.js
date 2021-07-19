const express = require('express');
const router = express.Router();
const fs = require('fs');

const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        
        return res.render ('index', {user: req.session.userLogged, ordersDataBase});
    },
    listaRestaurantes: (req, res) => {
        
        return res.render('lista-restaurantes')
    },
    listaPlatos: (req, res) => {
        return res.render('lista-platos')
    }
}

module.exports = controller;    