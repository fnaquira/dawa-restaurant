const express = require('express');
const router = express.Router();

const modelUser = require('../models/users');

router.post('/signup', async (req, res) => {
	try {
		const usuario = await modelUser.signUp(req.body);
		res.json(usuario);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/signin', async (req, res) => {
	try {
		const usuario = await modelUser.signIn(req.body);
		res.json(usuario);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
