var express = require('express');
const path = require('path');
var router = express.Router();
const mainController = require('../controllers/mainController');
const { listaRestaurantes } = require('../controllers/mainController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');

/* GET home page. */
router.get('/', mainController.index );

// Rutas para registro de usuarios y restaurantes
router.get('/registro', mainController.registro);
router.post('/registerOk-user', uploadFile.single('avatar') ,mainController.createUser);
router.get('/registro-restaurant', mainController.registroRestaurante);
router.post('/registerOk-restaurant', mainController.createRestaurant);

// Rutas para login y administracion de usuarios
router.get('/login/account/:idUser/edit', mainController.userEditForm);
router.put('/login/account/:idUser', uploadFile.single('avatar') , mainController.userEditAccount);
router.delete('/login/account/:idUser/delete', mainController.userDelete);
router.get('/login/account/my-order/:idUser', mainController.userMyOrder);
router.get('/login/account/my-order/:idUser/order/:idOrder', mainController.userOrder);
router.delete('/login/account/my-order/:idUser/delete', mainController.userMyOrderDelete);
router.get('/login/account/orders/:idUser', mainController.userOrders);

// Rutas para login y administracion de negocios
router.get('/login-restaurant', mainController.loginNegocio);
router.get('/login/account-restaurant/:idRestaurant', mainController.buisnessAccount);
router.get('/login/account-restaurant/:idRestaurant/edit', mainController.buisnessEditForm);
router.put('/login/account-restaurant/:idRestaurant', uploadFile.single('avatar') , mainController.buisnessEditAccount);
router.delete('/login/account-restaurant/:idRestaurant/delete', mainController.buisnessDelete);
router.get('/login/account-restaurant/orders/:idRestaurant', mainController.buisnessOrders);
router.get('/login/account-restaurant/orders-history/:idRestaurant', mainController.buisnessHistoryOrders);


// Rutas para administracion del carrito de usuarios
router.get('/carrito', mainController.carrito);

// Rutas para listado de restaurantes y de platos
router.get('/lista-restaurantes', mainController.listaRestaurantes);
router.get('/lista-platos', mainController.listaPlatos)

module.exports = router;
