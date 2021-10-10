const fs = require('fs');
const db = require('../../database/models');

const controller = {
    ordersList: async (req, res) => {
        const orders = await db.Order.findAll()
        return res.json (orders);
    },
    selectOrder: async (req, res) => {
        const orderSelect = await db.Order.findOne({
            where: {
                idOrder: req.params.idOrder
            }
        })
        return res.json (orderSelect);
    }
}

module.exports = controller;