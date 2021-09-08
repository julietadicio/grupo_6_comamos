const express = require('express');
const router = express.Router();

const buisnessController = require('../../controllers/apisControllers/buisnessApiController');

router.get('/buisness',  buisnessController.loginBuisness);

module.exports = router;