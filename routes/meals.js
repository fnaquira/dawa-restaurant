const express = require('express');
const router = express.Router();

const modelMeals = require('../models/meals');

const jwtMiddleware = require('../middlewares/jwt');

router.use(jwtMiddleware);

router.get('/', async (req, res) => {
	try {
		const meals = await modelMeals.find(
			req.query.page,
			req.query.per_page ? parseFloat(req.query.per_page) : 10
		);
		res.json(meals);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const meal = await modelMeals.findOne(req.params.id);
		res.json(meal);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const meal = await modelMeals.create(req.body);
		res.json(meal);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const meal = await modelMeals.update(req.params.id, req.body);
		res.json(meal);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
