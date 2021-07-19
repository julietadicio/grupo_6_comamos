const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const guestBuisnessMiddleware = require('../middlewares/guestBuisnessMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const authBuisnessMiddleware = require('../middlewares/authBuisnessMiddleware');
const uploadFile = require('../middlewares/multer-avatar-Middleware');

// Rutas para login y administracion de usuarios

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);
// Procesar el registro
router.post('/register', uploadFile.single('avatar'), /*validations,*/ usersController.createUser);
// Formulario de login
router.get('/login', guestMiddleware, usersController.loginUser);
// Procesar el login
router.post('/login', usersController.loginProcess);
// Perfil de Usuario
router.get('/account', authMiddleware, usersController.userAccount);
// Logout
router.get('/logout', authMiddleware, usersController.logout);
// Rutas para login y administracion de usuarios
router.get('/account/edit', authMiddleware, usersController.userEditForm);
router.put('/account/', uploadFile.single('avatar') , usersController.userEditAccount);
router.delete('/account/delete', usersController.userDelete);
router.get('/account/my-order', authMiddleware, usersController.userMyOrder);
router.get('/account/my-order/order/:idOrder', authMiddleware, usersController.userOrder);
router.delete('/account/my-order/:idOrder/delete', usersController.userMyOrderDelete);
router.get('/account/orders', authMiddleware, usersController.userOrders);
// Rutas para administracion del carrito de usuarios
router.get('/carrito', authMiddleware, usersController.carrito);

// Rutas para registro de usuarios y restaurantes

// Formulario de registro
router.get('/register-buisness', guestBuisnessMiddleware, usersController.registerBuisness);
// Procesar el registro
router.post('/register-buisness', uploadFile.single('avatar'), /*validations,*/ usersController.createBuisness);
// Formulario de login
router.get('/login-buisness', guestBuisnessMiddleware, usersController.loginBuisness);
// Procesar el login
router.post('/login-buisness', usersController.loginProcessBuisness);
// Perfil de Usuario
router.get('/account-buisness/', authBuisnessMiddleware, usersController.buisnessAccount);
// Logout
router.get('/logout-buisness', authBuisnessMiddleware, usersController.logoutBuisness);
// Rutas para login y administracion de negocios
router.get('/account-buisness/edit', authBuisnessMiddleware, usersController.buisnessEditForm);
router.put('/account-buisness/', uploadFile.single('avatar') , usersController.buisnessEditAccount);
router.delete('/account-buisness/delete', usersController.buisnessDelete);
router.get('/account-buisness/orders', authBuisnessMiddleware, usersController.buisnessOrders);
router.get('/account-buisness/products', authBuisnessMiddleware, usersController.buisnessProducts);
router.get('/account-buisness/orders-history', authBuisnessMiddleware, usersController.buisnessHistoryOrders);

module.exports = router;