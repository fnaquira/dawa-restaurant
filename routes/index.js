const express = require('express');

// Importamos nuestros archivos de rutas
const authRouter = require('./auth.js');
const mealsRouter = require('./meals.js');
const ordersRouter = require('./orders.js');
const usersRouter = require('./users.js');

// Inicializamos nuestro enrutador
const router = express.Router();

module.exports = app => {
	router.use('/auth', authRouter);
	router.use('/meals', mealsRouter);
	router.use('/orders', ordersRouter);
	router.use('/users', usersRouter);

	router.use((req, res) => {
		res.status(404).json({
			message: 'Servicio no encontrado'
		});
	});

	// Le decimos a nuestro express que utilice nuestro enrutador
	app.use('/api', router);
};
