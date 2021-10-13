const express = require('express');
const path = require('path');
const router = express.Router ();
const fs = require('fs');
const { fileLoader } = require('ejs');
const { FILE } = require('dns');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const e = require('express');

const db = require ('../../database/models');
const { Op } = require("sequelize");

const controller = {
    buisnessList: async (req, res) => {
        const buisness = await db.Restaurant.findAll();
        return res.json (buisness);
    },
    selectBuisness: async (req, res) => {
        const buisness = await db.Restaurant.findOne({
            where: {idRestaurant: req.params.idRestaurant}
        });
        return res.json (buisness);
    },
    assignTable: async (req, res) => {
        let selectTable = req.body.idMesa;
        let orderSelect = req.body.idOrder;
        const order = await db.Order.update({
            id_table: selectTable,
            estado: 'Completada'
        }
            , {where: {idOrder: orderSelect}
        });
        return res.json(order)
    }
}

module.exports = controller;    