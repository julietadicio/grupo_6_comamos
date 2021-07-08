var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.index );

// Rutas para registro
router.get('/registro', mainController.registro);
router.post('/', mainController.createUser);
router.get('/registro-restaurant', mainController.registroRestaurante);
router.post('/registerOk-restaurant', mainController.createRestaurant);

// Rutas para login
router.get('/login', mainController.loginUser);
router.get('/login/account', mainController.userAccount);
router.get('/login-restaurant', mainController.loginNegocio);
router.get('/carrito', mainController.carrito);



module.exports = router;
