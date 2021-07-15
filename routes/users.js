const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');

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

module.exports = router;