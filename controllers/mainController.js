const express = require('express');
const router = express.Router();
const fs = require('fs');

const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        const indiceAleatorio = Math.floor(Math.random() * productsDataBase.length);
        //const products = productsDataBase[indiceAleatorio];
        return res.render ('index', {user: req.session.userLogged, indiceAleatorio, productsDataBase});
    },
    listaRestaurantes: (req, res) => {
        
        return res.render('lista-restaurantes')
    },
    listaPlatos: (req, res) => {
        return res.render('lista-platos')
    }
}

module.exports = controller;    