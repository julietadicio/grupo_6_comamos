const { body } = require('express-validator');

module.exports = [
	body('nombre').notEmpty().withMessage('Ingrese un nombre para la mesa'),
	body('ubicacion').notEmpty().withMessage('Tienes que escribir una ubicación'),
	body('capacidad').notEmpty().withMessage('Ingrese capacidad de la mesa'),
]