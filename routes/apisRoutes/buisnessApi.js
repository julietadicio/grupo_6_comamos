const express = require('express');
const router = express.Router();

const buisnessController = require('../../controllers/apisControllers/buisnessApiController');

router.get('/buisness',  buisnessController.buisnessList);
router.get('/buisness/:idRestaurant',  buisnessController.selectBuisness);

module.exports = router;