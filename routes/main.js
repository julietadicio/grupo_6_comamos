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
const uploadFile = multer({storage: storage});

/* GET home page. */
router.get('/', mainController.index );

// Rutas para registro
router.get('/registro', uploadFile.single ('avatar') ,mainController.registro);
router.post('/registerOk-user', uploadFile.single('avatar') ,mainController.createUser);
router.get('/registro-restaurant', mainController.registroRestaurante);
router.post('/registerOk-restaurant', mainController.createRestaurant);

// Rutas para login
router.get('/login', mainController.loginUser);
router.get('/login/account/:id', mainController.userAccount);
router.get('/login/account/:id/edit', mainController.userEditForm);
router.put('/login/account/:id', uploadFile.single('avatar') , mainController.userEditAccount);
router.get('/login/account/orders/:id', mainController.userOrders);
router.get('/login-restaurant', mainController.loginNegocio);
router.get('/carrito', mainController.carrito);



module.exports = router;
