const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const guestBuisnessMiddleware = require('../middlewares/guestBuisnessMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const authBuisnessMiddleware = require('../middlewares/authBuisnessMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');

// Rutas para login y administracion de usuarios
// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);
// Procesar el registro
router.post('/register', uploadFile.single('avatar'), /*validations,*/ usersController.processRegister);
// Formulario de login
router.get('/login', guestMiddleware, usersController.loginUser);
// Procesar el login
router.post('/login', usersController.loginProcess);
// Perfil de Usuario
router.get('/account/', authMiddleware, usersController.userAccount);
// Logout
router.get('/logout', usersController.logout);

// Rutas para registro de usuarios y restaurantes
// Formulario de registro
router.get('/register-buisness', guestBuisnessMiddleware, usersController.registerBuisness);
// Procesar el registro
router.post('/register-buisness', uploadFile.single('avatar'), /*validations,*/ usersController.createRestaurant);
// Formulario de login
router.get('/login-buisness', guestBuisnessMiddleware, usersController.loginBuisness);
// Procesar el login
router.post('/login-buisness', usersController.loginProcessBuisness);
// Perfil de Usuario
router.get('/account-buisness/', authBuisnessMiddleware, usersController.buisnessAccount);

module.exports = router;