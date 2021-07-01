var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.index );
router.get('/registro', mainController.registro);
router.get('/registro/negocio', mainController.registroRestaurante);
router.get('/login', mainController.loginUser);
router.get('/login/negocio', mainController.loginNegocio);



module.exports = router;
