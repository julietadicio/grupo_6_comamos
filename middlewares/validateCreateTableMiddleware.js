const { body } = require('express-validator');

module.exports = [
	body('ubicacion').notEmpty().withMessage('Tienes que escribir una ubicación'),
	body('capacidad').notEmpty().withMessage('Ingrese capacidad de la mesa'),
	body('estado').notEmpty().withMessage('Tienes que seleccionar un estado')
]