const utils = require('../utils/jwt');

module.exports = function(req, res, next) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		const token = req.headers.authorization.split(' ')[1];
		utils
			.verifyToken(token)
			.then(function(data) {
				req.session = data;
				next();
			})
			.catch(function(err) {
				res.status(401).json({
					error: err
				});
			});
	} else {
		return res.status(401).json({
			error: true,
			message: 'Por favor, inicie sesión'
		});
	}
};
