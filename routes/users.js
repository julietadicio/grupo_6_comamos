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
router.get('/logout', usersController.logout);
// Formulario de edición de la cuenta para los usuarios
router.get('/account/edit', authMiddleware, usersController.userEditForm);
router.put('/account/', uploadFile.single('avatar') , usersController.userEditAccount);
// Eliminar cuenta de usuario
router.delete('/account/delete', usersController.userDelete);
// Consultar pedidos pendientes y confirmados, pero que aún no fueron utilizados
router.get('/account/my-order', authMiddleware, usersController.userMyOrder);
// Consulta de un pedido en particular con estado pendiente o confirmado
router.get('/account/my-order/order/:idOrder', authMiddleware, usersController.userOrder);
// Cancelar de un pedido en particular con estado pendiente o confirmado
router.delete('/account/my-order/:idOrder/delete', usersController.userMyOrderDelete);
// Consultar pedidos completados y cancelados
router.get('/account/orders', authMiddleware, usersController.userOrders);
// Rutas para administracion del carrito de usuarios
router.get('/carrito', authMiddleware, usersController.carrito);


// Rutas para login y administracion de negocios

// Formulario de registro
router.get('/register-buisness', guestMiddleware, usersController.registerBuisness);
// Procesar el registro
router.post('/register-buisness', uploadFile.single('avatar'), validateRegisterBuisness, usersController.createBuisness);
// Formulario de login
router.get('/login-buisness', guestMiddleware, usersController.loginBuisness);
// Procesar el login
router.post('/login-buisness', usersController.loginProcessBuisness);
// Perfil de Usuario
router.get('/account-buisness/', authBuisnessMiddleware, usersController.buisnessAccount);
// Logout
router.get('/logout-buisness', authBuisnessMiddleware, usersController.logoutBuisness);
// Formulario de edición de la cuenta para los negocios
router.get('/account-buisness/edit', authBuisnessMiddleware, usersController.buisnessEditForm);
router.put('/account-buisness/', uploadFile.single('avatar') , usersController.buisnessEditAccount);
// Eliminar cuenta de negocio
router.delete('/account-buisness/delete', usersController.buisnessDelete);
// Consultar pedidos pendientes y confirmados, pero que aún no fueron al restaurante
router.get('/account-buisness/orders', authBuisnessMiddleware, usersController.buisnessOrders);
// Listado de platos del negocio
router.get('/account-buisness/products', authBuisnessMiddleware, usersController.buisnessProducts);
// Consultar pedidos completados y cancelados
router.get('/account-buisness/orders-history', authBuisnessMiddleware, usersController.buisnessHistoryOrders);
// Listado de Mesas del Restaurante
router.get('/account-buisness/capacity', authBuisnessMiddleware, usersController.buisnessCapacity);
// Formulario para modificar una mesa
router.get('/account-buisness/capacity/edit/:idMesa', authBuisnessMiddleware, usersController.buisnessFormTables);
router.put('/account-buisness/capacity/edit/:idMesa/',usersController.buisnessEditCapacity);
// Formulario para agregar una mesa
router.get('/account-buisness/capacity/new', authBuisnessMiddleware, usersController.tablesCreateForm);
router.post('/account-buisness/capacity/new-table', authBuisnessMiddleware, validateCreateTable, usersController.createTable);
// Eliminar una mesa
router.delete('/account-buisness/capacity/:idMesa/delete', usersController.TableDelete);


module.exports = router;