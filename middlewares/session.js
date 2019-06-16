const utils = require('../utils/jwt');

const userModel = require('../models/users');

module.exports = async (req, res, next) => {
	try {
		req.user = await userModel.findByMail(req.session.email);
		next();
	} catch (err) {
		console.error(err);
		next();
	}
};
