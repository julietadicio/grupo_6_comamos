const express = require('express');
const router = express.Router();

const buisnessController = require('../../controllers/apisControllers/buisnessApiController');

router.get('/buisness',  buisnessController.buisnessList);
router.get('/buisness/:idRestaurant',  buisnessController.selectBuisness);
// Asignar una mesa a un pedido
router.post('/buisness/assignTable', buisnessController.assignTable);

module.exports = router;