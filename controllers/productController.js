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
        const restaurantSelect = restaurantDataBase.find(r => r.idRestaurant == req.params.idRestaurant);
        const productsRestaurant = productsDataBase.filter(p => p.idRestaurant == req.params.idRestaurant);
        return res.render ('buisness-products-list', {productsRestaurant, restaurantSelect, productsDataBase})
    }
}

module.exports = controller;