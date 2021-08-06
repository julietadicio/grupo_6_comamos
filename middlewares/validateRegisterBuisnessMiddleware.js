const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('direccion').notEmpty().withMessage('Tienes que ingresar un domicilio'),
	body('capacidad').notEmpty().withMessage('Ingresar la cantidad máxima de personas'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo email').bail()
		.isEmail().withMessage('Debes escribir un formato de email válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña')
]