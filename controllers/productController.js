const fs = require('fs');
const db = require('../database/models');

const controller = {
    detailProduct: async (req,res) => {
        db.Product.findOne({
            where: {idPlato: req.params.idPlato},
            include: {association: 'productRestaurant'}
        })
        .then(productSelect => {
            return res.render ('product-detail', {user: req.session.userLogged, productSelect})
        })
    },
    productsList: (req, res) => {
        db.Product.findAll({
            where:{id_restaurant: req.session.userLogged.idRestaurant}
        }).then(productsBuisness => {
            return res.render ('buisness-products-list', {productsBuisness, user: req.session.userLogged})
        })
    },
    createFormProduct: (req, res) => {
        return res.render ('buisness-create-products', {user: req.session.userLogged});
    },
    createProduct: async (req, res) => {
        db.Product.create({
        plato: req.body.plato,
        descripcion: req.body.descripcion,
        imagen: '/img/products/'+req.file.filename,
        categoria: req.body.categoria,
        precio: req.body.precio,
        id_restaurant: req.session.userLogged.idRestaurant
        }) 
        await res.redirect('/user/account-buisness/products');
    },
    editFormProduct: async (req, res) => {
        db.Product.findOne({
            where: {idPlato: req.params.idPlato}
        })
        .then(productSelect => {
            return res.render ('buisness-edit-products', {productSelect, user: req.session.userLogged.idRestaurant});
        })
    },
    editProduct: async (req, res) => {
        if (!req.file) {
            db.Product.update({
            plato: req.body.plato,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            precio: req.body.precio,
            },
            { where: {idPlato: req.params.idPlato} })
        } else {  
            db.Product.update({
            plato: req.body.plato,
            descripcion: req.body.descripcion,
            imagen: '/img/products/'+req.file.filename,
            categoria: req.body.categoria,
            precio: req.body.precio,
            },
            { where: {idPlato: req.params.idPlato} })
        }
        await res.redirect('/user/account-buisness/products');
    },
    deleteProduct: async (req, res) => {
        db.Product.destroy({
            where: {idPlato: req.params.idPlato}
        })
        await res.redirect(303, '/user/account-buisness/products');
    }
}

module.exports = controller;