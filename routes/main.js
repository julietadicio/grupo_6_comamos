var express = require('express');
const path = require('path');
var router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');
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

// Rutas para registro de usuarios y restaurantes
router.get('/registro', mainController.registro);
router.post('/registerOk-user', uploadFile.single('avatar') ,mainController.createUser);
router.get('/registro-restaurant', mainController.registroRestaurante);
router.post('/registerOk-restaurant', mainController.createRestaurant);

// Rutas para login y administracion de usuarios
router.get('/login', mainController.loginUser);
router.get('/login/account/:id', mainController.userAccount);
router.get('/login/account/:id/edit', mainController.userEditForm);
router.put('/login/account/:id', uploadFile.single('avatar') , mainController.userEditAccount);
router.get('/login/account/orders/:id', mainController.userOrders);
router.get('/login-restaurant', mainController.loginNegocio);

// Rutas para login y administracion de negocios
router.get('/login/account-restaurant/:id', mainController.buisnessAccount);
router.get('/login/account-restaurant/:id/edit', mainController.buisnessEditForm);
router.put('/login/account-restaurant/:id', uploadFile.single('avatar') , mainController.buisnessEditAccount);
router.get('/login/account-restaurant/orders/:id', mainController.buisnessOrders);

// Rutas para administracion del carrito de usuarios
router.get('/carrito', mainController.carrito);



module.exports = router;
