const express = require('express');
const router = express.Router();

const ordersApiController = require('../../controllers/apisControllers/ordersApiController');

router.get('/orders', ordersApiController.ordersList);
router.get('/orders/:idOrder',  ordersApiController.selectOrder);

module.exports = router;