const db = require('../../database/models');
const { Op } = require("sequelize");

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
    },
    searchBar: async (req, res) => {
        console.log(req.body);
        console.log(req.body[0].searchProduct);
        console.log(req.body[1].searchRestaurant);
        console.log(req.body[2].searchCategory);
        const products = await db.Product.findAll({
            where: {
                plato: {[Op.like]: `%${req.body[0].searchProduct}%`},
                categoria: req.body[2].searchCategory != 'filtra'? req.body[2].searchCategory: ''
            }
        })
        console.log(products);
        return res.json(products)
    }
}

module.exports = controller;