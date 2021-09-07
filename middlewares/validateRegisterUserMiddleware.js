const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('apellido').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un email').bail()
		.isEmail().withMessage('Debes escribir un formato de email válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña')
]