const fs = require('fs');
<<<<<<< HEAD

const userFilePath = './data bases/userDataFile.json';
const userDataBase = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
=======
const db = require('../database/models');
>>>>>>> main

const controller = {
    detailProduct: async (req,res) => {
        const productSelect = await db.Product.findOne({
            where: {idPlato: req.params.idPlato},
            include: {association: 'productRestaurant'}
        })
        return res.render ('product-detail', {user: req.session.userLogged, productSelect})
    },
<<<<<<< HEAD
    detailProduct: (req,res) => {
        const productSelect = productsDataBase.find (p => p.idPlato == req.params.idPlato);
        return res.render ('product-detail', {user: req.session.userLogged, productSelect, userDataBase})
    },
    productsList: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        const productsBuisness = productsDataBase.filter ( p => p.idUser == req.session.userLogged.idUser)
        return res.render ('buisness-products-list', {productsBuisness, user})
    },
    createFormProduct: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        return res.render ('buisness-create-products', {user});
    },
    createProduct: (req, res) => {
        const lastProductId = productsDataBase[productsDataBase.length -1].idPlato;
        const newProductId = lastProductId +1;
        const newProduct = {
            idPlato: newProductId,
            ...req.body,
            imagen: '/img/products/'+req.file.filename,
            idUser: Number(req.session.userLogged.idUser)    
        };
        productsDataBase.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(productsDataBase, null, 2));
        return res.redirect('/user/account-buisness/products');
    },
    editFormProduct: (req, res) => {
        const user = userDataBase.find(r => r.idUser == req.session.userLogged.idUser);
        const productSelect = productsDataBase.find(p => p.idPlato == req.params.idPlato && (p.idUser == user.idUser));
        return res.render ('buisness-edit-products', {productSelect, user});
=======
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
        return res.redirect('/buisness/account/products');
    },
    editFormProduct: async (req, res) => {
        const productSelect = await db.Product.findOne({
            where: {idPlato: req.params.idPlato}
        })
        return res.render ('buisness-edit-products', {productSelect, user: req.session.userLogged.idRestaurant});
>>>>>>> main
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
        return res.redirect('/buisness/account/products');
    },
    deleteProduct: async (req, res) => {
        await db.Product.destroy({
            where: {idPlato: req.params.idPlato}
        })
        return res.redirect(303, '/buisness/account/products');
    }
}

module.exports = controller;