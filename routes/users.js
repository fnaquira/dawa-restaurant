const express = require('express');
const router = express.Router();

const modelUsers = require('../models/users');

const jwtMiddleware = require('../middlewares/jwt');

router.use(jwtMiddleware);

router.get('/', async (req, res) => {
	try {
		const users = await modelUsers.find(req.query.page);
		res.json(users);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const user = await modelUsers.findOne(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const user = await modelUsers.create(req.body);
		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const user = await modelUsers.update(req.params.id, req.body);
		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await modelUsers.remove(req.params.id);
		res.json({
			message: 'Usuario eliminado con éxito!'
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
