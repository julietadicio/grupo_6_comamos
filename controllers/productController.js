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
        return res.render ('index', {user: req.session.userLogged});
    },
    detailProduct: (req,res) => {
        const productSelect = productsDataBase.find (p => p.idPlato == req.params.idPlato);
        return res.render ('product-detail', {user: req.session.userLogged, productSelect, restaurantDataBase})
    },
    productsList: (req, res) => {
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const productsBuisness = productsDataBase.filter ( p => p.idRestaurant == req.session.userLogged.idRestaurant)
        return res.render ('buisness-products-list', {productsBuisness, user})
    },
    createFormProduct: (req, res) => {
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        return res.render ('buisness-create-products', {user});
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
        const user = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const productSelect = productsDataBase.find(p => p.idPlato == req.params.idPlato && (p.idRestaurant == user.idRestaurant));
        return res.render ('buisness-edit-products', {productSelect, user});
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
    },
    adminOrder: (req, res) => {
        const orderId = req.body.idOrder;
        const orderSelect = ordersDataBase.findIndex(p => p.idOrder == orderId)
        if(req.body.estado == 'Confirmar Reserva') {
            ordersDataBase[orderSelect].estado = 'Confirmada';
        } else if (req.body.estado == 'Cancelar Reserva') {
            ordersDataBase[orderSelect].estado = 'Cancelada';
        }
        fs.writeFileSync(ordersFilePath, JSON.stringify(ordersDataBase, null, 2));
        return res.redirect(303, '/user/account-buisness/orders'); 
    }
}

module.exports = controller;