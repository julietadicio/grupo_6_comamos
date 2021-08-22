const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Ingrese un nombre para la mesa'),
	body('ubication').notEmpty().withMessage('Tienes que escribir una ubicación'),
	body('capacity').notEmpty().withMessage('Ingrese capacidad de la mesa')
]