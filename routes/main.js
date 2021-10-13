var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.index );

// Rutas para listado de restaurantes y de platos
router.get('/lista-restaurantes', mainController.listaRestaurantes);
router.get('/lista-platos', mainController.listaPlatos)
router.get('/lista-platos/:idRestaurant', mainController.productsRestaurant)

// Search Bar
router.get('/product/search/:plato', mainController.searchBar)

// Search Bar Location
router.get('/product/search/:restaurant', mainController.searchLocation)

module.exports = router;
