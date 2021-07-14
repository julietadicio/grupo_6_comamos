var express = require('express');
const path = require('path');
var router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');
const { listaRestaurantes } = require('../controllers/mainController');
const storage = multer.diskStorage ({
  destination: (req, file, cb) => {
    cb (null, path.join(__dirname, '../public/img/avatars'));
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now()+path.extname(file.originalname);
    cb (null, newFileName);
  }
})
const uploadFile = multer({ storage });

/* GET home page. */
router.get('/', mainController.index );
router.get('/login/:idUser', mainController.indexLogin);
router.get('/login-restaurant/:id', mainController.indexBuisnessLogin);

// Rutas para registro de usuarios y restaurantes
router.get('/registro', mainController.registro);
router.post('/registerOk-user', uploadFile.single('avatar') ,mainController.createUser);
router.get('/registro-restaurant', mainController.registroRestaurante);
router.post('/registerOk-restaurant', mainController.createRestaurant);

// Rutas para login y administracion de usuarios
router.get('/login', mainController.loginUser);
router.get('/login/account/:idUser', mainController.userAccount);
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
router.get('/login/account-restaurant/products/:idRestaurant', mainController.buisnessProducts);

// Rutas para administracion del carrito de usuarios
router.get('/carrito', mainController.carrito);

// Rutas para listado de restaurantes y de platos
router.get('lista-restaurantes', mainController.listaRestaurantes);

module.exports = router;
