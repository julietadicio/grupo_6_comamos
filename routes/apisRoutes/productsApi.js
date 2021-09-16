const express = require('express');
const router = express.Router();

const productApiController = require('../../controllers/apisControllers/productApiController');

router.get('/products', productApiController.productsList);
router.get('/products/:idPlato',  productApiController.selectProduct);

module.exports = router;