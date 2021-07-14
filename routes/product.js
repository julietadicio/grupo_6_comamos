var express = require('express');
const path = require('path');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/login/account-restaurant/products/:idRestaurant', productController.productsList);


module.exports = router;
