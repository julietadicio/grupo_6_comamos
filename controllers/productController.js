const fs = require('fs');


const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        console.log(req.session.userLogged);
        return res.render ('index', {buisness: req.session.userLogged});
    },
    detail: (req,res) => {
        return res.render ('product', {buisness: req.session.userLogged})
    },
    productsList: (req, res) => {
        const buisness = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const productsRestaurant = req.session.userLogged;
        return res.render ('buisness-products-list', {productsRestaurant, buisness})
    },
    createFormProduct: (req, res) => {
        const buisness = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        return res.render ('buisness-create-products', {buisness});
    },
    createProduct: (req, res) => {
        const lastProductId = productsDataBase[productsDataBase.length -1].idPlato;
        const newProductId = lastProductId +1;
        const newProduct = {
            idPlato: newProductId,
            ...req.body,
            imagen: '/img/products/'+req.file.filename,
            idRestaurant: Number(req.session.userLogged.idRestaurant)    
        };
        productsDataBase.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(productsDataBase, null, 2));
        return res.redirect('/user/account-buisness/products');
    },
    editFormProduct: (req, res) => {
        const buisness = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const productSelect = productsDataBase.find(p => p.idPlato == req.params.idPlato && (p.idRestaurant == buisness.idRestaurant));
        return res.render ('buisness-edit-products', {productSelect, buisness});
    },
    editProduct: (req, res) => {
        const productId = req.params.idPlato;
        const productSelectId = productsDataBase.findIndex(p => p.idPlato == productId)
        if (!req.file) {
            productsDataBase[productSelectId] = { ...productsDataBase[productSelectId] , ...req.body };
        } else {
            productsDataBase[productSelectId] = { ...productsDataBase[productSelectId] , ...req.body };
            productsDataBase[productSelectId].imagen = '/img/products/'+req.file.filename;
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(productsDataBase, null, 2));
        return res.redirect('/user/account-buisness/products');
    },
    deleteProduct: (req, res) => {
        const newProductsDataBase = productsDataBase.filter(p => p.idPlato != req.params.idPlato);
        fs.writeFileSync(productsFilePath, JSON.stringify(newProductsDataBase, null, 2));
        return res.redirect(303, '/user/account-buisness/products');
    }
}

module.exports = controller;