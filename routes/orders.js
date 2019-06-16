const express = require('express');
const router = express.Router();

const modelOrders = require('../models/orders');

const jwtMiddleware = require('../middlewares/jwt');
const sessionMiddleware = require('../middlewares/session');

router.use(jwtMiddleware);

router.get('/', sessionMiddleware, async (req, res) => {
	try {
		const orders = await modelOrders.find(req.query.page);
		res.json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/my', sessionMiddleware, async (req, res) => {
	try {
		const orders = await modelOrders.findMyOrders(
			req.query.page,
			req.query.per_page ? parseInt(req.query.per_page) : 10,
			req.user._id
		);
		res.json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const order = await modelOrders.findOne(req.params.id);
		res.json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', sessionMiddleware, async (req, res) => {
	try {
		const orderData = {
			...req.body,
			user: req.user._id
		};
		const order = await modelOrders.create(orderData);
		res.json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const order = await modelOrders.update(req.params.id, req.body);
		res.json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await modelOrders.remove(req.params.id);
		res.json({
			message: 'Plato eliminado con éxito!'
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
