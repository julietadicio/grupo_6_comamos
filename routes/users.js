const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const authBuisnessMiddleware = require('../middlewares/authBuisnessMiddleware');
const uploadFile = require('../middlewares/multer-avatar-Middleware');
const validateRegisterUser = require('../middlewares/validateRegisterUserMiddleware');
const validateRegisterBuisness = require('../middlewares/validateRegisterBuisnessMiddleware');
const validateCreateTable = require('../middlewares/validateCreateTableMiddleware');

// Rutas para login y administracion de usuarios

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);
// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validateRegisterUser, usersController.createUser);
// Formulario de login
router.get('/login', guestMiddleware, usersController.loginUser);
// Procesar el login
router.post('/login', usersController.loginProcess);
// Perfil de Usuario
router.get('/account', authMiddleware, usersController.userAccount);
// Logout
router.get('/logout', usersController.logoutUser);
// Formulario de edición de la cuenta para los usuarios
router.get('/account/edit', authMiddleware, usersController.userEditForm);
router.put('/account/', uploadFile.single('avatar') , usersController.userEditAccount);
// Eliminar cuenta de usuario
router.delete('/account/delete', usersController.userDelete);
// Consultar pedidos pendientes y confirmados, pero que aún no fueron utilizados
router.get('/account/my-order', authMiddleware, usersController.userMyOrder);
// Consulta de un pedido en particular con estado cancelado o confirmado
router.get('/account/my-order/:idOrder', authMiddleware, usersController.userOrder);
// Cancelar de un pedido en particular con estado pendiente o confirmado
router.put('/account/my-order/:idOrder/cancel', usersController.userMyOrderCancel);
// Consultar pedidos completados y cancelados
router.get('/account/orders', authMiddleware, usersController.userOrders);
// Rutas para administracion del carrito de usuarios
router.get('/carrito', authMiddleware, usersController.carrito);
// Ruta para procesar la compra
router.post('/shop', authMiddleware, usersController.buyProcess);


module.exports = router;