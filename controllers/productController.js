const fs = require('fs');
const db = require('../database/models');

const controller = {
    detailProduct: async (req,res) => {
        const productSelect = await db.Product.findOne({
            where: {idPlato: req.params.idPlato},
            include: {association: 'productRestaurant'}
        })
        return res.render ('product-detail', {user: req.session.userLogged, productSelect})
    },
    productsList: async (req, res) => {
        const productsBuisness = await db.Product.findAll({
            where:{id_restaurant: req.session.userLogged.idRestaurant}
        })
        return res.render ('buisness-products-list', {productsBuisness, user: req.session.userLogged});
    },
    createFormProduct: (req, res) => {
        return res.render ('buisness-create-products', {user: req.session.userLogged});
    },
    createProduct: async (req, res) => {
        await db.Product.create({
        plato: req.body.plato,
        descripcion: req.body.descripcion,
        imagen: '/img/products/'+req.file.filename,
        categoria: req.body.categoria,
        precio: req.body.precio,
        id_restaurant: req.session.userLogged.idRestaurant
        }) 
        return res.redirect('/user/account-buisness/products');
    },
    editFormProduct: async (req, res) => {
        const productSelect = await db.Product.findOne({
            where: {idPlato: req.params.idPlato}
        })
        return res.render ('buisness-edit-products', {productSelect, user: req.session.userLogged.idRestaurant});
    },
    editProduct: async (req, res) => {
        if (!req.file) {
            await db.Product.update({
            plato: req.body.plato,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            precio: req.body.precio,
            },
            { where: {idPlato: req.params.idPlato} })
        } else {  
            await db.Product.update({
            plato: req.body.plato,
            descripcion: req.body.descripcion,
            imagen: '/img/products/'+req.file.filename,
            categoria: req.body.categoria,
            precio: req.body.precio,
            },
            { where: {idPlato: req.params.idPlato} })
        }
        return res.redirect('/user/account-buisness/products');
    },
    deleteProduct: async (req, res) => {
        await db.Product.destroy({
            where: {idPlato: req.params.idPlato}
        })
        return res.redirect(303, '/user/account-buisness/products');
    }
}

module.exports = controller;