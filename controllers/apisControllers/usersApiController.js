const express = require('express');

const db = require ('../../database/models');
const { Op } = require("sequelize");

const controller = {
    usersList: async (req, res) => {
        const users = await db.User.findAll();
        return res.json (users);
    },
    selectUser: async (req, res) => {
        const user = await db.User.findOne({
            where: {idRestaurant: req.params.idRestaurant}
        });
        return res.json (user);
    },
    userShop: async (req, res) => {
        console.log(req.body);
        console.log(req.body[0].order);
        console.log(req.body[1].ordersProducts);
        const orders = req.body[0].order;
        const ordersProducts = req.body[1].ordersProducts;
        for (let a = 0; a < orders.length; a++) {
            const order = orders[a];
            await db.Order.create({
                idOrder: order.idOrder,
                id_user: order.id_user,
                id_restaurant: order.id_restaurant,
                estado: order.estado,
                comensales: order.comensales,
                fecha_reserva: order.fecha_reserva,
                total: order.total
            })
        }
        for (let s = 0; s < ordersProducts.length; s++) {
            const orderProduct = ordersProducts[s];
            await db.OrderProduct.create({
                id_order: orderProduct.id_order,
                id_product: orderProduct.id_product,
                cantidad: orderProduct.cantidad,
            })
        }
        return res.json([orders, ordersProducts]);
    }
}

module.exports = controller;    