const express = require('express');
const router = express.Router();

// Controller
const buisnessController = require('../controllers/buisnessController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const authBuisnessMiddleware = require('../middlewares/authBuisnessMiddleware');
const uploadFile = require('../middlewares/multer-avatar-Middleware');
const validateRegisterBuisness = require('../middlewares/validateRegisterBuisnessMiddleware');
const validateCreateTable = require('../middlewares/validateCreateTableMiddleware');


// Rutas para login y administracion de negocios

// Formulario de registro
router.get('/register', guestMiddleware, buisnessController.registerBuisness);
// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validateRegisterBuisness, buisnessController.createBuisness);
// Formulario de login
router.get('/login', guestMiddleware, buisnessController.loginBuisness);
// Procesar el login
router.post('/login', buisnessController.loginProcessBuisness);
// Perfil de Usuario
router.get('/account/', authBuisnessMiddleware, buisnessController.buisnessAccount);
// Logout
router.get('/logout', authBuisnessMiddleware, buisnessController.logoutBuisness);
// Formulario de edición de la cuenta para los negocios
router.get('/account/edit', authBuisnessMiddleware, buisnessController.buisnessEditForm);
router.put('/account/', uploadFile.single('avatar') , buisnessController.buisnessEditAccount);
// Eliminar cuenta de negocio
router.delete('/account/delete', buisnessController.buisnessDelete);
// Consultar pedidos pendientes y confirmados, pero que aún no fueron al restaurante
router.get('/account/orders', authBuisnessMiddleware, buisnessController.buisnessOrders);
// Cancelar pedidos pendientes y confirmados
router.put('/account/orders/:idOrder', authBuisnessMiddleware, buisnessController.buisnessEditOrders);
// Listado de platos del negocio
router.get('/account/products', authBuisnessMiddleware, buisnessController.buisnessProducts);
// Consultar pedidos completados y cancelados
router.get('/account/orders-history', authBuisnessMiddleware, buisnessController.buisnessHistoryOrders);
// Listado de Mesas del Restaurante
router.get('/account/capacity', authBuisnessMiddleware, buisnessController.buisnessCapacity);
// Formulario para modificar una mesa
router.get('/account/capacity/edit/:idMesa', authBuisnessMiddleware, buisnessController.buisnessFormTables);
router.put('/account/capacity/edit/:idMesa/',buisnessController.buisnessEditCapacity);
// Formulario para agregar una mesa
router.get('/account/capacity/new', authBuisnessMiddleware, buisnessController.tablesCreateForm);
router.post('/account/capacity/new-table', validateCreateTable, buisnessController.createTable);
// Eliminar una mesa
router.delete('/account/capacity/:idMesa/delete', buisnessController.TableDelete);


module.exports = router;