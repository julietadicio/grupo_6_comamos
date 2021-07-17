const fs = require('fs');


const restaurantFilePath = './data bases/restaurantDataFile.json';
const restaurantDataBase = JSON.parse(fs.readFileSync(restaurantFilePath, 'utf-8'));
const ordersFilePath = './data bases/ordersDataFile.json';
const ordersDataBase = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const productsFilePath = './data bases/productsDataFile.json';
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        return res.render ('index');
    },
    detail: (req,res) => {
        return res.render ('product')
    },
    productsList: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const productsRestaurant = productsDataBase.filter(p => p.idRestaurant == restaurantSelect.idRestaurant);
        return res.render ('buisness-products-list', {productsRestaurant, productsDataBase,restaurantSelect})
    },
    createFormProduct: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        return res.render ('buisness-create-products', {restaurantSelect});
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
        let idRestaurant = newProduct.idRestaurant;
        productsDataBase.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(productsDataBase, null, 2));
        return res.redirect('/user/account-buisness/products');
    },
    editFormProduct: (req, res) => {
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.session.userLogged.idRestaurant);
        const productSelect = productsDataBase.find(p => p.idPlato == req.params.idPlato && (p.idRestaurant == restaurantSelect.idRestaurant));
        return res.render ('buisness-edit-products', {productSelect, restaurantSelect});
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