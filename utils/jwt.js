const jwt = require('jsonwebtoken');

module.exports = {
	generateToken: data => {
		return new Promise((resolve, reject) => {
			return resolve(
				jwt.sign(data, process.env.JWT_SECRET, {
					expiresIn: 60 * 60 * 24 * 1
				})
			);
		});
	},
	verifyToken: token => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
				if (err) {
					reject(err);
				}
				//return data using the id from w/in JWTToken
				resolve(data);
			});
		});
	}
};
