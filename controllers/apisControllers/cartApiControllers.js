const fs = require('fs');
const db = require('../../database/models');

const controller = {
    productsList: async (req, res) => {
        const products = await db.Product.findAll()
        return res.json (products);
    },
    selectProduct: async (req, res) => {
        const productSelect = await db.Product.findOne({
            where: {
                idPlato: req.params.idPlato
            }
        })
        return res.json (productSelect);
    }
}

module.exports = controller;